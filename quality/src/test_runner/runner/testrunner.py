"""
Testrunner class.
"""

import random
import time
import requests
import urllib3
import yaml
import nose
from pathlib import Path
from datetime import datetime

import runner.system
from runner.logger import LOGGER
from runner.e2e_config import E2EConfig
from runner.browser import Browser
from runner.loader import Loader
from runner.date_formatter import calculate_time

SUCCESS = 0
FAILED = 1


class TestRunner:

    def __init__(self):
        urllib3.disable_warnings()
        requests.packages.urllib3.disable_warnings()
        requests.packages.urllib3.disable_warnings(UserWarning)
        self.test_loader = Loader()

    def run(self, args):
        self.test_loader.load_tests_names(args.tests_dir, args.test_filter, args.test_exclude)

        result = SUCCESS
        if args.test_count:
            print(self.test_loader.count())
        elif self.test_loader.count() > 0:
            E2EConfig.set_headless_state(args.headless)
            result = self._run_tests(args)
            Browser.quit()
        return result

    def _run_tests(self, args):
        result = SUCCESS
        iteration_id = 1
        end_time = datetime.now() + args.due_to if args.due_to is not None else datetime.now()
        custom_args = self._get_custom_args(args.config_file)
        logs_dir = Path(args.logs_dir).expanduser()
        runner.system.clear_dir(logs_dir)

        start_time = time.time()
        while True:
            test_dir_path = logs_dir.joinpath(str(iteration_id))
            runner.system.clear_dir(test_dir_path)
            if self._run_tests_one_time(args, custom_args, test_dir_path, iteration_id) is FAILED:
                result = FAILED
            iteration_id = iteration_id + 1
            if time.time() > end_time.timestamp() or (result is FAILED and args.stop_on_fail) or args.due_to is None:
                break
        end_time = time.time()
        if args.due_to:
            number_of_tests = self.test_loader.count() * (iteration_id - 1)
            TestRunner._print_tests_summary(end_time - start_time, result, number_of_tests)
        return result

    @staticmethod
    def _print_tests_summary(tests_time, result, number_of_tests):
        LOGGER.info('------------------------SUMMARY---------------------------')
        LOGGER.info('Ran {} tests in {}'.format(number_of_tests, calculate_time(tests_time)))
        LOGGER.info('Final status: {}'.format({0: 'SUCCESS', 1: 'FAILED'}.get(result, 'UNDEFINED')))

    def _run_tests_one_time(self, args, custom_args, test_dir_path, iteration_id):
        try:
            LOGGER.info('Run iteration %s', iteration_id)
            result_name = 'output-{}.xml'.format(iteration_id)
            tests = self._make_tests(args.seed)
            noseargs = TestRunner._make_nose_args(result_name, tests, args, custom_args, iteration_id)
            status = SUCCESS if nose.core.TestProgram(argv=noseargs, exit=False).success else FAILED
            self._save_tests_order(tests, test_dir_path, iteration_id)

            if status == SUCCESS and not args.keep_all_artifacts:
                LOGGER.info('Removing artifacts - all tests passed')
                runner.system.remove_dir(test_dir_path)
        except AssertionError as ex:
            LOGGER.error(ex)
            status = FAILED
        return status

    def _make_tests(self, seed):
        test_seed = seed if seed else random.random()
        LOGGER.info('Seed %s', test_seed)
        return self.test_loader.lists(test_seed)

    def _save_tests_order(self, tests, test_dir_path, iteration_id):
        log_file = test_dir_path.joinpath('tests_{}.log'.format(iteration_id))

        with log_file.open('wt') as f:
            f.write(tests.replace(',', '\n'))

    @staticmethod
    def _make_nose_args(result_name, tests, args, custom_args, iteration_id):
        logs_dir = Path(args.logs_dir).expanduser()
        nose_args = ['testrunner',
                     '--nocapture',
                     '--logging-level=WARNING',
                     '--with-xunit',
                     '--xunit-file=' + str(logs_dir.joinpath(result_name)),
                     '--tests=' + tests,
                     '--tc=logs_dir:' + str(logs_dir),
                     '--tc=tests_dir:' + args.tests_dir,
                     '--tc=host:' + args.host,
                     '--tc=browser:' + args.browser,
                     '--tc=iteration_id:' + str(iteration_id)]
        for attr, value in custom_args.items():
            nose_args.append('--tc={}:{}'.format(attr, value))
        if args.stop_on_fail:
            nose_args.append('--stop')
        return nose_args

    @staticmethod
    def _get_custom_args(config_file):
        with Path(config_file).resolve().open() as config_file:
            return yaml.safe_load(config_file.read())

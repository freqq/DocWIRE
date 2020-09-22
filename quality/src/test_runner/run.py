#!/usr/bin/env python3

"""
Main module, used for running e2e tests.
"""

import argparse
import sys

from datetime import timedelta
from pathlib import Path
from runner.testrunner import TestRunner


def run(args):
    return TestRunner().run(args)


def _is_period_valid(period):
    delta = _convert_to_timedelta(period)
    if delta is not None:
        return delta
    raise argparse.ArgumentTypeError("Wrong period {0}".format(period))


def _convert_to_timedelta(time_val):
    num = int(time_val[:-1])
    symbol = time_val[-1:]
    return {'s': timedelta(seconds=num),
            'm': timedelta(minutes=num),
            'h': timedelta(hours=num),
            'd': timedelta(days=num)}.get(symbol, None)


def _is_directory_valid(path):
    _path = Path(path)
    if _path.exists() and _path.is_dir():
        return path
    raise argparse.ArgumentTypeError("Invalid path: {}".format(path))


def main():
    parser = argparse.ArgumentParser(description='Runs e2e tests.')

    parser.add_argument('--tests-dir',
                        dest='tests_dir',
                        help='Path to folder with tests',
                        type=_is_directory_valid,
                        required=True)
    parser.add_argument('--logs-dir',
                        dest='logs_dir',
                        help='Tests artifacts will be stored inside this directory')
    parser.add_argument('--config-file',
                        dest='config_file',
                        help='Path to configuration file',
                        required=True)
    parser.add_argument('--seed',
                        dest='seed',
                        action='store',
                        type=float,
                        help='Seed used to shuffle tests')
    parser.add_argument('--host',
                        dest='host',
                        help='Hostname of app to be tested')
    parser.add_argument('--due-to',
                        dest='due_to',
                        action='store',
                        help='Sets period of tests execution. [s, m, h, d]',
                        type=_is_period_valid)
    parser.add_argument('--test-filter',
                        dest='test_filter',
                        action='store',
                        help='Filter tests to run')
    parser.add_argument('--test-exclude',
                        dest='test_exclude',
                        action='store',
                        help='Tests to skip')
    parser.add_argument('--test-count',
                        dest='test_count',
                        action='store_true',
                        help='Returns number of test cases')
    parser.add_argument('--keep-all-artifacts',
                        dest='keep_all_artifacts',
                        action='store_true',
                        help='Do not remove test artifacts when test ended with success')
    parser.add_argument('--headless',
                        dest='headless',
                        action='store_true',
                        help='Run browser in headless mode')
    parser.add_argument('--stop-on-fail',
                        dest='stop_on_fail',
                        action='store_true',
                        help='Stop tests execution after first failed test')
    parser.add_argument('--browser',
                        dest='browser',
                        help='Browser to tests',
                        action='store',
                        choices=['firefox', 'chrome'])
    parser.set_defaults(host='localhost',
                        test_filter='',
                        logs_dir='~/tut-owl/logs/test-reports',
                        test_exclude='',
                        browser='chrome')
    args = parser.parse_args()
    sys.exit(run(args))


if __name__ == '__main__':
    main()

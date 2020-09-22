"""
Helper module for loading tests with nose framework
"""

import collections
import importlib.machinery
import importlib.util
import inspect
import itertools
import math
import random
import re
import sys
from pathlib import Path

from runner.logger import LOGGER
from runner.testcase import TestCase


class Loader(object):

    def __init__(self):
        self._tests = set()

    def load_tests_names(self, tests_dir, test_filter, test_exclude):
        test_filter = {test: False for test in test_filter.split(',') if test}
        test_exclude = {test: False for test in test_exclude.split(',') if test}

        for path in Path(tests_dir).rglob('*e2e.py'):
            if path.is_file():
                self._process_file(path, test_filter, test_exclude)

        for test in {test for test, exists in test_filter.items() if not exists}:
            LOGGER.warn('test {} does not exist'.format(test))

    def count(self):
        return len(self._tests)

    def lists(self, seed):
        return ','.join(self._tests_subset(seed))

    def _process_file(self, file, test_filter, test_exclude):
        module = Loader._import_module(file)
        for attr in dir(module):
            obj = getattr(module, attr)
            if inspect.isclass(obj) and \
                    (issubclass(obj, TestCase)):
                self._process_test_case(obj, test_filter, test_exclude)

    @staticmethod
    def _import_module(file):
        module_name = file.stem
        loader = importlib.machinery.SourceFileLoader(module_name, str(file))
        module = loader.load_module()
        loader.exec_module(module)
        sys.modules[module_name] = module
        return module

    def _process_test_case(self, test_case, test_filter, test_exclude):
        tests = (test for test in dir(test_case)
                 if test.startswith('test_'))
        if test_filter:
            tests = (test for test in tests
                     if self._is_test_selected(test_case, test, test_filter))
        if test_exclude:
            tests = (test for test in tests
                     if not self._is_test_excluded(test_case, test, test_exclude))
        self._tests.update([self._test_name(test_case, test)
                            for test in tests])

    def _is_test_excluded(self, test_case, test, test_exclude):
        name = self._simple_test_name(test_case, test)
        for exc in test_exclude:
            if re.match(exc, name):
                return True
        return False

    def _is_test_selected(self, test_case, test, test_filter):
        name = self._simple_test_name(test_case, test)
        for exc in test_filter:
            if re.match(exc, name):
                test_filter[exc] = True
                return True
        return False

    @staticmethod
    def _simple_test_name(test_case, test):
        return test_case.__module__.split('.')[-1] + '.' + test

    @staticmethod
    def _test_name(test_case, test):
        return test_case.__module__ + ':' + test_case.__name__ + '.' + test

    def _tests_subset(self, seed):
        tests = self._prepare_tests(self._tests, seed)
        split_value = math.ceil(self.count() / 1)
        subset = [tests[i:i + split_value] for i in range(0, len(tests), split_value)]
        return [] if len(subset) < 1 else subset[1 - 1]

    def _prepare_tests(self, tests, seed):
        tests = list(sorted(tests))
        test_suite_dict = self._create_tests_suite_dictionary(tests)
        test_suite_list = list(test_suite_dict.values())
        self._shuffle_tests(test_suite_list, seed)
        test_list = list(itertools.chain.from_iterable(test_suite_list))
        return test_list

    @staticmethod
    def _create_tests_suite_dictionary(tests):
        test_dict = collections.OrderedDict()
        for test in tests:
            key = test.split(':')[0]
            if key not in test_dict:
                test_dict[key] = []
            test_dict[key].append(test)
        return test_dict

    @staticmethod
    def _shuffle_tests(test_suite_list, seed):
        rand = random.Random(seed)
        rand.shuffle(test_suite_list)
        for test_suite in test_suite_list:
            rand.shuffle(test_suite)

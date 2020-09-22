"""
Base module for Test cases classes.
"""

import unittest
import time


from runner.e2e_config import E2EConfig
from runner.configuration_provider import ConfigurationProvider
from selenium.common.exceptions import WebDriverException


class TestCaseBase(unittest.TestCase):

    @classmethod
    def set_up_class(cls):
        pass

    @classmethod
    def tear_down_class(cls):
        pass

    def set_up(self):
        pass

    def tear_down(self):
        pass

    @staticmethod
    def get_url(page=''):
        return ConfigurationProvider.get_host_address() + page

    @staticmethod
    def get_iteration_id():
        return ConfigurationProvider.get_iteration_id()

    def _get_test_name(self):
        return '{module}.{method}'.format(
            module=self.__class__.__name__,
            method=self._testMethodName)

    @classmethod
    def _get_logs_dir(cls):
        return ConfigurationProvider.get_logs_dir().joinpath(cls.get_iteration_id())

    @staticmethod
    def wait_for(function_with_assertion,
                 timeout=E2EConfig.DEFAULT_WAIT_FOR_UPDATE, refresh_time=1):
        start_time = time.time()
        while time.time() - start_time < timeout:
            try:
                return function_with_assertion()
            except (AssertionError, WebDriverException):
                time.sleep(refresh_time)
        return function_with_assertion()

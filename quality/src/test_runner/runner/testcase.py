"""
Base module for Test cases.
"""

import runner.system
from datetime import datetime
from runner.browser import Browser
from runner.testcase_base import TestCaseBase


class TestCase(TestCaseBase):

    browser = None
    first_run = True

    @classmethod
    def setUpClass(cls):
        cls._prepare_test_output()
        cls.set_up_browser()
        cls.set_up_tests()
        cls.set_up_class()

    @classmethod
    def tearDownClass(cls):
        try:
            cls.browser.add_title_to_screen(cls.__name__ + ' TEAR DOWN CLASS')
            cls.tear_down_class()
        except Exception as ex:
            cls.get_snapshot('tear_down_class')
            raise ex

    def setUp(self):
        self.browser.add_title_to_screen(self._get_test_name() + ' SET UP')
        self.set_up()
        self.browser.add_title_to_screen(self._get_test_name() + ' TEST')

    def tearDown(self):
        if self.browser:
            for win_id, handle in enumerate(self.browser.window_handles):
                self._window_id = win_id
                self.browser.switch_to_window(handle)
                self.get_snapshot(self._testMethodName + str(win_id))
        try:
            self.browser.add_title_to_screen(self._get_test_name() + ' TEAR DOWN')
            self.tear_down()
        except Exception as ex:
            self.get_snapshot(self._testMethodName + '_tear_down')
            raise ex

    @classmethod
    def set_up_browser(cls):
        cls.browser = Browser.create(cls.get_url())
        cls.browser.apply_javascripts(cls.__name__ + ' SET UP CLASS')

    @classmethod
    def set_up_tests(cls):
        if TestCase.first_run:
            cls.set_up_tests_impl()
            TestCase.first_run = False

    @classmethod
    def set_up_tests_impl(cls):
        pass

    @classmethod
    def get_snapshot(cls, name):
        cls.take_screen_shot(name)
        cls.save_browser_logs(name)

    @classmethod
    def take_screen_shot(cls, name):
        filename = cls._get_snapshot_dir(name) + '.png'
        cls.browser.get_screenshot_as_file(filename)

    @classmethod
    def save_browser_logs(cls, name):
        filename = cls._get_snapshot_dir(name) + '.log'
        with open(filename, 'w', encoding='utf-8') as f:
            for entry in cls.browser.get_logs():
                f.write(str(entry) + '\n')

    @classmethod
    def _get_snapshot_dir(cls, name):
        timestamp = cls._get_timestamp()
        return '{dir}/{module}.{name}-{timestamp}'.format(
            dir=cls._get_module_dir(),
            module=cls.__name__,
            name=name,
            timestamp=timestamp
        )

    @classmethod
    def _get_module_dir(cls):
        return cls._get_logs_dir().joinpath(cls.__name__)

    @classmethod
    def _prepare_test_output(cls):
        runner.system.clear_dir(cls._get_module_dir())

    @staticmethod
    def _get_timestamp():
        return datetime.now().strftime('%Y-%m-%dT%H.%M.%S')

    def wait_for_element_regex(self, regex, element):
        self.wait_for(lambda: self.assertRegex(element(), regex))

    def wait_for_element_update(self, value, element):
        self.wait_for(lambda: self.assertEqual(element(), value))

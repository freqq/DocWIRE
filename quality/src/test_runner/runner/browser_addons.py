"""
Utility methods for e2e tests
"""

from datetime import datetime
from selenium.webdriver.remote.webdriver import WebDriver
from runner.wait import Wait
from runner.js_script_loader import load_script

ADD_TITLE_SCRIPT_NAME = 'addTitle'


class BrowserAddons(WebDriver):

    test_title_with_stage = ''

    def wait(self):
        return Wait(self)

    def refresh(self):
        super().get(super().current_url)
        self.apply_javascripts()

    def apply_javascripts(self, title=None):
        self.add_title_to_screen(title)

    def add_title_to_screen(self, title=None):
        title = self._get_timestamp() + ' | ' + self._set_proper_title(title)
        self.wait().for_presence_of_element_by_tag_name('head')
        script = load_script(ADD_TITLE_SCRIPT_NAME) % title
        self.execute_script(script)

    def scroll_to_element(self, element=None):
        self.execute_script('return arguments[0].scrollIntoView(alignToTop=false);', element)

    def scroll_to_top(self):
        self.execute_script('return window.scrollTo(0, 0);')

    def is_static_page_content_loaded(self):
        return self.execute_script('return document.readyState;') == 'complete'

    @staticmethod
    def _get_timestamp():
        return datetime.now().strftime('%Y-%m-%dT%H.%M.%S')

    def _set_proper_title(self, title):
        if title is None:
            title = self.test_title_with_stage
        else:
            self.test_title_with_stage = title
        return title

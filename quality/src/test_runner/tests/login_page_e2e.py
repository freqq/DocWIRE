"""
Keycloak login page tests
"""

from runner.testcase import TestCase
from tests.pages.login import Login
from tests.pages.register import Register
from tests.pages.main_page import MainPage

class LoginPage(TestCase):

    @classmethod
    def set_up_class(cls):
        cls.login = Login(cls.browser)
        cls.register = Register(cls.browser)
        cls.main_page = MainPage(cls.browser)

    def test_should_login_wait_for_visible_page_and_logout(self):
        self.login.is_page_visible()
        self.login.login_to_app()
        self.main_page.is_page_visible()
        self.main_page.dropdown_button().click()
        self.main_page.logout_button().click()
        self.login.is_page_visible()

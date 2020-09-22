"""
Module represents login page
"""

from runner.configuration_provider import ConfigurationProvider


class Login:

    USERNAME = 'testUser'
    PASSWORD = 'testPassword'

    LOGIN_PAGE_TITLE_ID = 'heading-large'
    USERNAME_INPUT_ID = 'username'
    PASSWORD_INPUT_ID = 'password'
    LOGIN_BUTTON_ID = 'kc-login'
    REGISTER_BUTTON_ID = 'register-button'

    def __init__(self, browser):
        self.browser = browser

    def is_page_visible(self):
        self.username_field()
        self.password_field()

    def username_field(self):
        return self.browser.wait().for_clickable_element_by_id(self.USERNAME_INPUT_ID)

    def password_field(self):
        return self.browser.wait().for_clickable_element_by_id(self.PASSWORD_INPUT_ID)

    def login_button(self):
        return self.browser.wait().for_clickable_element_by_id(self.LOGIN_BUTTON_ID)
    
    def register_button(self):
        return self.browser.wait().for_clickable_element_by_id(self.REGISTER_BUTTON_ID)

    def login_to_app(self):
        username_element = self.username_field()
        password_element = self.password_field()
        username_element.click()
        username_element.send_keys(ConfigurationProvider.get_custom_property(self.USERNAME))
        password_element.click()
        password_element.send_keys(ConfigurationProvider.get_custom_property(self.PASSWORD))
        self.login_button().click()

"""
Module represents Register page
"""

from tests.utils.string_utils import StringUtils


class Register:

    TEST_USERNAME = 'test_user_{}'.format(StringUtils.randomString())
    PASSWORD = '1qazZAQ!'
    NAME = 'name'
    EMAIL = 'email_{}@o2.pl'.format(StringUtils.randomString())

    USERNAME_INPUT_ID = 'username'
    PASSWORD_INPUT_ID = 'password'
    FIRST_NAME_INPUT_ID = 'firstName'
    LAST_NAME_INPUT_ID = 'lastName'
    EMAIL_INPUT_ID = 'email'
    PASSOWORD_CONFIRM_INPUT_ID = 'password-confirm'
    LOGIN_BUTTON_ID = 'kc-login'
    REGISTER_BUTTON_ID = 'register-button'
    CREATE_ACCOUNT_BUTTON_CLASS = 'button'

    def __init__(self, browser):
        self.browser = browser

    def is_page_visible(self):
        self.username_field()
        self.password_field()

    def username_field(self):
        return self.browser.wait().for_clickable_element_by_id(self.USERNAME_INPUT_ID)

    def password_field(self):
        return self.browser.wait().for_clickable_element_by_id(self.PASSWORD_INPUT_ID)

    def confirm_password_field(self):
        return self.browser.wait().for_clickable_element_by_id(self.PASSOWORD_CONFIRM_INPUT_ID)

    def first_name_field(self):
        return self.browser.wait().for_clickable_element_by_id(self.FIRST_NAME_INPUT_ID)

    def last_name_field(self):
        return self.browser.wait().for_clickable_element_by_id(self.LAST_NAME_INPUT_ID)

    def email_field(self):
        return self.browser.wait().for_clickable_element_by_id(self.EMAIL_INPUT_ID)

    def create_account_button(self):
        return self.browser.wait().for_clickable_element_by_class_name(self.CREATE_ACCOUNT_BUTTON_CLASS)

    def register_new_user(self):
        username_element = self.username_field()
        first_name_element = self.first_name_field()
        last_name_element = self.last_name_field()
        email_element = self.email_field()
        password_element = self.password_field()
        confirm_password_element = self.confirm_password_field()

        username_element.click()
        username_element.send_keys(self.TEST_USERNAME)
        first_name_element.click()
        first_name_element.send_keys(self.NAME)
        last_name_element.click()
        last_name_element.send_keys(self.NAME)
        email_element.click()
        email_element.send_keys(self.EMAIL)
        password_element.click()
        password_element.send_keys(self.PASSWORD)
        confirm_password_element.click()
        confirm_password_element.send_keys(self.PASSWORD)
        self.create_account_button().click()

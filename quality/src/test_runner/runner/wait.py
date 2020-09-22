"""
Module for waiting logic
"""

from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


class Wait(object):

    TIMEOUT = 5
    ID = "ID:"
    CSS_SELECTOR = "CSS Selector:"
    CLASS_NAME = "Class Name:"
    NAME = "Name:"
    XPATH = "XPath:"
    TAG_NAME = "Tag Name:"
    TITLE = "Title:"
    CLICKABLE = "CLICKABLE"
    VISIBLE = "VISIBLE"
    INVISIBLE = "INVISIBLE"
    PRESENT = "PRESENT"
    DISPLAYED = "DISPLAYED"
    STALE = "STALE"
    DISPLAYED_TEXT = "FILLED WITH '{}' TEXT"
    DEFAULT_MSG = "Timeout {}s while waiting for element '{} {}' to be {}"
    DEFAULT_MSG_ELEMENTS = "Timeout {}s while waiting for all elements '{} {}' to be {}"

    def __init__(self, browser):
        self._browser = browser

    def for_clickable_element_by_id(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.ID, element, self.CLICKABLE)
        return self.wait_for(EC.element_to_be_clickable((By.ID, element)), message=message)

    def for_clickable_element_by_css_selector(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.CSS_SELECTOR, element, self.CLICKABLE)
        return self.wait_for(EC.element_to_be_clickable((By.CSS_SELECTOR, element)), message=message)

    def for_clickable_element_by_class_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.CLASS_NAME, element, self.CLICKABLE)
        return self.wait_for(EC.element_to_be_clickable((By.CLASS_NAME, element)), message=message)

    def for_clickable_element_by_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.NAME, element, self.CLICKABLE)
        return self.wait_for(EC.element_to_be_clickable((By.NAME, element)), message=message)

    def for_clickable_element_by_tag_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.TAG_NAME, element, self.CLICKABLE)
        return self.wait_for(EC.element_to_be_clickable((By.TAG_NAME, element)), message=message)

    def for_clickable_element_by_xpath(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.XPATH, element, self.CLICKABLE)
        return self.wait_for(EC.element_to_be_clickable((By.XPATH, element)), message=message)

    def for_visibility_of_element(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, '', element, self.VISIBLE)
        return self.wait_for(EC.visibility_of(element), message=message)

    def for_visibility_of_element_by_id(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.ID, element, self.VISIBLE)
        return self.wait_for(EC.visibility_of_element_located((By.ID, element)), message=message)

    def for_visibility_of_element_by_class_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.CLASS_NAME, element, self.VISIBLE)
        return self.wait_for(EC.visibility_of_element_located((By.CLASS_NAME, element)), message=message)

    def for_visibility_of_element_by_xpath(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.XPATH, element, self.VISIBLE)
        return self.wait_for(EC.visibility_of_element_located((By.XPATH, element)), message=message)

    def for_invisibility_of_element_by_class_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.CLASS_NAME, element, self.INVISIBLE)
        return self.wait_for(EC.invisibility_of_element_located((By.CLASS_NAME, element)), message=message)

    def for_visibility_of_element_by_css_selector(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.CSS_SELECTOR, element, self.VISIBLE)
        return self.wait_for(EC.visibility_of_element_located((By.CSS_SELECTOR, element)), message=message)

    def for_visibility_of_all_elements_located_by_css_selector(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG_ELEMENTS.format(self.TIMEOUT, self.CSS_SELECTOR, element, self.VISIBLE)
        return self.wait_for(EC.visibility_of_all_elements_located((By.CSS_SELECTOR, element)), message=message)

    def for_presence_of_element_by_id(self, element, time=TIMEOUT, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(time, self.ID, element, self.PRESENT)
        return self.wait_for(EC.presence_of_element_located((By.ID, element)), time, message=message)

    def for_presence_of_element_by_css_selector(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.CSS_SELECTOR, element, self.PRESENT)
        return self.wait_for(EC.presence_of_element_located((By.CSS_SELECTOR, element)), message=message)

    def for_presence_of_element_by_tag_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.TAG_NAME, element, self.PRESENT)
        return self.wait_for(EC.presence_of_element_located((By.TAG_NAME, element)), message=message)

    def for_presence_of_element_by_class_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.CLASS_NAME, element, self.PRESENT)
        return self.wait_for(EC.presence_of_element_located((By.CLASS_NAME, element)), message=message)

    def for_presence_of_element_by_xpath(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.XPATH, element, self.PRESENT)
        return self.wait_for(EC.presence_of_element_located((By.XPATH, element)), message=message)

    def for_presence_of_all_elements_by_class_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG_ELEMENTS.format(self.TIMEOUT, self.CLASS_NAME, element, self.PRESENT)
        return self.wait_for(EC.presence_of_all_elements_located((By.CLASS_NAME, element)), message=message)

    def for_presence_of_all_elements_by_css_selector(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG_ELEMENTS.format(self.TIMEOUT, self.CSS_SELECTOR, element, self.PRESENT)
        return self.wait_for(EC.presence_of_all_elements_located((By.CSS_SELECTOR, element)), message=message)

    def for_presence_of_all_elements_by_tag_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG_ELEMENTS.format(self.TIMEOUT, self.TAG_NAME, element, self.PRESENT)
        return self.wait_for(EC.presence_of_all_elements_located((By.TAG_NAME, element)), message=message)

    def for_presence_of_all_elements_by_name(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG_ELEMENTS.format(self.TIMEOUT, self.NAME, element, self.PRESENT)
        return self.wait_for(EC.presence_of_all_elements_located((By.NAME, element)), message=message)

    def for_presence_of_all_elements_by_xpath(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG_ELEMENTS.format(self.TIMEOUT, self.XPATH, element, self.PRESENT)
        return self.wait_for(EC.presence_of_all_elements_located((By.XPATH, element)), message=message)

    def for_staleness_of(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, '', element, self.STALE)
        return self.wait_for(EC.staleness_of(element), message=message)

    def for_invisibility_of_element_by_css_selector(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.CSS_SELECTOR, element, self.INVISIBLE)
        return self.wait_for(EC.invisibility_of_element_located((By.CSS_SELECTOR, element)), message=message)

    def for_invisibility_of_element_by_id(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.ID, element, self.INVISIBLE)
        return self.wait_for(EC.invisibility_of_element_located((By.ID, element)), message=message)

    def for_invisibility_of_element_by_xpath(self, element, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.XPATH, element, self.INVISIBLE)
        return self.wait_for(EC.invisibility_of_element_located((By.XPATH, element)), message=message)

    def for_title(self, title, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.TITLE, title, self.DISPLAYED)
        return self.wait_for(EC.title_is(title), message=message)

    def for_expected_text_in_element_by_id(self, element, text, message=''):
        if not message:
            message = self.DEFAULT_MSG.format(self.TIMEOUT, self.ID, element, self.DISPLAYED_TEXT.format(text))
        return self.wait_for(EC.text_to_be_present_in_element((By.ID, element), text), message=message)

    def wait_for(self, condition, time=TIMEOUT, message=''):
        if not message:
            message = "Timeout {}s in 'Wait.wait_for' function executed without custom timeout message".format(time)
        return WebDriverWait(self._browser, time).until(condition, message=message)

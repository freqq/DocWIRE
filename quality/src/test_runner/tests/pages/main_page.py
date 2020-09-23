"""
Module represents main page
"""


class MainPage:

    MAIN_PAGE_ELEMENTS = ['.app-logo-header-image', '.styled-search-input', '.layout-sidebar-menu-wrapper']
    LOGOUT_BUTTON_CSS = '#logout-button'
    DROPDOWN_BUTTON_CSS = '.arrow-down'

    def __init__(self, browser):
        self.browser = browser

    def is_page_visible(self):
        for selector in self.MAIN_PAGE_ELEMENTS:
            return self.browser.wait().for_visibility_of_element_by_css_selector(selector)

    def dropdown_button(self):
        return self.browser.wait().for_clickable_element_by_css_selector(self.DROPDOWN_BUTTON_CSS)

    def logout_button(self):
        return self.browser.wait().for_clickable_element_by_css_selector(self.LOGOUT_BUTTON_CSS)

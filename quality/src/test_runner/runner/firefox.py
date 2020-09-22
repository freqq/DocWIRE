"""
Firefox browser wrapper
"""

from selenium import webdriver
from runner.browser_addons import BrowserAddons
from runner.e2e_config import E2EConfig


class Firefox(webdriver.Firefox, BrowserAddons):

    def __init__(self, base_url):
        super().__init__(firefox_profile=E2EConfig.firefox_profile(),
                         firefox_options=E2EConfig.firefox_options())
        super().set_window_size(E2EConfig.WINDOW_SIZE['w'],
                                E2EConfig.WINDOW_SIZE['h'])
        super().set_script_timeout(E2EConfig.SCRIPT_TIMEOUT)
        super().get(base_url)

    @staticmethod
    def get_logs():
        return []

    @staticmethod
    def get_color(color_tuple):
        return Firefox._format_color(*color_tuple)

    @staticmethod
    def _format_color(red, green, blue, alpha=None):
        if alpha is None:
            return 'rgb({}, {}, {})'.format(red, green, blue)
        else:
            return 'rgba({}, {}, {}, {})'.format(red, green, blue, alpha)

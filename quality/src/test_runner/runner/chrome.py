"""
Chrome browser wrapper
"""

from selenium import webdriver
from runner.browser_addons import BrowserAddons
from runner.e2e_config import E2EConfig


class Chrome(webdriver.Chrome, BrowserAddons):

    def __init__(self, base_url):
        super().__init__(options=E2EConfig.chrome_options())
        super().set_window_size(E2EConfig.WINDOW_SIZE['w'],
                                E2EConfig.WINDOW_SIZE['h'])
        super().set_script_timeout(E2EConfig.SCRIPT_TIMEOUT)
        super().get(base_url)

    def get_logs(self):
        return self.get_log('browser')

    @staticmethod
    def get_color(color_tuple):
        return Chrome._format_color(*color_tuple)

    @staticmethod
    def _format_color(red, green, blue, alpha=None):
        if alpha is None:
            return 'rgba({}, {}, {}, {})'.format(red, green, blue, 1)
        else:
            return 'rgba({}, {}, {}, {})'.format(red, green, blue, alpha)

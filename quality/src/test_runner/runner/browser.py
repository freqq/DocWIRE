"""
Selenium browser wrapper
"""

from runner.chrome import Chrome
from runner.configuration_provider import ConfigurationProvider
from runner.firefox import Firefox


class Browser(object):

    _instance = None
    _supported_browsers = {'firefox': Firefox, 'chrome': Chrome}

    @staticmethod
    def create(base_url):
        if not Browser._instance:
            browser = Browser._supported_browsers[ConfigurationProvider.get_browser()]
            Browser._instance = browser(base_url)
        return Browser._instance

    @staticmethod
    def quit():
        if Browser._instance:
            Browser._instance.quit()

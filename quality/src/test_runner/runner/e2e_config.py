"""
E2E test system configuration
"""

import tempfile
from selenium.webdriver import FirefoxProfile
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.chrome.options import Options as ChromeOptions


class E2EConfig(object):

    START = 'start'
    STOP = 'stop'

    # Browser configuration
    WINDOW_SIZE = {'w': 1600, 'h': 1000}
    TEST_TIMEOUT = 3000
    SCRIPT_TIMEOUT = 3000
    DEFAULT_WAIT_FOR_UPDATE = 60
    DOWNLOAD_DIR = tempfile.gettempdir()
    DOWNLOAD_TYPES = 'text/csv, attachment/csv, attachment/pdf, attachment/ppt, attachment/doc'
    HEADLESS = False

    @staticmethod
    def firefox_profile():
        """ Needed to overcome lack of browser download dialog support in webdriver """
        profile = FirefoxProfile()
        profile.set_preference('browser.download.folderList', 2)
        profile.set_preference('browser.download.manager.showWhenStarting', False)
        profile.set_preference('browser.download.dir', E2EConfig.DOWNLOAD_DIR)
        profile.set_preference('browser.helperApps.neverAsk.saveToDisk', E2EConfig.DOWNLOAD_TYPES)
        profile.set_preference('network.proxy.type', 0)
        profile.set_preference('browser.cache.memory.enable', False)
        profile.set_preference('browser.cache.memory.capacity', 0)
        profile.set_preference('javascript.options.asmjs', False)
        profile.set_preference('javascript.options.baselinejit', False)
        profile.set_preference('javascript.options.compact_on_user_inactive_delay', 10000)
        profile.set_preference('javascript.options.ion', False)
        profile.set_preference('javascript.options.mem.high_water_mark', 32)
        profile.set_preference('javascript.options.mem.max', 50000)
        profile.set_preference('javascript.options.wasm_baselinejit', False)
        profile.set_preference('javascript.options.wasm_ionjit', False)
        profile.set_preference('javascript.options.mem.gc_incremental_slice_ms', 50)
        profile.set_preference('javascript.options.mem.gc_high_frequency_high_limit_mb', 15)
        profile.set_preference('javascript.options.mem.gc_high_frequency_heap_growth_max', 15)
        profile.set_preference('javascript.options.mem.gc_allocation_threshold_mb', 15)
        return profile

    @staticmethod
    def firefox_options():
        options = FirefoxOptions()
        options.set_headless(headless=E2EConfig.HEADLESS)
        return options

    @staticmethod
    def chrome_options():
        options = ChromeOptions()
        options.set_headless(headless=E2EConfig.HEADLESS)
        options.add_argument('--no-sandbox')
        options.add_argument('--no-proxy-server')
        options.add_argument('--disable-dev-shm-usage')
        prefs = {'profile.default_content_settings.popups': 0,
                 'download.default_directory': E2EConfig.DOWNLOAD_DIR,
                 'net.network_prediction_options': 2}
        options.add_experimental_option('prefs', prefs)
        return options

    @staticmethod
    def set_headless_state(is_headless=False):
        E2EConfig.HEADLESS = is_headless

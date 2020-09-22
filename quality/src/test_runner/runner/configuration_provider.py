"""
Configuration provider
"""

from pathlib import Path
from testconfig import config

HOST = 'host'
URL = 'http://{}'
LOCALHOST = 'localhost'
BROWSER = 'browser'
LOGS_DIR = 'logs_dir'
ITERATION_ID = 'iteration_id'


class ConfigurationProvider:

    @staticmethod
    def get_host():
        return config[HOST]

    @staticmethod
    def get_host_address():
        return URL.format(ConfigurationProvider.get_host())

    @staticmethod
    def get_browser():
        return config[BROWSER]

    @staticmethod
    def get_logs_dir():
        return Path(config[LOGS_DIR])

    @staticmethod
    def get_iteration_id():
        return config[ITERATION_ID]

    @staticmethod
    def get_custom_property(name):
        return config[name]

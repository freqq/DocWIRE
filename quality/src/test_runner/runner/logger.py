"""
Logger for test-runner
"""

import logging
import sys


def get_logger(name='', level=logging.INFO):
    logger = logging.getLogger(name)
    logger.propagate = 0
    logger.setLevel(level)
    console_handler = logging.StreamHandler(sys.stdout)
    formatter = logging.Formatter('%(asctime)s | %(levelname)8s | %(name)s | %(message)s',
                                  datefmt='%Y-%m-%d %H:%M:%S%z')
    console_handler.setFormatter(formatter)
    logger.addHandler(console_handler)
    return logger


LOGGER = get_logger('test-runner')

"""
Module response for calling system command
"""

import shutil


def remove_dir(dir_path):
    if dir_path.is_dir():
        shutil.rmtree(str(dir_path))


def clear_dir(dir_path):
    remove_dir(dir_path)
    dir_path.mkdir(parents=True)

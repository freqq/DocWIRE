"""
Helper module for loading javascript scripts from files
"""

from pathlib import Path

SCRIPTS_DIR = Path(__file__).parent.joinpath('scripts').resolve()
SCRIPTS = {}


def load_script(name):
    if name not in SCRIPTS:
        script_path = SCRIPTS_DIR.joinpath(name).with_suffix('.js')
        with script_path.open() as script:
            SCRIPTS[name] = script.read()
    return SCRIPTS[name]

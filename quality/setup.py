"""
Test runner module
"""

from setuptools import setup, find_packages

REQUIREMENTS = [
    'urllib3==1.25.6',
    'selenium',
    'requests',
    'nose',
    'nose-testconfig',
]

setup(
    name='test-runner-docwire',
    version='0.0.1',
    author='PWr',
    description='Test runner',
    package_dir={'': 'src'},
    packages=find_packages('src'),
    package_data={'': ['*.js']},
    include_package_data=True,
    install_requires=REQUIREMENTS
)

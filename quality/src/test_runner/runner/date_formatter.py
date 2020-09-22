"""
Utilities to count tests time
"""


def calculate_time(tests_time):
    tests_time = int(tests_time)

    if tests_time <= 0:
        raise ValueError

    days = tests_time // (24 * 60 * 60)
    hours = (tests_time - days * 24 * 60 * 60) // (60 * 60)
    minutes = (tests_time - days * 24 * 60 * 60 - hours * 60 * 60) // 60
    seconds = tests_time % 60

    message = ''
    counter = 0
    if days:
        message += str(days) + 'd '
        counter += 1
    if hours:
        message += str(hours) + 'h '
        counter += 1
    if minutes and counter < 2:
        message += str(minutes) + 'm '
        counter += 1
    if seconds and counter < 2:
        message += str(seconds) + 's'

    return message

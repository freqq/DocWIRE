import random
import string


class StringUtils:

    @staticmethod
    def randomString(stringLength=8):
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(stringLength))

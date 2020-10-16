export const QUICK_SURVEY_LIST = {
  smokeCigarette: 'smokeCigarette',
  recentlyInjured: 'recentlyInjured',
  highCholesterol: 'highCholesterol',
  diabetes: 'diabetes',
};

export const getQuestionContent = question => {
  switch (question) {
    case QUICK_SURVEY_LIST.smokeCigarette:
      return 'Do you smoke cigarettes?';
    case QUICK_SURVEY_LIST.recentlyInjured:
      return 'Have you been injured recently?';
    case QUICK_SURVEY_LIST.highCholesterol:
      return 'Do you have high cholesterol?';
    case QUICK_SURVEY_LIST.diabetes:
      return 'Do you have diabetes?';
    default:
      return 'Wrong question';
  }
};

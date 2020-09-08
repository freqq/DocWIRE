import questionTypes from 'initial-diagnose/components/steps/components/question-type/QuestionTypes';

export default [
  {
    id: 1,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question:
      'Have you consumed more than 7500 mg of acetaminophen or paracetamol in any form or combination, e.g. tablets, capsules, syrups, in the prior 24 hours?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 2,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Does your belly pain move or spread to the right shoulder or right shoulder blade?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 3,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Has your gallbladder been removed?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 4,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Do you have stomach pain that comes and goes periodically?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 5,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Do you have a fever?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 6,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'How long have you been experiencing abdominal pain?',
    questionBody: {
      answers: ['Less than 2 days', '2 to 7 days', '8 to 14 days', 'Over 2 weeks.'],
    },
  },
  {
    id: 7,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Where is your abdominal pain located?',
    questionBody: {
      answers: ['All over the abdomen', 'In a part of the abdomen'],
    },
  },
  {
    id: 8,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question:
      'Please stand on your toes and drop hard onto your heels. Does that hurt your stomach?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 9,
    type: questionTypes.SCALE_QUESTION,
    question: 'How strong is your abdominal pain?',
    questionBody: {
      scaleRange: [1, 10],
    },
  },
  {
    id: 10,
    type: questionTypes.MULTI_SELECT_QUESTION,
    question: 'Do you have any of the following symptoms?',
    questionBody: {
      answers: ['Feeling sick', 'Diarrhea', 'Bloating'],
    },
  },
  {
    id: 11,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Do you experience indigestion?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 12,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Have you been burping more than usual?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 13,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Do you have a burning sensation in your throat or food pipe?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
  {
    id: 14,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'How did your stomach pain start?',
    questionBody: {
      answers: [
        'It came on gradually and reached its strongest peak in several hours',
        'It came on all of a sudden and reached its strongest peak within an hour',
      ],
    },
  },
  {
    id: 15,
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Does your belly pain move or spread to the right shoulder or right shoulder blade?',
    questionBody: {
      answers: ['Yes', 'No', "Don't know"],
    },
  },
];

import questionTypes from 'initial-diagnose/components/steps/components/question-type/QuestionTypes';
import shortid from 'shortid';

export default [
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question:
      'Have you consumed more than 7500 mg of acetaminophen or paracetamol in any form or combination, e.g. tablets, capsules, syrups, in the prior 24 hours?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Does your belly pain move or spread to the right shoulder or right shoulder blade?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Has your gallbladder been removed?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Do you have stomach pain that comes and goes periodically?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Do you have a fever?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'How long have you been experiencing abdominal pain?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Less than 2 days' },
        { id: shortid(), name: '2 to 7 days' },
        { id: shortid(), name: '8 to 14 days' },
        { id: shortid(), name: 'Over 2 weeks' },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Where is your abdominal pain located?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'All over the abdomen' },
        { id: shortid(), name: 'In a part of the abdomen' },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question:
      'Please stand on your toes and drop hard onto your heels. Does that hurt your stomach?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SCALE_QUESTION,
    question: 'How strong is your abdominal pain?',
    questionBody: {
      scaleRange: 10,
    },
  },
  {
    id: shortid(),
    type: questionTypes.MULTI_SELECT_QUESTION,
    question: 'Do you have any of the following symptoms?',
    questionBody: {
      answers: [
        { id: 1, name: 'Feeling sick' },
        { id: 2, name: 'Diarrhea' },
        { id: 3, name: 'Bloating' },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Do you experience indigestion?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Have you been burping more than usual?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Do you have a burning sensation in your throat or food pipe?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'How did your stomach pain start?',
    questionBody: {
      answers: [
        {
          id: shortid(),
          name: 'It came on gradually and reached its strongest peak in several hours',
        },
        {
          id: shortid(),
          name: 'It came on all of a sudden and reached its strongest peak within an hour',
        },
      ],
    },
  },
  {
    id: shortid(),
    type: questionTypes.SINGLE_SELECT_QUESTON,
    question: 'Does your belly pain move or spread to the right shoulder or right shoulder blade?',
    questionBody: {
      answers: [
        { id: shortid(), name: 'Yes' },
        { id: shortid(), name: 'No' },
        { id: shortid(), name: "Don't know" },
      ],
    },
  },
];

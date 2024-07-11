export const APP_NAV = {
  home: "/",
  interview: "/interview",
  interviewResult: "/interview-result",
  oneOnOne: "/one-on-one",
};
export const JOBS_LIST = [
  {
    title: "Frontend developer",
  },
  {
    title: "Backend developer",
  },
  {
    title: "QA developer",
  },
  {
    title: "UX/UI designer",
  },
];

export const MESSAGE_ASK_QUESTIONS = (position: string) => {
  return `Imagine that I am interviewing for the position ${position}. Make a list of three questions in the object array format {id: (question number), question: (the question itself), isAnswered: false}`;
};

export const MESSAGE_ASK_REVIEW = (position: string, interview: string) => {
  return `Imagine that I am interviewing you for the position ${position}. Consider the following array of objects where question is your question and answer is my answer: ${interview}. Write a review for each answer I gave, if there were any mistakes, then correct me, but do not pay attention to the grammatical and spelling errors of the text, then return an array of the following type {question: the question provided, answer: the answer provided, review: your evaluative opinion regarding response, id: number }`;
};

export const ANIMATION_VARIANTS = {
  visible: {
    opacity: 1,
    transition: {
      delay: 0.2,
      duration: 1.4,
    },
  },
  hidden: {
    opacity: 0,
  },
};

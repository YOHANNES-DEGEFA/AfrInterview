export interface AiResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: ChatChoice[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatChoice {
  index: number;
  message: {
    role: string;
    content: any;
  };
  finish_reason: string;
}

export interface InterviewQuestions {
  id: number;
  question: string;
  isAnswered: boolean;
}
export interface InterviewAnswers {
  question: string;
  answer: string;
}
export interface InterviewReview {
  id: number;
  question: string;
  answer: string;
  review: string;
}

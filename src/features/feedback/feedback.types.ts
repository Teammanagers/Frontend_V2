type FeedbackDept = 0 | 1 | 2;

interface FeedbackResponse {
  name: string;
  tagList: string[];
  date: string;
  content: string;
  imgUrl: string;
}

export type { FeedbackDept, FeedbackResponse };

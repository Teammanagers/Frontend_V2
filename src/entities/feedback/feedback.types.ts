interface Author {
  id: number;
  name: string;
  belong: string | null;
}

interface Feedback {
  id: number;
  content: string;
  parentId: number | null;
  author: Author;
  createdAt: string;
  updatedAt: string;
  children: Feedback[];
}

type FeedbackDepth = 0 | 1 | 2;

export type { Feedback, FeedbackDepth };

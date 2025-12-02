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

export type { Feedback };

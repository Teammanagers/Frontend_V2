interface Notice {
  content: string;
  createdAt: string;
  createdBy: number;
  id: number;
  teamId: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

type NoticeResponse = {
  notice: Notice;
};

type CreateNoticeRequest = {
  content: string;
};

export type { NoticeResponse, CreateNoticeRequest };

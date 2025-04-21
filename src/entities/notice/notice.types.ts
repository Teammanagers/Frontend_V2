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

type FetchNoticeResponse = {
  notice: Notice;
};

type CreateNoticeReqeust = {
  content: string;
};

export type { FetchNoticeResponse, CreateNoticeReqeust };

interface FetchNoticeResponse {
  notice: {
    content: string;
    createdAt: string;
    createdBy: number;
    id: number;
    teamId: number;
    updatedAt: string;
    updatedBy: number;
    useYn: string;
  };
}

type CreateNoticeReqeust = {
  content: string;
};

export type { FetchNoticeResponse, CreateNoticeReqeust };

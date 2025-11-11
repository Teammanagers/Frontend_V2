export interface TeamTag {
  id: number;
  name: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

export interface Team {
  id: number;
  title: string;
  password: string;
  code: string;
  rootFolderId: number;
  timeslotId: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

interface ResourceInfo {
  id: number;
  originalFileName: string;
  physicalFileName: string;
  filePath: string;
  fileNameExtension: string;
  fileSize: number;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

interface ResourceInfoResponse {
  dataId: number;
  teamMemberId: number;
  fileInfo: ResourceInfo;
  fileUrl: string;
}

export type { ResourceInfoResponse };

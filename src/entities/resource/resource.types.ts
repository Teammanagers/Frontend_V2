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

interface TagDto {
  id: number;
  name: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

interface Resource {
  dataId: number;
  fileInfo: ResourceInfo;
  fileUrl: string;
  tagDto: TagDto;
  teamMemberId: number;
}

// API 응답 타입
interface ResourceListResponse {
  dataList: Resource[];
}

export type { ResourceInfo, Resource, ResourceListResponse };

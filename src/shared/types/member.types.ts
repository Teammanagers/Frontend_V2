// 팀 관리, 마이페이지 프로필 부분에서 공용으로 사용

export interface ProviderInfo {
  provider: string;
  providerId: string;
}

export interface Member {
  id: number;
  name: string;
  birth: string;
  email: string | null;
  telNum: string;
  belong: string;
  providerInfo: ProviderInfo;
  role: string;
  createdAt: string;
  updatedAt: string;
  useYn: 'Y' | 'N';
}

export interface IMemberResponse {
  teamMemberId: number;
  member: Member;
  imgUrl: string | null;
  grantedRoleList: IGrantedRole[];
}

export interface ITeamMemberResponse {
  leader: IMemberResponse;
  members: IMemberResponse[];
}

export interface IGrantedRole {
  id: number;
  name: string;
  createdAt: string;
  createdBy: number;
  updatedAt: string;
  updatedBy: number;
  useYn: string;
}

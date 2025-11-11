export interface IUseTeamMutations {
  title: string;
  imageFile: File | null;
}

export interface ITeamTagInput {
  tagId: number;
  tagName: string;
}

export interface ICreateMemberTagInput {
  memberId: number;
  tagName: string;
}

export interface IEditMemberTagInput {
  tagId: number;
  memberId: number;
  tagName: string;
}

export interface IDeleteMemberTag {
  tagId: number;
  memberId: number;
}

export interface ITimeRange {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
}

export interface IDaySchedule {
  dayOfWeek: 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';
  timeRanges: ITimeRange[];
}

export interface IRegisterScheduleInput {
  times: IDaySchedule[];
}

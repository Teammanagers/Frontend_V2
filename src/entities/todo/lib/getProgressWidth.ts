import { ITeamProgressStatus } from '../todo.type';

// 라벨에 해당하는 count를 가져오는 함수
const getCountByLabel = (label: string, progressArr: ITeamProgressStatus[]) => {
  return progressArr.find((status) => status.label === label)?.count;
};

// 전체 count에 대한 비율을 계산하는 함수
const calculateWidth = (total: number, count: number | undefined) => {
  if (total === 0) return;

  return ((count ?? 0) / total) * 100;
};

// 특정 라벨의 진행률을 계산하여 너비의 비율을 반환하는 함수
const getProgressWidth = (
  label: string,
  progressArr: ITeamProgressStatus[],
) => {
  // 전체 count를 구함
  const totalCount =
    progressArr.find((status) => status.label === '전체')?.count ?? 0;

  const count = getCountByLabel(label, progressArr); // 해당 label의 count를 가져옴

  return calculateWidth(totalCount, count);
};

export { getProgressWidth };

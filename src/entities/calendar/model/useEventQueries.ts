import apiRequest from '@/shared/api/apiRequest';
import { TEAM_ID } from '@/shared/config/constants/team.constants';
import { queryClient } from '@/shared/config/queryClient';
import { useMutation } from '@tanstack/react-query';
import { Event } from '../calendar.types';

export default function useEventQueries() {
  //   // 최신 공지 조회
  //   const useRecentNoticeQuery = (): QueryResponse & {
  //     data: FetchNoticeResponse;
  //   } => {
  //     const { isPending, isError, error, isSuccess, data } = useQuery({
  //       queryKey: ['notice', 'recent'],
  //       queryFn: async () => {
  //         return await apiRequest({
  //           url: `/api/v2/team/${TEAM_ID}/notice`,
  //           method: 'GET',
  //         });
  //       },
  //       staleTime: 60 * 1000 * 10, // 10분
  //       select: (data) => data.result,
  //     });

  //     useEffect(() => {
  //       if (isError) {
  //         console.error('최신 공지 조회 실패', error);
  //       }
  //     }, [isError, isSuccess, data]);

  //     return { isPending, isError, isSuccess, data };
  //   };

  // // 일정 생성
  // const useCreateEventMutation = () => {
  //   const { mutate, isPending, isError, isSuccess } = useMutation({
  //     mutationFn: async ({ yearMonth, data }) => {
  //       return await apiRequest({
  //         url: `/api/v2/calendar/list?teamId=${TEAM_ID}&yearMonth=${yearMonth}`,
  //         method: 'POST',
  //         data,
  //       });
  //     },
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({
  //         queryKey: ['event'],
  //       });
  //     },
  //   });

  //   return { mutate, isPending, isError, isSuccess };
  // };

  // 일정 생성
  const useCreateEventMutation = () => {
    const { mutate, data, isPending, isError, isSuccess } = useMutation({
      mutationFn: async (data: Event) => {
        return await apiRequest({
          url: `/api/v2/calendar/${TEAM_ID}`,
          method: 'POST',
          data,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ['event'],
        });
      },
    });

    return { mutate, data, isPending, isError, isSuccess };
  };

  return { useCreateEventMutation };
}

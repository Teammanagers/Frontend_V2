import { Route, Routes } from 'react-router-dom';
import { ROUTE_SEGMENTS } from '@/app/routes/paths';
import { EditMemo } from '@/entities/memo/ui/EditMemo.tsx';
import { WriteMemo } from '@/entities/memo/ui/WriteMemo.tsx';
import { MemoPage } from '@/pages/MemoPage/memo.tsx';
import { MemoDetail } from '@/widgets/memo/MemoDetail.tsx';

export const ExtraMemoPage = () => {
  return (
    <Routes>
      <Route path={ROUTE_SEGMENTS.MEMO_FOLDER} element={<MemoPage />} />
      <Route path={ROUTE_SEGMENTS.MEMO_DETAIL} element={<MemoDetail />} />
      <Route path={ROUTE_SEGMENTS.MEMO_WRITE} element={<WriteMemo />} />
      <Route path={ROUTE_SEGMENTS.MEMO_EDIT} element={<EditMemo />} />
    </Routes>
  );
};

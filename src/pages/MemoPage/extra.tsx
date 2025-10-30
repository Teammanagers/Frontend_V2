import { Route, Routes } from 'react-router-dom';
import { ROUTE_SEGMENTS } from '@/app/routes/paths';
import { EditMemo } from '@/entities/memo/ui/EditMemo.tsx';
import { WriteMemo } from '@/entities/memo/ui/WriteMemo.tsx';
import { MemoPage } from '@/pages/MemoPage/memo.tsx';

export const ExtraMemoPage = () => {
  return (
    <Routes>
      <Route path={ROUTE_SEGMENTS.MEMO_DETAIL} element={<MemoPage />} />
      <Route path={ROUTE_SEGMENTS.MEMO_WRITE} element={<WriteMemo />} />
      <Route path={ROUTE_SEGMENTS.MEMO_EDIT} element={<EditMemo />} />
    </Routes>
  );
};

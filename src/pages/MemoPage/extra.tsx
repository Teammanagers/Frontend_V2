import { Route, Routes } from 'react-router-dom';
import { EditMemo } from '@/entities/memo/ui/EditMemo.tsx';
import { WriteMemo } from '@/entities/memo/ui/WriteMemo.tsx';
import { MemoList } from '@/widgets/memo/MemoList.tsx';

export const ExtraMemoPage = () => {
  return (
    <Routes>
      <Route path=":folderId" element={<MemoList />} />
      <Route path=":folderId/write" element={<WriteMemo />} />
      <Route path="edit/:memoId" element={<EditMemo />} />
    </Routes>
  );
};

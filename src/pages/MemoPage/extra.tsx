import { Route, Routes } from 'react-router-dom';
import { WriteMemo } from '@/entities/memo/ui/WriteMemo.tsx';

export const ExtraMemoPage = () => {
  return (
    <Routes>
      <Route path="write" element={<WriteMemo />} />
    </Routes>
  );
};

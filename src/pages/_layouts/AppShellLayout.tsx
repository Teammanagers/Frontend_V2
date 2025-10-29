import { Outlet } from 'react-router-dom';
import SideBarContainer from '@/features/sidebar/SideBarContainer.tsx';
import { useSyncTeamIdWithStore } from '@/shared/hooks/useSyncTeamIdWithStore';

const COLLAPSED = 73;

export default function AppShellLayout() {
  useSyncTeamIdWithStore();

  return (
    <>
      <SideBarContainer />
      <main
        style={{
          marginLeft: COLLAPSED,
          transition: 'margin-left 0.3s ease',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </main>
    </>
  );
}

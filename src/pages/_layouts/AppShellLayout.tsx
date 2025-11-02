import { Outlet } from 'react-router-dom';
import { useSyncTeamIdWithStore } from '@/shared/hooks/useSyncTeamIdWithStore';
import SideBarContainer from '@/features/sidebar/ui/SideBarContainer';

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

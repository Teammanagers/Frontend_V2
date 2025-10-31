import { Outlet } from 'react-router-dom';
import SideBarContainer from '@/features/sidebar/ui/SideBarContainer.tsx';

const COLLAPSED = 73;

export default function AppShellLayout() {
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

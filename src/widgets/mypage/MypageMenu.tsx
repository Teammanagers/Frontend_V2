import styled from 'styled-components';
import { mypageRoutes } from '@/app/routes/paths';
import MypageMenuLink from './MypageMenuLink';

export default function MypageMenu() {
  return (
    <Container>
      {mypageRoutes.map((menu) => {
        if (!menu.icon) return null;

        const IconComponent = menu.icon;

        return (
          <MypageMenuLink
            key={menu.label}
            to={menu.to}
            icon={<IconComponent />}
          >
            {menu.label}
          </MypageMenuLink>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
  padding-left: 10%;
`;

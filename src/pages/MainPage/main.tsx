import styled from 'styled-components';
import { mainRoutes } from '@/app/routes/paths';
import MainSectionLink from '@/entities/main/ui/MainSectionLink';
import { TeamCodeCopy } from '@/entities/main/ui/TeamCodeCopy';
import { NoticeBanner } from '@/widgets/notice/NoticeBanner';
import MainSectionLayout from '../_layouts/MainSectionLayout';

export function MainPage() {
  return (
    <Container>
      <MainHeader>
        {/* 공지 사항 배너 */}
        <NoticeBanner />
        {/* 팀 코드 복사 */}
        <TeamCodeCopy />
      </MainHeader>

      <ContentWrapper>
        {mainRoutes.map((item) => {
          if (!item.component) return null;

          // React가 인식할 수 있도록 대문자로 시작하는 컴포넌트로 변환하여 변수에 할당
          const ContentComponent = item.component;

          return (
            <SectionWrapper key={item.to}>
              <MainSectionLayout
                navLink={
                  <MainSectionLink to={item.to}>{item.label}</MainSectionLink>
                }
                content={<ContentComponent />}
              />
            </SectionWrapper>
          );
        })}
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  padding-top: 74px;
`;

const MainHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 20px;
  row-gap: 32px;
  width: 1056px;
`;

const SectionWrapper = styled.div`
  width: 518px;
`;

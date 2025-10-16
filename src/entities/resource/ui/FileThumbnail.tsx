import styled from 'styled-components';
import {
  DEFAULT_ICON,
  EXTENSION_ICON_MAP,
  Extensions,
} from '../resource.constants';

export default function FileThumbnail({
  extension,
}: {
  extension: Extensions | string;
}) {
  const lowercaseExtension = extension.toLowerCase();

  // 확장자에 해당하는 아이콘 컴포넌트를 가져오고, 없으면 기본 아이콘 사용
  const ExtensionIcon =
    (EXTENSION_ICON_MAP as Record<string, typeof DEFAULT_ICON>)[
      lowercaseExtension
    ] || DEFAULT_ICON;

  return (
    <Container>
      <ExtensionIcon />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

import copy from 'copy-to-clipboard';
import { KeyboardEvent, ChangeEvent, useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { TeamInfoProps } from '@/entities/management/management.types.ts';
// import { updateProfile, updateTag } from '@/entities/team/api/team.api.stub';
// import { useTeamTags } from '@/entities/team/hooks/useTeamTags';
import useTeamMutations from '@/entities/management/model/useTeamMutations.ts';
import Plus from '@/shared/assets/common/plus.svg?react';
// import DeleteIcon from '@/shared/assets/management/delete-icon.svg?react';
import EditIcon from '@/shared/assets/management/edit.svg?react';
import DefaultProfileImg from '@/shared/assets/management/profile-img-default.svg?react';
import UploadIcon from '@/shared/assets/management/upload-icon.svg?react';
import { Button } from '@/shared/components/button/Button.tsx';

export const TeamInfo = ({
  // id,
  title,
  imageUrl,
  teamCode,
  tagList,
}: TeamInfoProps) => {
  const [profileImage, setProfileImage] = useState<string | null>(imageUrl);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [copyCode, setCopyCode] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [teamName, setTeamName] = useState<string>(title);
  // const [isHovered, setIsHovered] = useState<boolean>(false);

  const { useEditTeamMutation } = useTeamMutations();
  const { mutate: editTeam } = useEditTeamMutation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImgChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // 화면에 보임
      setImageFile(file); // API 전송
      editTeam({
        title: teamName,
        imageFile: file,
      });
    }
  };

  const handleImgClick = () => fileInputRef.current?.click();

  const handleNameKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      editTeam({
        title: teamName,
        imageFile: imageFile,
      });
    }
  };

  const handleCopyCode = () => {
    if (teamCode) {
      copy(teamCode);
      setCopyCode(true);
    }
  };

  useEffect(() => {
    if (copyCode) {
      const timer = setTimeout(() => setCopyCode(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [copyCode]);

  // const {
  //   tags,
  //   newTag,
  //   editTagIndex,
  //   handleEditTag,
  //   startEditingTag,
  //   setTags,
  //   setNewTag,
  // } = useTeamTags({
  //   initialTags: tagList,
  //   onEditTeamTag: async (tagId: number, name: string) => {
  //     await updateTag(teamId, tagId, name);
  //     refreshTeamData();
  //   },
  // });

  // useEffect(() => {
  //   setTags(tagList);
  // }, [tagList, setTags]);

  return (
    <Container>
      <ProfileContainer onClick={handleImgClick}>
        {profileImage ? <ProfileImg src={profileImage} /> : <DefaultImg />}
        <UploadIconStyled />
        <HiddenInput
          type="file"
          accept="image/jpeg, image/png"
          ref={fileInputRef}
          onChange={handleImgChange}
        />
      </ProfileContainer>
      <InfoContainer>
        <TopContainer>
          <TitleContainer>
            <InfoTitle>Title</InfoTitle>
            <InfoBox>
              {isEditing ? (
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  onKeyDown={handleNameKeyDown}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                />
              ) : (
                <>
                  <Title>{teamName}</Title>
                  <EditBtn onClick={() => setIsEditing(true)} />
                </>
              )}
            </InfoBox>
          </TitleContainer>
          <CodeWrapper>
            <CodeContainer>
              <InfoTitle>Team Code</InfoTitle>
              <InfoBox>
                <Code>{teamCode}</Code>
              </InfoBox>
              {copyCode && <CopyText>코드가 복사되었습니다.</CopyText>}
            </CodeContainer>
            <Button size="mini" style="main" onClick={handleCopyCode}>
              팀 코드복사
            </Button>
          </CodeWrapper>
        </TopContainer>
        <BottomContainer>
          <InfoTitle>Tag</InfoTitle>
          <TagContainer>
            {tagList.map((tag) => (
              <TagBox key={tag.id}>
                <TagText>{tag.name}</TagText>
              </TagBox>
            ))}
            <AddBtn>
              <Plus stroke="#5C9EFF" strokeWidth={2} />
            </AddBtn>
          </TagContainer>
        </BottomContainer>
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
`;
const ProfileContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  cursor: pointer;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 38px;
  object-fit: cover;
  border: 1px solid ${({ theme }) => theme.colors.mainBlue};
`;

const DefaultImg = styled(DefaultProfileImg)`
  width: 100%;
  height: 100%;
  border-radius: 38px;
  background: white;
  border: 2px solid ${({ theme }) => theme.colors.mainBlue};
`;

const UploadIconStyled = styled(UploadIcon)`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(25%, 25%);
  cursor: pointer;
`;

const HiddenInput = styled.input`
  display: none;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 180px;
  gap: 36px;
`;

const TopContainer = styled.div`
  display: flex;
  height: 66px;
  gap: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 421px;
  gap: 2px;
`;

export const InfoTitle = styled.p`
  font-size: 16px;
  font-weight: 700;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.silver};
`;

const Title = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

const EditBtn = styled(EditIcon)`
  cursor: pointer;
`;

const CodeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CodeContainer = styled(TitleContainer)`
  width: 327px;
`;

const CopyText = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
  padding: 0;
`;

const Code = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 768px;
`;

const TagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 52px;
`;

const TagBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px 8px 12px;
  border-radius: 5px;
  background: white;
`;

const TagText = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainBlue};
`;

const AddBtn = styled.button`
  display: flex;
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background: white;
  justify-content: center;
  align-items: center;
`;

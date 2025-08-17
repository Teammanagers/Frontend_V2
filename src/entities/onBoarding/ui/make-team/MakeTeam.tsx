import { useState } from 'react';
import MakeTeamTagProvider from './MakeTeamTagProvider';
import MakeTeamFirstStage from './stage/MakeTeamFirstStage';
import MakeTeamSecondStage from './stage/MakeTeamSecondStage';
import { useTeamImgUpload } from '../../model/useMakeTeam';

export default function MakeTeam() {
  const [stage, setStage] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const { postImg, previewImg, handleFileUpload } = useTeamImgUpload();
  const [createdTeamId, setCreatedTeamId] = useState<number | null>(null);
  const [createdTeamCode, setCreatedTeamCode] = useState<number | null>(null);
  return (
    <MakeTeamTagProvider>
      {stage === 1 && (
        <MakeTeamFirstStage
          setStage={setStage}
          title={title}
          setTitle={setTitle}
          handleFileUpload={handleFileUpload}
          previewImg={previewImg}
          postImg={postImg}
          setCreatedTeamId={setCreatedTeamId}
          setCreatedTeamCode={setCreatedTeamCode}
        />
      )}
      {stage === 2 && (
        <MakeTeamSecondStage
          createdTeamCode={createdTeamCode}
          createdTeamId={createdTeamId}
          setStage={setStage}
        />
      )}
    </MakeTeamTagProvider>
  );
}

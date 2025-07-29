import { useState } from 'react';
import MakeTeamTagProvider from './MakeTeamTagProvider';
import MakeTeamFirstStage from './stage/MakeTeamFirstStage';
import MakeTeamSecondStage from './stage/MakeTeamSecondStage';
import { useTeamImgUpload } from '../../model/useMakeTeam';

export default function MakeTeam() {
  const [stage, setStage] = useState<number>(1);
  const [title, setTitle] = useState<string>('');
  const { postImg, previewImg, handleFileUpload } = useTeamImgUpload();
  return (
    <MakeTeamTagProvider>
      {stage === 1 && (
        <MakeTeamFirstStage
          setStage={setStage}
          title={title}
          setTitle={setTitle}
          handleFileUpload={handleFileUpload}
          previewImg={previewImg}
        />
      )}
      {stage === 2 && (
        <MakeTeamSecondStage
          title={title}
          postImg={postImg}
          setStage={setStage}
        />
      )}
    </MakeTeamTagProvider>
  );
}

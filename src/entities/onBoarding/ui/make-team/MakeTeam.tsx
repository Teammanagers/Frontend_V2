import { useState } from 'react';
import MakeTeamTagProvider from './MakeTeamTagProvider';
import MakeTeamFirstStage from './stage/MakeTeamFirstStage';
import MakeTeamSecondStage from './stage/MakeTeamSecondStage';

export default function MakeTeam() {
  const [stage, setStage] = useState<number>(1);
  const [title, setTitle] = useState<string>('');

  return (
    <MakeTeamTagProvider>
      {stage === 1 && (
        <MakeTeamFirstStage
          setStage={setStage}
          title={title}
          setTitle={setTitle}
        />
      )}
      {stage === 2 && <MakeTeamSecondStage title={title} />}
    </MakeTeamTagProvider>
  );
}

import { useState } from 'react';
import MakeTeamFirstStage from './stage/MakeTeamFirstStage';
import MakeTeamSecondStage from './stage/MakeTeamSecondStage';

export default function MakeTeam() {
  const [stage, setStage] = useState<number>(1);
  if (stage === 1) {
    return <MakeTeamFirstStage setStage={setStage}></MakeTeamFirstStage>;
  } else {
    return <MakeTeamSecondStage></MakeTeamSecondStage>;
  }
}

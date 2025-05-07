import { useState } from 'react';
import FirstStage from './stages/FirstStage';
import SecondStage from './stages/SecondStage';

export default function SignUpStage() {
  const [stage, setStage] = useState<number>(1);
  if (stage === 1) {
    return <FirstStage setStage={setStage} />;
  } else {
    return <SecondStage />;
  }
}

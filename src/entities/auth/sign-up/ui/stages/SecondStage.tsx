import Input from '@/shared/components/input/Input';

export default function SecondStage() {
  return (
    <div>
      <Input
        title="Team code"
        subTitle="어쩌구저쩌구"
        placeholder="팀명 또는 프로젝트명을 입력해 주세요"
      />
      <Input
        title="아이이잇"
        subTitle="ㅋㅋㅋ"
        placeholder="어어업"
        textColor="blue"
        showHelperMessage={true}
        helperMessage="아이요"
      />
    </div>
  );
}

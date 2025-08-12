import AddFeedbackButton from '@/entities/feedback/AddFeedbackButton';
import AddResourceButton from '@/entities/resource/AddResourceButton';

export function ResourcePage() {
  return (
    <div>
      <div style={{ width: '486px', height: '66px' }}>
        <AddResourceButton />
      </div>
      <AddResourceButton size="small" />
      <AddFeedbackButton />
    </div>
  );
}

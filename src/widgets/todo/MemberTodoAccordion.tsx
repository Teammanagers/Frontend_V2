import { useTodoForm } from '@/entities/todo/model/useTodoForm';
import { MemberTodos } from '@/entities/todo/todo.type';
import AddTodoButton from '@/entities/todo/ui/AddTodoButton';
import { Todo } from '@/features/todo/ui/Todo';
import TodoForm from '@/features/todo/ui/TodoForm';
import { Accordion } from '@/shared/components/accordion';

export default function MemberTodoAccordion({
  teamMember,
}: {
  teamMember: MemberTodos;
}) {
  const { isInputActive, setIsInputActive, handleTriggerBtnClick } =
    useTodoForm();

  return (
    <Accordion
      key={teamMember.teamMemberId}
      title={teamMember.name}
      tagList={teamMember.tagList.map((tag: string) => tag)}
      onCloseClear={() => setIsInputActive(false)}
    >
      {teamMember.todoList.map((todo, idx) => (
        <Todo
          key={`${teamMember.teamMemberId}-todo-${todo.id}-${idx}`}
          buttonType={
            // 내 투두이면 'menu', 아니면 'alarm' 버튼을 렌더링
            // TODO: OWNER_TEAMMANAGE_ID 를 실제 내 팀원 ID로 교체 필요 (아래 예시 주석 참고)
            // teamMember.teamMemberId === OWNER_TEAMMANAGE_ID ? 'menu' : 'alarm'
            teamMember.teamMemberId === 1 ? 'menu' : 'alarm'
          }
          {...todo}
        />
      ))}

      {/* 투두 추가 폼 */}
      {isInputActive ? (
        <TodoForm mode="add" id={teamMember.teamMemberId} />
      ) : (
        <AddTodoButton onClick={handleTriggerBtnClick} />
      )}
    </Accordion>
  );
}

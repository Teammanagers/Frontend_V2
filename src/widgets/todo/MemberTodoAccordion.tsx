import { useTodoForm } from '@/entities/todo/model/useTodoForm';
import { MemberTodos } from '@/entities/todo/todo.type';
import AddTodoButton from '@/entities/todo/ui/AddTodoButton';
import { Todo } from '@/features/todo/ui/Todo';
import TodoForm from '@/features/todo/ui/TodoForm';
import { Accordion } from '@/shared/components/accordion';
import { useTeamStore } from '@/shared/model/store/teamStore';

export default function MemberTodoAccordion({
  teamMember,
}: {
  teamMember: MemberTodos;
}) {
  const { isInputActive, setIsInputActive, handleTriggerBtnClick } =
    useTodoForm();
  const myTeamMemberId = useTeamStore((state) => state.teamMemberId);

  return (
    <Accordion
      key={teamMember.teamMemberId}
      teamMemberId={teamMember.teamMemberId}
      title={teamMember.name}
      tagList={teamMember.tagList}
      onCloseClear={() => setIsInputActive(false)}
    >
      {teamMember.todoList.map((todo) => (
        <Todo
          key={`${teamMember.teamMemberId}-todo-${todo.id}`}
          buttonType={
            // 내 투두이면 'menu', 아니면 'alarm' 렌더링
            teamMember.teamMemberId === myTeamMemberId ? 'menu' : 'alarm'
          }
          {...todo}
        />
      ))}

      {/* 투두 추가 폼 */}
      {isInputActive ? (
        <TodoForm mode="add" />
      ) : (
        <AddTodoButton onClick={handleTriggerBtnClick} />
      )}
    </Accordion>
  );
}

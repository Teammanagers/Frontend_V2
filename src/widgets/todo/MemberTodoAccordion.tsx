import { Accordion } from '@/shared/components/accordion';
import TodoForm from '@/features/todo/ui/TodoForm';
import { Todo } from '@/features/todo/ui/Todo';
import { ITeamMemberTodo } from '@/entities/todo/todo.type';
import { OWNER_TEAMMANAGE_ID } from '@/shared/config/constants/team.constants';
import { useTodoForm } from '@/entities/todo/model/useTodoForm';
import AddTodoButton from '@/entities/todo/ui/AddTodoButton';

export default function MemberTodoAccordion({
  teamMember,
}: {
  teamMember: ITeamMemberTodo;
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
            teamMember.teamMemberId === OWNER_TEAMMANAGE_ID ? 'menu' : 'alarm'
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

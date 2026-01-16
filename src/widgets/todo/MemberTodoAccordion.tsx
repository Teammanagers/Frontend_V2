import { useState } from 'react';
import { useIsTeamLeader } from '@/entities/team/model/useIsTeamLeader';
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
  const isMe = teamMember.teamMemberId === myTeamMemberId;
  const { isTeamLeader } = useIsTeamLeader();

  const [selectedTeamMemberId, setSelectedTeamMemberId] = useState<
    number | null
  >(null);

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
          todo={todo}
          buttonType={
            // TODO: 내 투두아닐 때 'alarm' 렌더링 (깨우기 기능 추가 시 변경 필요)
            isMe || isTeamLeader ? 'menu' : 'none'
          }
        />
      ))}

      {/* 투두 추가 폼 */}
      {isInputActive ? (
        <TodoForm mode="add" selectedTeamMemberId={selectedTeamMemberId} />
      ) : (
        <AddTodoButton
          isMe={isMe}
          onClick={() =>
            handleTriggerBtnClick(() =>
              setSelectedTeamMemberId(teamMember.teamMemberId),
            )
          }
        />
      )}
    </Accordion>
  );
}

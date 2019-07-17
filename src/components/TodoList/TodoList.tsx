import React, { useState } from 'react';
import styled from 'styled-components';
import Item from './Item';
import { Task, useGlobalState } from '../../global-state';
import { usePrevious } from '../helpers/hooks';

interface TodoListProps {
  tasks: Task[];
}

const Container = styled.div`
  position: relative;
`;

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const [editItemId, setEditItemId] = useState('');
  const prevTasks = usePrevious<Task[]>(tasks);
  const { startTimer, toggleTaskDone } = useGlobalState();

  if (prevTasks && tasks.length !== prevTasks.length) {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  return (
    <Container>
      {tasks.map(task => (
        <Item
          mode={editItemId === task.id ? 'EDIT' : 'NORMAL'}
          text={task.text}
          key={task.id}
          done={task.doneDate !== null}
          tomatoes={task.tomatoes}
          onClickPlayBtn={() => startTimer(task.id)}
          onClickDoneBtn={() => toggleTaskDone(task.id)}
          onClickEditBtn={() => setEditItemId(task.id)}
          onClickOutside={() => setEditItemId('')}
        />
      ))}
    </Container>
  );
};

export default TodoList;

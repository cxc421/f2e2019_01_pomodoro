import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { Task } from '../../global-state';
import { usePrevious } from '../helpers/hooks';

interface TodoListProps {
  tasks: Task[];
}

const Container = styled.div`
  position: relative;
`;

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const prevTasks = usePrevious<Task[]>(tasks);

  if (prevTasks && tasks.length !== prevTasks.length) {
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 0);
  }

  return (
    <Container>
      {tasks.map(task => (
        <Item
          text={task.text}
          key={task.id}
          done={task.doneDate !== null}
          tomatoes={task.tomatoes}
        />
      ))}
    </Container>
  );
};

export default TodoList;

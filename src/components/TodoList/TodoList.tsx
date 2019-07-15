import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { Task } from '../../global-state';

interface TodoListProps {
  tasks: Task[];
}

const Container = styled.div`
  position: relative;
`;

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
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

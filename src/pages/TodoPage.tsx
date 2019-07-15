import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '../global-state';
import AddMissionInput from '../components/AddMissionInput';
import TableLayout from '../components/TableLayout';
import TodoList from '../components/TodoList/TodoList';

const Container = styled.div`
  position: relative;
  /* background: whitesmoke; */
  width: 100%;
  height: 100%;
  font-size: 30px;
  display: flex;
  flex-direction: column;
`;

// const TestContent = styled.div`
//   width: 100px;
//   height: 600px;
//   background: red;
// `;

// const TestContent2 = styled.div`
//   width: 100px;
//   height: 990px;
//   background: blue;
// `;

const TodoPage = () => {
  const {
    state: { todoTasks, doneTasks }
  } = useGlobalState();

  const tableMaxHeight = `calc((100% - 72px - 28px - 24px) / 2)`;

  const todoTableStyle: React.CSSProperties = {
    marginTop: 28
  };

  const doneTableStyle: React.CSSProperties = {
    marginTop: 24
  };

  return (
    <Container>
      <AddMissionInput />
      <TableLayout
        headText="TO-DO"
        collapsible={true}
        maxHeight={tableMaxHeight}
        style={todoTableStyle}
      >
        <TodoList tasks={todoTasks} />
      </TableLayout>
      <TableLayout
        headText="DONE"
        collapsible={true}
        maxHeight={tableMaxHeight}
        style={doneTableStyle}
      >
        <TodoList tasks={doneTasks} />
      </TableLayout>
    </Container>
  );
};

export default TodoPage;

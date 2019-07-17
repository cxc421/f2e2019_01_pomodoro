import React from 'react';
import styled from 'styled-components';
import { useGlobalState } from '../global-state';
import AddMissionInput from '../components/AddMissionInput';
import TableLayout from '../components/TableLayout';
import TodoList from '../components/TodoList/TodoList';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Container = styled.div`
  position: relative;
  /* background: whitesmoke; */
  /* width: calc(100% - 1px); */
  width: 100%;
  height: 100%;
  font-size: 30px;
  overflow: hidden;
`;

const TodoPage = () => {
  const {
    state: { todoTasks, doneTasks }
  } = useGlobalState();

  // const tableMaxHeight = `calc((100% - 72px - 28px - 24px) / 2)`;

  const todoTableStyle: React.CSSProperties = {
    marginTop: 28
  };

  const doneTableStyle: React.CSSProperties = {
    marginTop: 24
  };

  return (
    <Container>
      <PerfectScrollbar>
        <AddMissionInput />
        <TableLayout
          headText="TO-DO"
          collapsible={true}
          // maxHeight={tableMaxHeight}
          style={todoTableStyle}
        >
          <TodoList tasks={todoTasks} />
        </TableLayout>
        <TableLayout
          headText="DONE"
          collapsible={true}
          // maxHeight={tableMaxHeight}
          style={doneTableStyle}
        >
          <TodoList tasks={doneTasks} />
        </TableLayout>
      </PerfectScrollbar>
    </Container>
  );
};

export default TodoPage;

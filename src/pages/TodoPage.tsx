import React, { useState } from 'react';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { SortEndHandler, SortStartHandler } from 'react-sortable-hoc';
import { useGlobalState } from '../global-state';
import AddMissionInput from '../components/AddMissionInput';
import TableLayout from '../components/TableLayout';
import TodoList from '../components/TodoList/TodoList';

const Container = styled.div`
  position: relative;
  /* background: whitesmoke; */
  width: calc(100% - 1px);
  /* width: 100%; */
  height: 100%;
  font-size: 30px;
  overflow: hidden;
`;

const TodoPage = () => {
  const {
    state: { todoTasks, doneTasks },
    swapTodoTasks
  } = useGlobalState();

  const [prevDragNode, setPrevDragNode] = useState<null | HTMLElement>(null);

  // const tableMaxHeight = `calc((100% - 72px - 28px - 24px) / 2)`;

  const todoTableStyle: React.CSSProperties = {
    marginTop: 28
  };

  const doneTableStyle: React.CSSProperties = {
    marginTop: 24
  };

  const onSortEnd: SortEndHandler = ({ newIndex, oldIndex }) => {
    swapTodoTasks(oldIndex, newIndex);
    if (prevDragNode) {
      prevDragNode.style.borderBottomColor = 'black';
      // prevDragNode.style.background = 'white';
      prevDragNode.style.boxShadow = 'none';
    }
  };

  const updateBeforeSortStart: SortStartHandler = ({ node }) => {
    const item = node as HTMLElement;
    setPrevDragNode(item);
    item.style.borderBottomColor = 'transparent';
    // item.style.background = 'rgb(245,245,245)';
    item.style.boxShadow = '1px 2px 5px rgba(0,0,0,0.16)';
  };

  return (
    <Container>
      <PerfectScrollbar>
        <AddMissionInput />
        <TableLayout headText="TO-DO" collapsible={true} style={todoTableStyle}>
          <TodoList
            tasks={todoTasks}
            onSortEnd={onSortEnd}
            distance={3}
            updateBeforeSortStart={updateBeforeSortStart}
          />
        </TableLayout>
        <TableLayout headText="DONE" collapsible={true} style={doneTableStyle}>
          <TodoList tasks={doneTasks} />
        </TableLayout>
      </PerfectScrollbar>
    </Container>
  );
};

export default TodoPage;

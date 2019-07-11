import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  background: whitesmoke;
  width: 100%;
  height: 100%;
  /* color: white; */
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoPage = () => {
  return <Container>TODO</Container>;
};

export default TodoPage;

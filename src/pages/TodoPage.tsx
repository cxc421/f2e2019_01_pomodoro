import React from 'react';
import styled from 'styled-components';
import AddMissionInput from '../components/AddMissionInput';

const Container = styled.div`
  position: relative;
  background: whitesmoke;
  width: 100%;
  height: 100%;
  font-size: 30px;
  display: flex;
  flex-direction: column;
`;

const TodoPage = () => {
  return (
    <Container>
      <AddMissionInput />
    </Container>
  );
};

export default TodoPage;

import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* padding: 20px 55px; */
`;

const TimeText = styled.div`
  position: relative;
  margin-top: 46.42px;
  font-weight: bold;
  font-size: 90px;
  color: white;
  line-height: 90px;
  letter-spacing: 7px;

  &::after {
    content: '';
    display: block;
    width: 50%;
    height: 6px;
    background: white;
    margin-top: 18.58px;
  }
`;

const TaskText = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: white;
  margin-top: 17px;
  letter-spacing: 1px;
`;

const Timer: React.FC = () => {
  return (
    <Container>
      <Spinner />
      <TimeText>25:00</TimeText>
      <TaskText>THE FIRST THING TO DO</TaskText>
    </Container>
  );
};

export default Timer;

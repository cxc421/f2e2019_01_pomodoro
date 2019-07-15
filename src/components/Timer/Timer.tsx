import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import { useGlobalState } from '../../global-state';
import { secToTimeText } from '../helpers/time';

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
  transform: translateY(3px);
`;

const Timer: React.FC = () => {
  const {
    state: { selectTaskId, todoTasks, time }
  } = useGlobalState();
  const selectTask = todoTasks.find(task => task.id === selectTaskId);
  const text = selectTask ? selectTask.text : '';

  return (
    <Container>
      <Spinner />
      <TimeText>{secToTimeText(time)}</TimeText>
      <TaskText>{text}</TaskText>
    </Container>
  );
};

export default Timer;

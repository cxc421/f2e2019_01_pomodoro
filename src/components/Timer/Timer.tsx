import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import { useGlobalState, TimerStatus } from '../../global-state';
import { secToTimeText } from '../helpers/time';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    state: { selectTaskId, todoTasks, time, timeMax, timerStatus },
    startTimer,
    pauseTimer
  } = useGlobalState();
  const timeInSec = Math.round(time / 1000);
  const selectTask = todoTasks.find(task => task.id === selectTaskId);
  const text = selectTask ? selectTask.text : '';
  const percent = (time * 100) / timeMax;
  const status = timerStatus === TimerStatus.Stop ? 'pause' : 'playing';

  function onClickSpinner() {
    switch (timerStatus) {
      case TimerStatus.Stop:
        startTimer(selectTaskId);
        break;
      case TimerStatus.Play:
        pauseTimer();
        break;
      // Test Only
      case TimerStatus.Pause:
        startTimer(selectTaskId);
        break;
    }
  }

  return (
    <Container>
      <Spinner status={status} percent={percent} onClick={onClickSpinner} />
      <TimeText>{secToTimeText(timeInSec)}</TimeText>
      <TaskText>{text}</TaskText>
    </Container>
  );
};

export default Timer;

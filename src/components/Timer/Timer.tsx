import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';
import Popup from '../Popup';
import { useGlobalState, TimerStatus, TaskStatus } from '../../global-state';
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
    state: { selectTaskId, todoTasks, time, timeMax, timerStatus, taskStatus },
    startTimer,
    pauseTimer,
    cancelTimer
  } = useGlobalState();
  const timeInSec = Math.round(time / 1000);
  const selectTask = todoTasks.find(task => task.id === selectTaskId);
  const text = selectTask ? selectTask.text : '';
  const percent = (time * 100) / timeMax;
  const status = timerStatus === TimerStatus.Stop ? 'pause' : 'playing';
  const popupText =
    taskStatus === TaskStatus.Work
      ? '您目前正在進行一個番茄時鐘，確定要放棄嗎？'
      : '您要放棄休息嗎？';

  function onClickSpinner() {
    switch (timerStatus) {
      case TimerStatus.Stop:
        startTimer(selectTaskId);
        break;
      case TimerStatus.Play:
        pauseTimer();
        break;
    }
  }

  function onClickPropupCancelBtn() {
    startTimer(selectTaskId);
  }

  function onClickPopupApplyBtn() {
    cancelTimer();
  }

  return (
    <Container>
      <Spinner
        status={status}
        percent={percent}
        theme={taskStatus === TaskStatus.Work ? 'red' : 'yellow'}
        onClick={onClickSpinner}
      />
      <TimeText>{secToTimeText(timeInSec)}</TimeText>
      <TaskText>{text}</TaskText>
      <Popup
        show={timerStatus === TimerStatus.Pause}
        text={popupText}
        onClickCancelBtn={onClickPropupCancelBtn}
        onClickApplyBtn={onClickPopupApplyBtn}
      />
    </Container>
  );
};

export default Timer;

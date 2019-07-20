import React, { useRef, useEffect, useState } from 'react';
import { usePrevious } from '../../helpers/hooks';
import { useGlobalState, TaskStatus } from '../../global-state';

const Sound: React.FC = () => {
  const workAudioRef = useRef<HTMLAudioElement>(null);
  const restAudioRef = useRef<HTMLAudioElement>(null);
  const {
    state: {
      soundBasePath,
      soundRestIndex,
      soundWorkIndex,
      soundNameList,
      taskStatus,
      time
    }
  } = useGlobalState();
  const prevTaskStatus = usePrevious<TaskStatus>(taskStatus);
  const prevWorkIndex = usePrevious<TaskStatus>(soundWorkIndex);
  const prevRestIndex = usePrevious<TaskStatus>(soundRestIndex);
  const [workSrc, setWorkSrc] = useState(
    `${soundBasePath}/${soundNameList[soundWorkIndex]}.mp3`
  );
  const [restSrc, setRestSrc] = useState(
    `${soundBasePath}/${soundNameList[soundRestIndex]}.mp3`
  );

  function playWorkSound() {
    const audio = workAudioRef.current;
    if (!audio) return;
    audio.play();
  }

  function playRestSound() {
    const audio = restAudioRef.current;
    if (!audio) return;
    audio.play();
  }

  useEffect(() => {
    if (taskStatus !== prevTaskStatus) {
      if (taskStatus === TaskStatus.Work) {
        return setWorkSrc(
          `${soundBasePath}/${soundNameList[soundWorkIndex]}.mp3`
        );
      }
      if (taskStatus === TaskStatus.Rest) {
        return setRestSrc(
          `${soundBasePath}/${soundNameList[soundRestIndex]}.mp3`
        );
      }
    }
    if (prevWorkIndex !== soundWorkIndex) {
      setWorkSrc(`${soundBasePath}/${soundNameList[soundWorkIndex]}.mp3`);
    }
    if (prevRestIndex !== soundRestIndex) {
      setRestSrc(`${soundBasePath}/${soundNameList[soundRestIndex]}.mp3`);
    }
  }, [
    taskStatus,
    prevTaskStatus,
    prevWorkIndex,
    prevRestIndex,
    soundBasePath,
    soundNameList,
    soundRestIndex,
    soundWorkIndex
  ]);

  if (time === 0) {
    if (taskStatus === TaskStatus.Work) {
      playWorkSound();
    }
    if (taskStatus === TaskStatus.Rest) {
      playRestSound();
    }
  }

  return (
    <>
      <audio ref={workAudioRef} src={workSrc} />
      <audio ref={restAudioRef} src={restSrc} />
    </>
  );
};

export default React.memo(Sound);

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdPlayArrow, MdPause } from 'react-icons/md';
import Ranger from './Ranger';
import { secToTimeText } from '../../helpers/time';

interface AudioPlayerProps {
  src: string;
}

enum PlayerStatus {
  Play,
  Pause
}

const Container = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  color: #707070;
`;

const Icon = styled.div`
  font-size: 30px;
  cursor: pointer;

  > * {
    display: block;
  }

  &:hover {
    color: black;
  }
`;

const Label = styled.div`
  margin: 10px;
  font-size: 16px;
`;

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState(PlayerStatus.Pause);
  const [curSec, setCurSec] = useState(0);
  const [totalSec, setTotalSec] = useState(0);
  const percent = totalSec > 0 ? (100 * curSec) / totalSec : 0;

  function onAudioPlay() {
    setStatus(PlayerStatus.Play);
  }

  function onAudioPause() {
    setStatus(PlayerStatus.Pause);
  }

  function onClickIcon() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  }

  function onAudioDurationChange() {
    const audio = audioRef.current;
    if (!audio) return;

    setTotalSec(audio.duration);
  }

  function onAudioTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;

    setCurSec(audio.currentTime);
  }

  function onRangerChange(newPercent: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const newCurTime = (totalSec * newPercent) / 100;
    if (newCurTime <= totalSec && newCurTime >= 0) {
      audio.currentTime = newCurTime;
    }
  }

  return (
    <Container>
      <Icon onClick={onClickIcon}>
        {status === PlayerStatus.Pause ? <MdPlayArrow /> : <MdPause />}
      </Icon>
      <Label>{secToTimeText(Math.round(curSec))}</Label>
      <Ranger percent={percent} onChange={onRangerChange} />
      <Label>{secToTimeText(Math.round(totalSec))}</Label>
      <audio
        src={src}
        ref={audioRef}
        onPlay={onAudioPlay}
        onPause={onAudioPause}
        onDurationChange={onAudioDurationChange}
        onTimeUpdate={onAudioTimeUpdate}
      />
    </Container>
  );
};

export default AudioPlayer;

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

interface RangerProps {
  percent: number;
  onChange: (percent: number) => void;
}

interface HavePercent {
  percent: number;
}

const controlSize = 14;

const RangerWrapper = styled.div`
  position: relative;
  /* background: skyblue; */
  flex: 1;
  /* margin: 0 10px; */
  padding: 10px 0;
  cursor: pointer;
`;

const Line = styled.div<HavePercent>`
  position: relative;
  width: 100%;
  height: 4px;
  background: lightgray;

  &::before {
    content: '';
    width: ${props => props.percent}%;
    height: 100%;
    position: absolute;
    background: #707070;
    left: 0;
    top: 0;
  }
`;

const Contorl = styled.div<HavePercent>`
  position: absolute;
  width: ${controlSize}px;
  height: ${controlSize}px;
  top: 50%;
  margin-top: -${controlSize / 2}px;
  border-radius: 100%;
  left: ${props => props.percent}%;
  background: #707070;
`;

const ControlWrapper = styled.div`
  position: absolute;
  width: calc(100% - ${controlSize}px);
  height: 100%;
  top: 0;
  left: 0;
  /* background: rgba(255, 255, 0, 0.3); */
`;

const Ranger: React.FC<RangerProps> = ({ percent, onChange }) => {
  const rangerRef = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState(false);

  if (percent < 0 || percent > 100) {
    throw new Error('Ranger: percent oveflow! percent=' + percent);
  }

  useEffect(() => {
    const onDocumentMouseMove = (event: MouseEvent) => {
      const ranger = rangerRef.current;
      if (!ranger) return;
      const rect = ranger.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const percent = (x * 100) / width;

      onChange(percent);
    };

    const onDocumentMouseUp = () => {
      setMoving(false);
    };

    if (moving) {
      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };
  }, [rangerRef, moving, onChange]);

  function onMouseDown(event: React.MouseEvent) {
    const ranger = rangerRef.current;
    if (!ranger) return;
    const rect = ranger.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percent = (x * 100) / width;

    onChange(percent);
    setMoving(true);
  }

  return (
    <RangerWrapper ref={rangerRef} onMouseDown={onMouseDown}>
      <Line percent={percent} />
      <ControlWrapper>
        <Contorl percent={percent} />
      </ControlWrapper>
    </RangerWrapper>
  );
};

export default Ranger;

import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaStop } from 'react-icons/fa';
import { ReactComponent as Logo } from '../../assets/img/Group 20.svg';
import Ring from './Ring';

interface HaveStatus {
  status: 'playing' | 'pause';
}

interface HaveTheme {
  theme: 'red' | 'yellow';
}

interface SpinnerProps extends HaveStatus, HaveTheme {
  percent: number;
  onClick: () => void;
}

const Container = styled.div<HaveStatus & HaveTheme>`
  position: relative;
  width: 215px;
  height: 215px;
  border-radius: 100%;
  border: solid 5px ${props => (props.theme === 'red' ? '#ba000d' : '#C77800')};
  padding: ${props => (props.status === 'pause' ? 5 : 10)}px;
  background: black;
  z-index: 1;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-55%, -55%);
  }
`;

const InnerCircle = styled.div<HaveStatus & HaveTheme>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${props =>
    props.status === 'pause'
      ? props.theme === 'red'
        ? '#f44336'
        : '#FFA726'
      : 'white'};
  border: ${props =>
    props.status === 'pause'
      ? 'none'
      : props.theme === 'red'
      ? 'solid 5px #f44336'
      : 'solid 5px #FFA726'};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 3;

  &:hover {
    background: ${props =>
      props.status !== 'pause'
        ? 'rgb(235,235,235)'
        : props.theme === 'red'
        ? '#fb6155'
        : '#ffb447'};
  }
`;

const PlayBtn = styled.div`
  color: white;
  font-size: 56px;
  transform: translateX(15%);

  > * {
    display: block;
  }
`;

const StopBtn = styled.div<HaveTheme>`
  color: white;
  font-size: 56px;
  color: ${props => (props.theme === 'red' ? '#f44336' : '#FFA726')};

  > * {
    display: block;
  }
`;

function useSize(ref: React.RefObject<HTMLDivElement>): number {
  const [size, setSize] = useState(0);

  useEffect(() => {
    function calculateSize() {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        setSize(Math.min(width, height));
      }
    }
    window.addEventListener('resize', calculateSize);
    calculateSize();
    return () => {
      window.removeEventListener('resize', calculateSize);
    };
  }, [ref]);

  return size;
}

const Spinner: React.FC<SpinnerProps> = ({
  theme = 'red',
  status,
  percent,
  onClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bWidth = 3;
  const containerSize = useSize(containerRef) + 2 * bWidth;
  // console.log({ containerSize });
  const ringStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 2
  };

  return (
    <Container theme={theme} status={status} ref={containerRef}>
      <Logo />
      <InnerCircle theme={theme} status={status} onClick={onClick}>
        {status === 'pause' ? (
          <PlayBtn>
            <FaPlay />
          </PlayBtn>
        ) : (
          <StopBtn theme={theme}>
            <FaStop />
          </StopBtn>
        )}
      </InnerCircle>
      {status === 'playing' && (
        <Ring
          percent={percent}
          size={containerSize}
          style={ringStyle}
          color={theme === 'red' ? '#F44336' : 'rgb(255, 167, 39)'}
          ringWidth={5 + bWidth * 2}
        />
      )}
    </Container>
  );
};

export default Spinner;

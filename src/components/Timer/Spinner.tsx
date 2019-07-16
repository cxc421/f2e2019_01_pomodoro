import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlay, FaStop } from 'react-icons/fa';
import { ReactComponent as Logo } from '../../assets/img/Group 20.svg';
import Ring from './Ring';

interface HaveStatus {
  status: 'playing' | 'pause';
}

interface SpinnerProps extends HaveStatus {
  percent: number;
  onClick: () => void;
}

const Container = styled.div<HaveStatus>`
  position: relative;
  width: 215px;
  height: 215px;
  border-radius: 100%;
  border: solid 5px #ba000d;
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

const InnerCircle = styled.div<HaveStatus>`
  position: relative;
  width: 100%;
  height: 100%;
  background: ${props => (props.status === 'pause' ? '#f44336' : 'white')};
  border: ${props => (props.status === 'pause' ? 'none' : 'solid 5px #f44336')};
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 3;

  &:hover {
    background: ${props =>
      props.status === 'pause' ? '#fb6155' : 'rgb(235,235,235)'};
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

const StopBtn = styled.div`
  color: white;
  font-size: 56px;
  color: #f44336;

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

const Spinner: React.FC<SpinnerProps> = ({ status, percent, onClick }) => {
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
    <Container status={status} ref={containerRef}>
      <Logo />
      <InnerCircle status={status} onClick={onClick}>
        {status === 'pause' ? (
          <PlayBtn>
            <FaPlay />
          </PlayBtn>
        ) : (
          <StopBtn>
            <FaStop />
          </StopBtn>
        )}
      </InnerCircle>
      {status === 'playing' && (
        <Ring
          percent={percent}
          size={containerSize}
          style={ringStyle}
          color="#F44336"
          ringWidth={5 + bWidth * 2}
        />
      )}
    </Container>
  );
};

export default Spinner;

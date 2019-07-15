import React from 'react';
import styled from 'styled-components';
import { FaPlay } from 'react-icons/fa';
import { ReactComponent as Logo } from '../../assets/img/Group 20.svg';

const Container = styled.div`
  position: relative;
  width: 215px;
  height: 215px;
  border-radius: 100%;
  /* background: #ba000d; */
  border: solid 5px #ba000d;
  padding: 5px;
  background: black;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-55%, -55%);
  }
`;

const InnerCircle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #f44336;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background: #fb6155;
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

const Spinner: React.FC = () => {
  return (
    <Container>
      <Logo />
      <InnerCircle>
        <PlayBtn>
          <FaPlay />
        </PlayBtn>
      </InnerCircle>
    </Container>
  );
};

export default Spinner;

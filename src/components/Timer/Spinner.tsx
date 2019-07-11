import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Logo } from '../../assets/img/Group 20.svg';

const Container = styled.div`
  position: relative;
  width: 215px;
  height: 215px;
  border-radius: 100%;
  background: #ba000d;

  > svg {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
  }
`;

const Spinner: React.FC = () => {
  return (
    <Container>
      <Logo />
    </Container>
  );
};

export default Spinner;

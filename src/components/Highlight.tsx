import React from 'react';
import styled from 'styled-components';
import { strPad2 } from '../helpers/time';

interface HightlightProps {
  title?: string;
  value?: number;
  unit?: string;
}

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 18px;
  letter-spacing: 0.82px;
`;

const Value = styled.div`
  color: #f44336;
  font-weight: bold;
  font-size: 60px;
  letter-spacing: 1.7px;
  display: inline;
`;

const Unit = styled.div`
  font-size: 18px;
  font-weight: normal;
  margin-left: 17px;
  letter-spacing: 0.75px;
  display: inline;
`;

const Highlight: React.FC<HightlightProps> = ({
  title = '',
  value = 0,
  unit = 'UNKNOWN'
}) => {
  return (
    <Container>
      <Title>{title}</Title>
      <div>
        <Value>{strPad2(value)}</Value>
        <Unit>{`/${unit}`}</Unit>
      </div>
    </Container>
  );
};

export default Highlight;

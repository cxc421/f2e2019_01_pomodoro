import React from 'react';
import styled from 'styled-components';
import { MdRadioButtonChecked } from 'react-icons/md';

interface PointsProps {
  num: number;
}

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  font-size: 20px;
  margin-left: 6px;
  > * {
    display: block;
  }
`;

const Points: React.FC<PointsProps> = ({ num }) => {
  const icons = [];
  for (let i = 0; i < num; i++) {
    icons.push(
      <Icon key={i}>
        <MdRadioButtonChecked />
      </Icon>
    );
  }

  return <Container>{icons}</Container>;
};

export default React.memo(Points);

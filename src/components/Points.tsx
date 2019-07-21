import React from 'react';
import styled from 'styled-components';
import { MdRadioButtonChecked } from 'react-icons/md';

interface PointsProps {
  num: number;
  style?: React.CSSProperties;
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

const Points: React.FC<PointsProps> = ({ num, style }) => {
  const icons = [];
  const iconSize = style && style.fontSize ? style.fontSize : 20;
  for (let i = 0; i < num; i++) {
    icons.push(
      <Icon key={i} style={{ fontSize: iconSize }}>
        <MdRadioButtonChecked />
      </Icon>
    );
  }

  return <Container style={style}>{icons}</Container>;
};

export default React.memo(Points);

import React from 'react';
import styled from 'styled-components';
import { MdPlayCircleOutline, MdCheck } from 'react-icons/md';
import Points from './Points';

interface ItemProps {
  done?: boolean;
  text: string;
  tomatoes: Date[];
}

interface DoneProps {
  done: boolean;
}

const doneColor = '#6A6868';

const ItemContainer = styled.div<DoneProps>`
  height: 57px;
  background: white;
  font-size: 18px;
  font-weight: normal;
  padding: 0 25px 0 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px black;
  color: ${props => (props.done ? doneColor : 'black')};
`;

const ItemGroup = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const DoneCircle = styled.div<DoneProps>`
  width: 20px;
  height: 20px;
  border: solid 2px black;
  border-radius: 100%;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  border-color: ${props => (props.done ? doneColor : 'black')};
`;

const ItemText = styled.span<DoneProps>`
  text-decoration: ${props => (props.done ? 'line-through' : 'none')};
`;

const PlayIcon = styled.div`
  font-size: 22px;
  > * {
    display: block;
  }
`;

const Item: React.FC<ItemProps> = ({ done = false, text, tomatoes }) => {
  return (
    <ItemContainer done={done}>
      <ItemGroup>
        <DoneCircle done={done}>{done && <MdCheck />}</DoneCircle>
        <ItemText done={done}>{text}</ItemText>
      </ItemGroup>
      <ItemGroup>
        {done ? (
          <Points num={tomatoes.length} />
        ) : (
          <PlayIcon>
            <MdPlayCircleOutline />
          </PlayIcon>
        )}
      </ItemGroup>
    </ItemContainer>
  );
};

export default Item;

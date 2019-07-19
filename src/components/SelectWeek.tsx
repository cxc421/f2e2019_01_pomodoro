// ToDo: Slide Animate Effect
import React from 'react';
import styled from 'styled-components';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { getWeekStartDate, getWeekEndDate, dateToStr } from '../helpers/date';

interface SelectWeekProps {
  dt?: Date;
  toPrevWeek: () => void;
  toNextWeek: () => void;
  disableToNextWeekBtn?: boolean;
}

interface IconProps {
  disable?: boolean;
}

const Container = styled.div`
  padding: 0 2px;
  /* background: rgba(255, 100, 255, 0.2); */
  display: flex;
  align-items: center;
`;

const DateText = styled.div`
  font-size: 12px;
  letter-spacing: 0.6px;
  font-weight: normal;
`;

const Icon = styled.div<IconProps>`
  color: white;
  font-size: 24px;
  cursor: ${props => (props.disable ? 'default' : 'pointer')};
  > * {
    display: block;
  }

  &:first-child {
    margin-right: 8px;
  }

  &:last-child {
    margin-left: 8px;
  }

  &:hover {
    color: ${props => (props.disable ? 'white' : '#f44336')};
  }
`;

const SelectWeek: React.FC<SelectWeekProps> = ({
  dt = new Date(),
  toPrevWeek,
  toNextWeek,
  disableToNextWeekBtn = false
}) => {
  const startDateText = dateToStr(getWeekStartDate(dt), 'yyyy.mm.dd');
  const endDateText = dateToStr(getWeekEndDate(dt), 'yyyy.mm.dd');

  function onClickNextWeekBtn() {
    if (!disableToNextWeekBtn) {
      toNextWeek();
    }
  }

  return (
    <Container>
      <Icon onClick={toPrevWeek}>
        <MdKeyboardArrowLeft />
      </Icon>
      <DateText>{`${startDateText} - ${endDateText}`}</DateText>
      <Icon onClick={onClickNextWeekBtn} disable={disableToNextWeekBtn}>
        <MdKeyboardArrowRight />
      </Icon>
    </Container>
  );
};

export default React.memo(SelectWeek);

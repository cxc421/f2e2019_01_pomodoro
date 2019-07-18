import React, { useState } from 'react';
import styled from 'styled-components';
import { GroupBtnWrapper, GroupBtn } from '../components/GroupBtn';
import PanelTableLayout from '../components/PanelTableLayout';
import Highlight from '../components/Highlight';
import SelectWeek from '../components/SelectWeek';
import LineChart from '../components/LineChart';

enum AnalyticTab {
  TOMATO,
  MISSION
}

const Container = styled.div`
  position: relative;
  /* background: whitesmoke; */
  width: calc(100% - 1px);
  height: 100%;
`;

const BtnArea = styled.div`
  /* background: pink; */
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
`;

const FocusTimeArea = styled.div`
  position: relative;
  width: 100%;
  display: flex;

  > * {
    flex: 1;
    /* background: pink; */
    display: flex;
    justify-content: center;
  }
`;

const AnalyticsPage = () => {
  const [tab, setTab] = useState(AnalyticTab.TOMATO);
  const [weekDate, setWeekDate] = useState(new Date());
  const isTomatoTab = tab === AnalyticTab.TOMATO;

  function toNextWeek() {
    const dt = new Date(weekDate.getTime());
    dt.setDate(weekDate.getDate() + 7);
    setWeekDate(dt);
  }

  function toPrevWeek() {
    const dt = new Date(weekDate.getTime());
    dt.setDate(weekDate.getDate() - 7);
    setWeekDate(dt);
  }

  const chartTableHeadElm = (
    <SelectWeek dt={weekDate} toNextWeek={toNextWeek} toPrevWeek={toPrevWeek} />
  );

  return (
    <Container>
      <BtnArea>
        <GroupBtnWrapper>
          <GroupBtn
            selected={isTomatoTab}
            onClick={() => setTab(AnalyticTab.TOMATO)}
          >
            TOMATO
          </GroupBtn>
          <GroupBtn
            selected={!isTomatoTab}
            onClick={() => setTab(AnalyticTab.MISSION)}
          >
            MISSION
          </GroupBtn>
        </GroupBtnWrapper>
      </BtnArea>
      <PanelTableLayout headText="FOCUS TIME" style={{ marginBottom: 14 }}>
        <FocusTimeArea>
          <div>
            <Highlight title="TODAY" value={7} unit="TOMATO" />
          </div>
          <div>
            <Highlight title="WEEK" value={60} unit="TOMATO" />
          </div>
        </FocusTimeArea>
      </PanelTableLayout>
      {isTomatoTab && (
        <PanelTableLayout headText="CHART" titleRightElm={chartTableHeadElm}>
          <LineChart />
        </PanelTableLayout>
      )}
    </Container>
  );
};

export default React.memo(AnalyticsPage);

import React, { useState } from 'react';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { GroupBtnWrapper, GroupBtn } from '../components/GroupBtn';
import PanelTableLayout from '../components/PanelTableLayout';
import Highlight from '../components/Highlight';
import SelectWeek from '../components/SelectWeek';
import LineChart from '../components/LineChart';
import { getWeekStartDate, isSameDay, dateToStr } from '../helpers/date';
import { useGlobalState } from '../global-state';

enum AnalyticTab {
  TOMATO,
  MISSION
}

const Container = styled.div`
  position: relative;
  /* background: whitesmoke; */
  width: calc(100% - 1px);
  height: 100%;
  overflow: hidden;
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
  const today = new Date();
  const [tab, setTab] = useState(AnalyticTab.TOMATO);
  const [weekDate, setWeekDate] = useState(new Date());
  const isTomatoTab = tab === AnalyticTab.TOMATO;
  const unit = isTomatoTab ? '番茄' : '工作';
  const disableToNextWeekBtn = isSameDay(
    getWeekStartDate(today),
    getWeekStartDate(weekDate)
  );
  const {
    state: { todoTasks, doneTasks }
  } = useGlobalState();

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

  function getTomatoesOfDay(dt: Date): number {
    const allTomatoes = [...todoTasks, ...doneTasks].map(task => task.tomatoes);
    return allTomatoes.reduce((tmpTotal, tomato) => {
      return (
        tmpTotal +
        tomato.reduce((tmpTotal, tomatoDate) => {
          return tmpTotal + (isSameDay(dt, tomatoDate) ? 1 : 0);
        }, 0)
      );
    }, 0);
  }

  function getMissionOfDay(dt: Date): number {
    return doneTasks.reduce((tmpTotal, { doneDate }) => {
      return tmpTotal + (doneDate && isSameDay(doneDate, dt) ? 1 : 0);
    }, 0);
  }

  function getValueOfWeek(fn: (dt: Date) => number): number {
    const daysNum = 7;
    const weekStartDate = getWeekStartDate(weekDate);
    let total = 0;
    for (let i = 0; i < daysNum; i++) {
      const dt = new Date(weekStartDate.getTime());
      dt.setDate(dt.getDate() + i);
      total += fn(dt);
    }
    return total;
  }

  function getTomatoesOfWeek(): number {
    return getValueOfWeek(getTomatoesOfDay);
  }

  function getMissionsOfWeek(): number {
    return getValueOfWeek(getMissionOfDay);
  }

  function computeWeekPointList() {
    const weekStartDate = getWeekStartDate(weekDate);
    const result = [];
    const daysNum = 7;
    for (let i = 0; i < daysNum; i++) {
      const dt = new Date(weekStartDate.getTime());
      dt.setDate(dt.getDate() + i);
      result.push({
        text: dateToStr(dt, 'mm/dd'),
        value: isTomatoTab ? getTomatoesOfDay(dt) : getMissionOfDay(dt),
        hightlight: isSameDay(dt, today)
      });
    }

    return result;
  }

  const chartTableHeadElm = (
    <SelectWeek
      dt={weekDate}
      toNextWeek={toNextWeek}
      toPrevWeek={toPrevWeek}
      disableToNextWeekBtn={disableToNextWeekBtn}
    />
  );

  return (
    <Container>
      <PerfectScrollbar>
        <BtnArea>
          <GroupBtnWrapper>
            <GroupBtn
              selected={isTomatoTab}
              onClick={() => setTab(AnalyticTab.TOMATO)}
            >
              番茄
            </GroupBtn>
            <GroupBtn
              selected={!isTomatoTab}
              onClick={() => setTab(AnalyticTab.MISSION)}
            >
              工作
            </GroupBtn>
          </GroupBtnWrapper>
        </BtnArea>
        <PanelTableLayout headText="專注時間" style={{ marginBottom: 14 }}>
          <FocusTimeArea>
            <div>
              <Highlight
                title={`今日 (${dateToStr(today, 'mm/dd')})`}
                value={
                  isTomatoTab ? getTomatoesOfDay(today) : getMissionOfDay(today)
                }
                unit={unit}
                canClickTitle={true}
                clickTitleCallback={() => setWeekDate(today)}
              />
            </div>
            <div>
              <Highlight
                title="當周"
                value={isTomatoTab ? getTomatoesOfWeek() : getMissionsOfWeek()}
                unit={unit}
              />
            </div>
          </FocusTimeArea>
        </PanelTableLayout>
        <PanelTableLayout headText="圖表" titleRightElm={chartTableHeadElm}>
          <LineChart pointList={computeWeekPointList()} />
        </PanelTableLayout>
      </PerfectScrollbar>
    </Container>
  );
};

export default React.memo(AnalyticsPage);

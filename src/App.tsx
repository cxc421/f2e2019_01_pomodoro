import React from 'react';
import styled from 'styled-components';
import { MdList, MdSettings, MdRadioButtonChecked } from 'react-icons/md';
import Timer from './components/Timer/Timer';
import SlideTabLayout from './components/SlideTabLayout/SlideTabLayout';
import TodoPage from './pages/TodoPage';
import AnalyticPage from './pages/AnalyticsPage';
import SettingPage from './pages/SettingPage';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: white;

  display: flex;
`;

const TimerArea = styled.div`
  background: black;
  width: 44%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PageArea = styled.div`
  background: white;
  width: 56%;
  padding: 68px 114px 68px 80px;
  padding: 68px 60px;
`;

const App: React.FC = () => {
  const pages = [
    {
      tabText: 'TO DO LIST',
      TabIcon: MdList,
      Page: TodoPage
    },
    {
      tabText: 'ANALYTICS',
      TabIcon: MdRadioButtonChecked,
      Page: AnalyticPage
    },
    {
      tabText: 'SETTING',
      TabIcon: MdSettings,
      Page: SettingPage
    }
  ];

  return (
    <Container>
      <TimerArea>
        <Timer />
      </TimerArea>
      <PageArea>
        <SlideTabLayout pages={pages} />
      </PageArea>
    </Container>
  );
};

export default App;

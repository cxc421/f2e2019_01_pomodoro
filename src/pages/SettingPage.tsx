import React from 'react';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PanelTableLayout from '../components/PanelTableLayout';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import NumberInput from '../components/NumberInput';
import { useGlobalState, TaskStatus } from '../global-state';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: whitesmoke;
`;

const Row = styled.div`
  position: relative;
  padding: 20px 0 20px 30px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Select = styled.select`
  font-size: 16px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 4px;

  > * {
    padding: 6px;
  }
`;

const InputeUnit = styled.div`
  font-size: 18px;
  font-weight: normal;
`;

const Paragaph = styled.label`
  margin: 0;
  margin-left: 10px;
  font-size: 19px;
  font-weight: normal;
`;

const SettingPage = () => {
  const {
    state: {
      soundBasePath,
      soundRestIndex,
      soundWorkIndex,
      soundNameList,
      timeRest,
      timeWork
    },
    setSound,
    setTotalTime
  } = useGlobalState();
  const panelStyle: React.CSSProperties = {
    marginTop: 20
  };
  const workSrc = `${soundBasePath}/${soundNameList[soundWorkIndex]}.mp3`;
  const restSrc = `${soundBasePath}/${soundNameList[soundRestIndex]}.mp3`;
  const timeWorkMin = timeWork / 60000;
  const timeRestMin = timeRest / 60000;

  const optionJsx = soundNameList.map((soundName, index) => (
    <option value={index} key={index}>
      {soundName}
    </option>
  ));

  function onWorkSoundChange(event: React.ChangeEvent) {
    const select = event.target as HTMLSelectElement;
    const soundIndex = Number(select.value);
    setSound('work', soundIndex);
  }

  function onRestSoundChange(event: React.ChangeEvent) {
    const select = event.target as HTMLSelectElement;
    const soundIndex = Number(select.value);
    setSound('rest', soundIndex);
  }

  function onWorkTimeChange(newMinute: number) {
    setTotalTime(TaskStatus.Work, newMinute * 60000);
  }

  function onRestTimeChange(newMinute: number) {
    setTotalTime(TaskStatus.Rest, newMinute * 60000);
  }

  return (
    <Container>
      <PerfectScrollbar>
        <PanelTableLayout headText="RINGTONES">
          <Row>
            <Title>工作結束:</Title>
            <Select value={soundWorkIndex} onChange={onWorkSoundChange}>
              {optionJsx}
            </Select>
            <AudioPlayer src={workSrc} />
          </Row>
          <Row>
            <Title>休息結束:</Title>
            <Select value={soundRestIndex} onChange={onRestSoundChange}>
              {optionJsx}
            </Select>
            <AudioPlayer src={restSrc} />
          </Row>
        </PanelTableLayout>
        <PanelTableLayout headText="TIME" style={panelStyle}>
          <Row>
            <Title>工作時間:</Title>
            <NumberInput value={timeWorkMin} onChange={onWorkTimeChange} />
            <InputeUnit>分鐘</InputeUnit>
          </Row>
          <Row>
            <Title>休息時間:</Title>
            <NumberInput value={timeRestMin} onChange={onRestTimeChange} />
            <InputeUnit>分鐘</InputeUnit>
          </Row>
        </PanelTableLayout>
        <PanelTableLayout headText="LOOP" style={panelStyle}>
          <Row style={{ marginTop: 5 }}>
            <input type="checkbox" id="auto-rest-cbx" />
            <Paragaph>工作結束後自動開始休息</Paragaph>
          </Row>
          <Row style={{ marginTop: -20 }}>
            <input type="checkbox" id="auto-" />
            <Paragaph>休息結束後自動開始下一個工作</Paragaph>
          </Row>
        </PanelTableLayout>
      </PerfectScrollbar>
    </Container>
  );
};

export default SettingPage;

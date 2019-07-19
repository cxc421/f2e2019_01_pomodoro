import React from 'react';
import styled from 'styled-components';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PanelTableLayout from '../components/PanelTableLayout';
import AudioPlayer from '../components/AudioPlayer/AudioPlayer';
import { useGlobalState } from '../global-state';

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

const SettingPage = () => {
  const {
    state: { soundBasePath, soundRestIndex, soundWorkIndex, soundNameList },
    setSound
  } = useGlobalState();
  const panelStyle: React.CSSProperties = {
    marginTop: 20
  };
  const workSrc = `${soundBasePath}/${soundNameList[soundWorkIndex]}.mp3`;
  const restSrc = `${soundBasePath}/${soundNameList[soundRestIndex]}.mp3`;

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
        <PanelTableLayout headText="TIME" style={panelStyle} />
        <PanelTableLayout headText="LOOP" style={panelStyle} />
      </PerfectScrollbar>
    </Container>
  );
};

export default SettingPage;

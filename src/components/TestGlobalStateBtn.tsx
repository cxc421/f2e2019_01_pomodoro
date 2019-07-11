import React from 'react';
import { useGlobalState } from '../global-state';

const TestGlobalStateBtn = () => {
  const { state, setRandomSelectTask } = useGlobalState();
  const style: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    color: 'limgreen',
    fontSize: 30
  };

  return (
    <button style={style} onClick={setRandomSelectTask}>
      {state.selectTaskId}
    </button>
  );
};

export default TestGlobalStateBtn;

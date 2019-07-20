import React, { useRef } from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useGlobalState } from '../global-state';

const inputHeight = 70;

const Container = styled.form`
  flex-shrink: 0;
  position: relative;
  /* width: calc(100% - 3px); */
  width: 100%;
  height: ${inputHeight}px;
  background: white;
  display: flex;
  color: ${props => props.theme.color};
  border: solid 1px #707070;
  /* box-sizing: content-box; */
`;

const Input = styled.input`
  height: 100%;
  width: calc(100% - ${inputHeight}px);
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 700;
  padding: 0 16px;
  color: inherit;
  font-weight: bold;

  &::placeholder {
    color: inherit;
    opacity: 0.3;
    /* font-style: italic; */
  }

  &:focus {
    color: #f44336;

    & ~ * {
      color: #f44336;
    }

    &::placeholder {
      opacity: 0.8;
    }
  }
`;

const ApplyBtn = styled.div`
  width: ${inputHeight}px;
  /* height: ${inputHeight}px; */
  height: 100%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  transition: background 0.2s ease;
  cursor: pointer;

  &:hover {
    background: rgb(230, 230, 230);
  }
`;

const AddMissionInput: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addNewTask } = useGlobalState();

  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const input = inputRef.current;
    if (input) {
      addNewTask(input.value);
      input.value = '';
    }
  }

  return (
    <Container onSubmit={onSubmit}>
      <Input placeholder="新增任務…" ref={inputRef} />
      <ApplyBtn onClick={onSubmit}>
        <MdAdd />
      </ApplyBtn>
    </Container>
  );
};

export default React.memo(AddMissionInput);

import React from 'react';
import styled from 'styled-components';
import { MdAdd } from 'react-icons/md';

const inputHeight = 70;

const Container = styled.form`
  flex-shrink: 0;
  position: relative;
  /* width: calc(100% - 3px); */
  width: 100%;
  /* height: ${inputHeight}px; */
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
`;

const ApplyBtn = styled.div`
  width: ${inputHeight}px;
  height: ${inputHeight}px;
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
  function onSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    console.log('submit');
  }

  return (
    <Container onSubmit={onSubmit}>
      <Input placeholder="ADD A NEW MISSION…" />
      <ApplyBtn onClick={onSubmit}>
        <MdAdd />
      </ApplyBtn>
    </Container>
  );
};

export default AddMissionInput;

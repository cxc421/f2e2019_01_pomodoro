import React from 'react';
import styled, { css as _css } from 'styled-components';
import { Transition } from 'react-transition-group';

interface PopupProps {
  show: boolean;
  text?: string;
  onClickCancelBtn: () => void;
  onClickApplyBtn: () => void;
}

interface HaveState {
  state: string;
}

const timeout = 300;

const Background = styled.div<HaveState>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  /* background: rgba(0, 0, 0, 0.1); */
  transition: all ${timeout}ms ease-out;
  opacity: 0;

  ${props => {
    switch (props.state) {
      case 'entering':
      case 'entered':
        return _css`
          opacity: 1;
        `;
      case 'exiting':
      case 'exited':
      default:
        return _css`
          opacity: 0;
        `;
    }
  }}
`;

const Modal = styled.div<HaveState>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  display: inline-block;
  padding: 63px 60px 48px;
  border-radius: 20px;
  box-shadow: 0px 3px 20px rgba(0, 0, 0, 0.16);
  background: white;
  max-width: 90%;
  transition: all ${timeout}ms ease-in-out;
  opacity: 0;

  ${props => {
    switch (props.state) {
      case 'entering':
      case 'entered':
        return _css`
          transform: translate(-50%, -50%) scale(1);
          opacity: 1;
        `;
      case 'exiting':
      case 'exited':
      default:
        return _css`
          transform: translate(-50%, -50%) scale(0.8);
          opacity: 0;
        `;
    }
  }}
`;

const ModalText = styled.div`
  font-weight: normal;
  font-size: 25px;
  letter-spacing: 1px;
  line-height: 30px;
`;

const ModalBtoom = styled.div`
  position: relative;
  text-align: right;
  margin-top: 30px;
`;

const baseBtnCss = _css`
  display: inline-block;
  border-radius: 22px;
  border: solid 1px #707070;
  padding: 11px 18px;
  font-size: 20px;
  font-weight: normal;
  margin-left: 31px;
  transition: all 0.2s;
  cursor: pointer;
  &:first-child {
    margin-left: 0;
  }
`;

const ButtonCancel = styled.div`
  ${baseBtnCss}
  &:hover {
    background: gray;
    color: whitesmoke;
  }
`;

const ButtonApply = styled.div`
  ${baseBtnCss}
  background: #F44336;
  color: white;
  border-color: #f44336;
  &:hover {
    background: #ba000d;
    border-color: #ba000d;
  }
`;

const Popup: React.FC<PopupProps> = ({
  show,
  text = '',
  onClickCancelBtn,
  onClickApplyBtn
}) => {
  return (
    <Transition
      in={show}
      timeout={timeout}
      onEnter={node => node.offsetHeight}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {state => {
        return (
          <Background state={state}>
            <Modal state={state}>
              <ModalText>{text}</ModalText>
              <ModalBtoom>
                <ButtonCancel onClick={onClickCancelBtn}>取消</ButtonCancel>
                <ButtonApply onClick={onClickApplyBtn}>確定</ButtonApply>
              </ModalBtoom>
            </Modal>
          </Background>
        );
      }}
    </Transition>
  );
};

export default React.memo(Popup);

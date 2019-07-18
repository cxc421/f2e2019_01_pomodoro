import styled, { css as _css } from 'styled-components';

interface GroupBtnProps {
  selected?: boolean;
}

export const GroupBtnWrapper = styled.div`
  display: inline-flex;
`;

export const GroupBtn = styled.div<GroupBtnProps>`
  padding: 9px 12px 8px;
  font-size: 15px;
  font-weight: normal;
  border: solid 1px gray;
  transition: all 200ms;
  /* flex: 1; */

  &:first-child {
    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
    padding: 9px 12px 8px 16px;
    border-right-width: 0px;
  }

  &:last-child {
    border-top-right-radius: 22px;
    border-bottom-right-radius: 22px;
    padding: 9px 16px 8px 12px;
    border-left-width: 0px;
  }

  ${props => {
    if (props.selected) {
      return _css`
        background: black;
        color: white;
        cursor: default;
      `;
    } else {
      return _css`
        background: white;
        color: black;
        cursor: pointer;

        &:hover {
          background: rgb(240,240,240);
        }
      `;
    }
  }}
`;

import React from 'react';
import styled from 'styled-components';

interface HaveWidth {
  width: number;
  margin: number;
  isSelect: boolean;
}

const Container = styled.div<HaveWidth>`
  /* background: blueviolet; */
  display: inline-flex;
  color: ${props => (props.isSelect ? '#F44336' : 'black')};
  font-size: 22px;
  font-weight: bold;
  align-items: center;
  width: ${props => props.width}px;
  /* justify-content: center; */
  padding-bottom: 7px;
  cursor: pointer;
  margin-right: ${props => props.margin}px;
  &:last-child {
    margin-right: 0;
  }
  transition: color 0.5s ease-in-out;
  &:hover {
    transition-duration: 0.3s;
    color: ${props => (props.isSelect ? '#F44336' : 'rgba(0,0,0,0.5)')};
  }
  /* transform: translateX(-3px); fix */
`;

const IconWrapper = styled.div`
  margin-right: 5px;
  font-size: 26px;
  display: flex;
  align-items: center;
`;

const TextWrapper = styled.div`
  letter-spacing: 1px;
  /* padding-right: 5px; */
`;

interface TabProps {
  text: string;
  icon: JSX.Element | null;
  onClick: () => void;
  width: number;
  margin: number;
  isSelect?: boolean;
}

class Tab extends React.Component<TabProps> {
  onClickTab = () => {
    this.props.onClick();
  };

  render() {
    const { text, icon, width, margin, isSelect = false } = this.props;

    return (
      <Container
        onClick={this.onClickTab}
        width={width}
        margin={margin}
        isSelect={isSelect}
      >
        <IconWrapper>{icon}</IconWrapper>
        <TextWrapper>{text}</TextWrapper>
      </Container>
    );
  }
}

export default Tab;

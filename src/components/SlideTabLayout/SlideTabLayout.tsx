import React, { useState } from 'react';
import styled, { keyframes, css as _css } from 'styled-components';
import { IconType } from 'react-icons';
import Tab from './Tab';

const Container = styled.div`
  position: relative;
  /* overflow-x: hidden; */
  /* background: lightgreen; */
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const PageArea = styled.div`
  position: relative;
  width: 100%;
  /* height: 100%; */
  overflow-x: hidden;
  flex-grow: 1;

  display: flex;
`;

const blinkAnimate = keyframes`
 0% {
   opacity: 1;
 }
 50% {
   opacity: 0;
 }
 100% {
   opacity: 1;
 }
`;

interface Animating {
  animating: boolean;
}

const blinkAnimateStyle = _css`
  animation: ${blinkAnimate} 0.5s ease-in-out 0s 1 both;
`;

const PageWrapper = styled.div<Animating>`
  position: relative;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  transition: transform 0.5s ease-in-out;
  ${props => (props.animating ? blinkAnimateStyle : '')}
`;

const MenuArea = styled.div`
  position: relative;
  /* background: pink; */
  min-height: 20px;
  margin-bottom: 60px;
  /* display: flex; */
  white-space: nowrap;
`;

const TabBottom = styled.div`
  height: 5px;
  background: #f44336;
  transition: transform 0.5s ease-in-out;
  transform: translateX(0);
  position: absolute;
  bottom: 0;
  left: 0;
`;

interface Page {
  tabText: string;
  TabIcon: IconType;
  Page: () => JSX.Element;
}

interface SlideTabLayoutProps {
  pages: Page[];
}

const SlideTabLayout: React.FC<SlideTabLayoutProps> = ({ pages }) => {
  const tabSize = 157;
  const tabMargin = 22;
  const [tabIndex, setTabIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const tabBottomStyle: React.CSSProperties = {
    width: tabSize,
    transform: `translateX(${(tabSize + tabMargin) * tabIndex}px)`
  };

  const pageWrapperStyle: React.CSSProperties = {
    transform: `translateX(${-100 * tabIndex}%)`
  };

  function onClickTab(index: number) {
    if (tabIndex !== index) {
      setTabIndex(index);
      setAnimating(true);
    }
  }

  function onAnimationEnd() {
    setAnimating(false);
  }

  return (
    <Container>
      <MenuArea>
        {pages.map(({ tabText, TabIcon }, index) => (
          <Tab
            width={tabSize}
            margin={tabMargin}
            key={index}
            text={tabText}
            icon={<TabIcon />}
            isSelect={tabIndex === index}
            onClick={() => onClickTab(index)}
          />
        ))}
        <TabBottom style={tabBottomStyle} />
      </MenuArea>
      <PageArea>
        {pages.map(({ Page }, index) => (
          <PageWrapper
            key={index}
            style={pageWrapperStyle}
            animating={animating}
            onAnimationEnd={onAnimationEnd}
          >
            <Page />
          </PageWrapper>
        ))}
      </PageArea>
    </Container>
  );
};

export default SlideTabLayout;

import React, { useState } from 'react';
import styled, { keyframes, css as _css } from 'styled-components';
import { IconType } from 'react-icons';

const Container = styled.div`
  position: relative;
  /* overflow-x: hidden; */
  /* background: lightgreen; */
  height: 100%;
`;

const PageArea = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
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
  position: absolute;
  transform: translateY(-100%);
  top: 0;
  left: 0;
  background: pink;
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
  const [tabIndex, setTabIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
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
        {pages.map(({ tabText }, index) => (
          <button key={index} onClick={() => onClickTab(index)}>
            {tabText}
          </button>
        ))}
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

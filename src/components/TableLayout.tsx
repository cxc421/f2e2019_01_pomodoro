import React, { useState, useRef, useEffect } from 'react';
import styled, { css as _css } from 'styled-components';
import { MdArrowDropUp } from 'react-icons/md';

interface TableProps {
  headText: string;
  collapsible?: boolean;
  style?: React.CSSProperties;
  // maxHeight: number | string;
}

interface TableHeadProps {
  enableHover: boolean;
}

interface ToggleShowIconWrapperProps {
  up: boolean;
}

const TableContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
`;

const tableHeadHoverCss = _css`
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;

const TableHead = styled.div<TableHeadProps>`
  background: black;
  height: 32px;
  padding-left: 23.25px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: default;
  ${props => props.enableHover && tableHeadHoverCss};
  flex-shrink: 0;
`;

const ToggleShowIconWrppaer = styled.div<ToggleShowIconWrapperProps>`
  font-size: 32px;
  transform: ${props => (props.up ? 'rotate(0deg)' : 'rotate(180deg)')};
  transition: transform 300ms;
  > * {
    display: block;
  }
`;

const TableContent = styled.div`
  position: relative;
  transition: height 300ms;
  /* background: gray; */
  flex-shrink: 1;
  /* overflow: auto; */
  overflow: hidden;
`;

function useContentHeight(contentRef: React.RefObject<HTMLDivElement>) {
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    function updateHeight() {
      if (contentRef.current) {
        const prevHeight = contentRef.current.style.height;
        contentRef.current.style.height = 'auto';
        const height = contentRef.current.getBoundingClientRect().height;
        // console.log(height);
        contentRef.current.style.height = prevHeight;
        setContentHeight(height);
      }
    }
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, [contentRef]);

  return contentHeight || 'auto';
}

const TableLayout: React.FC<TableProps> = ({
  headText,
  collapsible = true,
  style,
  children
  // maxHeight
}) => {
  const containerStyle: React.CSSProperties = Object.assign({}, style, {
    // maxHeight
  });
  const [showContent, setShowContent] = useState(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const contentHeight = useContentHeight(contentRef);
  const contentStyle: React.CSSProperties = {
    height: showContent ? contentHeight : 0
  };

  function onClickTableHead() {
    if (collapsible) {
      setShowContent(!showContent);
    }
  }

  return (
    <TableContainer style={containerStyle}>
      <TableHead enableHover={collapsible} onClick={onClickTableHead}>
        <span>{headText}</span>
        {collapsible && (
          <ToggleShowIconWrppaer up={showContent}>
            <MdArrowDropUp />
          </ToggleShowIconWrppaer>
        )}
      </TableHead>
      <TableContent ref={contentRef} style={contentStyle}>
        {children}
      </TableContent>
    </TableContainer>
  );
};

export default TableLayout;

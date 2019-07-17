import React, { useRef, useEffect, useState } from 'react';
import styled, { css as _css } from 'styled-components';
// import {  } from 'react-sortable-hoc';
import { SortableElement } from 'react-sortable-hoc';
import { MdPlayCircleOutline, MdCheck, MdEdit, MdClear } from 'react-icons/md';
import Points from './Points';

type ItemMode = 'EDIT' | 'NORMAL';

interface ItemProps {
  done?: boolean;
  text: string;
  mode: ItemMode;
  tomatoes: Date[];
  onClickPlayBtn: () => void;
  onClickDoneBtn: () => void;
  onClickEditBtn: () => void;
  onClickOutside: () => void;
  onUpdateText: (str: string) => void;
  onClickDeleteBtn: () => void;
}

interface DoneProps {
  done: boolean;
  canClick?: boolean;
}

interface CanDragProps {
  canDrag: boolean;
}

const doneColor = '#6A6868';
const editIconClassName = 'edit-icon';

const ItemContainer = styled.div<DoneProps & CanDragProps>`
  height: 57px;
  background: white;
  font-size: 18px;
  font-weight: normal;
  padding: 0 25px 0 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px black;
  color: ${props => (props.done ? doneColor : 'black')};
  cursor: ${props => (props.canDrag ? 'move' : 'default')};

  &:hover {
    background: rgb(245, 245, 245);
    .${editIconClassName} {
      visibility: visible;
    }
  }
`;

const ItemGroup = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex: 1;

  &:first-child {
    max-width: 45%;
  }

  &:last-child {
    justify-content: flex-end;
  }
`;

const DoneCircle = styled.div<DoneProps>`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  border-style: solid;
  border-width: 2px;
  border-color: ${props => (props.done ? doneColor : 'black')};
  /* cursor: ${props => (props.canClick ? 'pointer' : 'default')}; */
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    /* opacity: 0.5; */
  }
`;

const ItemText = styled.span<DoneProps>`
  text-decoration: ${props => (props.done ? 'line-through' : 'none')};
`;

const ItemInput = styled.input`
  padding: 2px 0 1px;
  margin: 0;
  /* outline: 0; */
  border: none;
  background: transparent;
  font-size: inherit;
  font-weight: inherit;
  /* max-width: calc(100% - 33px); */
  /* background: pink; */
  flex-shrink: 1;
  width: 100%;
  min-width: 0;
`;

const baseIconCss = _css`
  font-size: 22px;
  cursor: pointer;
  > * {
    display: block;
  }
  transition: color 200ms;
  flex-shrink: 0;

  &:hover {
    color: #f44336;
  }
`;

const EditIcon = styled.div`
  ${baseIconCss}
  margin-right: 25px;
  visibility: hidden;
  font-size: 20px;
  color: #6a6868;
  &:hover {
    color: #28a745;
    /* color: #ffa726; */
  }
`;

const PlayIcon = styled.div`
  ${baseIconCss}
`;

const DeleteIcon = styled.div`
  ${baseIconCss}
  font-size: 24px;
  margin-right: 9px;
  color: #f44336;
  transform: translateX(-12%);
  &:hover {
    color: red;
  }
`;

const Item: React.FC<ItemProps> = ({
  mode,
  done = false,
  text,
  tomatoes,
  onClickPlayBtn,
  onClickDoneBtn,
  onClickEditBtn,
  onClickOutside,
  onClickDeleteBtn,
  onUpdateText
}) => {
  const [draging, setDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canDrag = mode === 'EDIT';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const container = containerRef.current;
      if (container) {
        const node = event.target as HTMLDivElement;
        if (!draging && !container.contains(node)) {
          console.log('remove');
          onClickOutside();
        }
      }

      setDragging(false);
    }
    if (mode === 'EDIT') {
      document.addEventListener('mouseup', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, [mode, onClickOutside, draging]);

  function handleClickEditBtn(e: React.MouseEvent) {
    e.nativeEvent.stopImmediatePropagation();
    onClickEditBtn();
  }

  function beforeUpdateText(input: HTMLInputElement) {
    const newText = input.value.trim();
    if (newText.length === 0) {
      input.value = text;
    } else {
      onUpdateText(newText);
    }
  }

  function handleInputBlur(e: React.FocusEvent<HTMLInputElement>) {
    beforeUpdateText(e.target);
  }

  function handleInputMouseDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      beforeUpdateText(e.target as HTMLInputElement);
      onClickOutside();
      return;
    }

    if (e.key === 'Escape') {
      onClickOutside();
    }
  }

  function handleContainerMouseDown() {
    if (canDrag) {
      // Enable if cancel edit mode
      // setDragging(true);
    }
  }

  return (
    <ItemContainer
      onMouseDown={handleContainerMouseDown}
      done={done}
      canDrag={canDrag}
      ref={containerRef}
      className="item"
    >
      <ItemGroup>
        {mode === 'NORMAL' ? (
          <>
            <DoneCircle done={done} canClick={!done} onClick={onClickDoneBtn}>
              {done && <MdCheck />}
            </DoneCircle>
            <ItemText done={done}>{text}</ItemText>
          </>
        ) : (
          <>
            <DeleteIcon onClick={onClickDeleteBtn}>
              <MdClear />
            </DeleteIcon>
            <ItemInput
              defaultValue={text}
              autoFocus={true}
              onBlur={handleInputBlur}
              onKeyDown={handleInputMouseDown}
            />
          </>
        )}
      </ItemGroup>
      <ItemGroup>
        {done ? (
          <Points num={tomatoes.length} />
        ) : (
          <>
            {mode === 'NORMAL' && (
              <EditIcon
                className={editIconClassName}
                onClick={handleClickEditBtn}
              >
                <MdEdit />
              </EditIcon>
            )}
            <PlayIcon onClick={onClickPlayBtn}>
              <MdPlayCircleOutline />
            </PlayIcon>
          </>
        )}
      </ItemGroup>
    </ItemContainer>
  );
};

export default SortableElement(Item);

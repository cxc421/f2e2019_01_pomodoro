import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { usePrevious } from '../helpers/hooks';

interface NumberInputProps {
  value: number | string;
  onChange: (value: number) => void;
}

const Input = styled.input`
  font-size: 16px;
  margin-left: 20px;
  margin-right: 5px;
  padding: 4px;
  border: 1px solid #aaa;
`;

const NumberInput: React.FC<NumberInputProps> = ({
  value,
  onChange: onChangeCallback
}) => {
  const [tmpValue, setTmpValue] = useState(value);
  const prevValue = usePrevious<number | string>(value);

  useEffect(() => {
    if (value !== prevValue) {
      setTmpValue(value);
    }
  }, [value, prevValue]);

  function isValidValue(val: number | string): boolean {
    const value = +val;
    if (isNaN(value) || value.toString().length === 0) return false;
    if (value <= 0 || value > 99) return false;
    return true;
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTmpValue(e.target.value);
  }

  function checkBeforeTriggerCallback() {
    if (isValidValue(tmpValue)) {
      onChangeCallback(+tmpValue);
    } else {
      setTmpValue(value);
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    checkBeforeTriggerCallback();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      checkBeforeTriggerCallback();
    }
  }

  return (
    <Input
      type="number"
      value={tmpValue}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};

export default React.memo(NumberInput);

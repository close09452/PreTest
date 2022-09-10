import React, { useState, useEffect } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Wrapper, CustomInput, CustomButton } from './style';
import PropTypes from 'prop-types';

const CustomInputNumber = props => {
  const [inputValue, setInputValue] = useState(0);
  const intervalRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const {
    max,
    min,
    step,
    name,
    value,
    disabled,
    onChange,
    onBlur,
    assignableGuest
  } = props;

  const stopCounter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAdd = () => {
    if (intervalRef.current && inputValue <= max) return;
    intervalRef.current = setInterval(() => {
      setInputValue(prevCounter => prevCounter + 1);
    }, 200);
  };

  const startReduce = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setInputValue(prevCounter => prevCounter - 1);
    }, 200);
  };

  const handleAddClick = () => {
    setInputValue(prevState => prevState + step);
  };

  const handleReduceClick = () => {
    setInputValue(prevState => prevState - step);
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    onBlur({ target: { value: inputValue, name } });
  };

  useEffect(() => {
    return () => stopCounter();
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      if (inputValue < 0) {
        setInputValue(0);
        stopCounter();
      }
      if (inputValue > max) {
        setInputValue(max);
        stopCounter();
      }
    }
  }, [inputValue, intervalRef.current]);

  useEffect(() => {
    if (inputValue < 0) {
      setInputValue(0);
      return onChange({ target: { value: 0, name } });
    }
    if (inputValue > max) {
      setInputValue(max);
      return onChange({ target: { value: max, name } });
    }
    onChange({ target: { value: inputValue, name } });
  }, [inputValue]);

  useEffect(() => {
    if (value) {
      setInputValue(value);
    }
  }, [value]);

  return (
    <Wrapper key={name}>
      <CustomButton
        onClick={handleAddClick}
        onMouseDown={startAdd}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
        disabled={inputValue >= max || disabled || assignableGuest === 0}
      >
        <PlusOutlined />
      </CustomButton>
      <CustomInput
        ref={inputRef}
        type='number'
        step={step}
        max={max}
        min={min}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={inputValue}
        name={name}
        disabled={disabled}
      />
      <CustomButton
        disabled={inputValue <= min || disabled}
        onClick={handleReduceClick}
        onMouseDown={startReduce}
        onMouseUp={stopCounter}
        onMouseLeave={stopCounter}
      >
        <MinusOutlined />
      </CustomButton>
    </Wrapper>
  );
};

CustomInputNumber.propTypes = {
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  assignableGuest: PropTypes.number.isRequired
};

export default CustomInputNumber;

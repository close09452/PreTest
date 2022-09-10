import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0px 8px;
`;

export const CustomInput = styled.input`
  width: 48px;
  height: 48px;
  border: 1px solid deepskyblue;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;

  :focus-visible{
    outline: 1px solid gray;
    border: 1px solid deepskyblue;
  }

  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type='number'] {
    -moz-appearance: textfield;
  }
`;

export const CustomButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 4px;
  border: 1px solid deepskyblue;
  color: deepskyblue;
  font-size: 16px;
  :disabled{
    border: 1px solid gray;
    color: gray;
  }
`;

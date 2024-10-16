import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin: 10px auto;
`;

const StyledLabel = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.text || '#333'};
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.border || '#ccc'};
  border-radius: 8px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.background || '#fff'};
  color: ${({ theme }) => theme.text || '#333'};
  transition: all 0.3s ease;

  &:focus {
    border-color: ${({ theme }) => theme.primary || '#007BFF'};
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
  }

  &::placeholder {
    color: ${({ theme }) => theme.placeholder || '#999'};
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 12px;
  }
`;

const CustomInput = ({ label, placeholder, value, onChange }) => {
  return (
    <InputWrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </InputWrapper>
  );
};

export default CustomInput;

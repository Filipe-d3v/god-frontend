import React from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
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

const StyledSelect = styled.select`
  padding: 12px 16px;
  border: 2px solid ${({ theme }) => theme.border || '#ccc'};
  border-radius: 8px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.background || '#fff'};
  color: ${({ theme }) => theme.text || '#333'};
  transition: all 0.3s ease;
  appearance: none; /* Remove default arrow for customization */
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 16px;
  
  &:focus {
    border-color: ${({ theme }) => theme.primary || '#007BFF'};
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 12px;
  }
`;

const StyledOption = styled.option`
  background-color: ${({ theme }) => theme.background || '#fff'};
  color: ${({ theme }) => theme.text || '#333'};
`;

const CustomSelect = ({ label, options, value, onChange }) => {
  return (
    <SelectWrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledSelect value={value} onChange={onChange}>
        {options.map((option, index) => (
          <StyledOption key={index} value={option.value}>
            {option.label}
          </StyledOption>
        ))}
      </StyledSelect>
    </SelectWrapper>
  );
};

export default CustomSelect;

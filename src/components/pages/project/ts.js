import styled from 'styled-components';
import { TextField, Button } from "@mui/material";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

export const StyledTextField = styled(TextField)`
  width: 100%;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  padding: 10px;
  border-radius: 20px;
  background-color: #1976d2;
  color: white;

  &:hover {
    background-color: #115293;
  }
`;

export const FileInputLabel = styled.label`
  display: block;
  background-color: #555;
  color: #fff;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  margin-top: 10px;
`;

export const FileInput = styled.input`
  display: none;
`;

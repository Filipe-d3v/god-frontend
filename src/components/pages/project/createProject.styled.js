import styled from "styled-components";
import { Button, DialogContentText } from "@mui/material";

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);

  h3 {
    text-transform: uppercase;
    font-size: 24px;
    margin-bottom: 10px;
  }

  button {
    border: none;
    color: #fff;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
  }

  @media (max-width: 600px) {
    padding: 15px;
    h3 {
      font-size: 20px;
    }
    button {
      padding: 8px;
    }
  }
`;

export const StyledDialogTitle = styled.h3`
  text-align: center;
  text-transform: uppercase;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  label {
    margin-bottom: 10px;
    font-weight: bold;
  }

  #textarea {
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
  }

  input[type="file"] {
    display: none;
  }

  .image-preview {
    margin-top: 5px;
    img {
      max-width: 100px;
      max-height: 100px;
      border-radius: 5px;
    }
  }

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

export const SkillList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
  justify-content: center;

  div {
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    transition: background-color 0.3s ease;

    
  }
`;

export const StyledDialogContentText = styled(DialogContentText)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .MuiButton-root {
    border-radius: 50%;
    padding: 12px;
  }
`;

export const VerticalLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;

  .MuiFade-root {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

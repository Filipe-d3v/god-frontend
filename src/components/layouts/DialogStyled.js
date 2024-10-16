// src/components/Dialog.js
import React from 'react';
import styled from 'styled-components';
import { DialogContent, DialogOverlay } from "@reach/dialog";
import "@reach/dialog/styles.css";

const StyledOverlay = styled(DialogOverlay)`
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledDialogContent = styled(DialogContent)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  max-width: 500px;
  width: 100%;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      transform: translateY(-20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const DialogStyled = ({ isOpen, onClose, children }) => {
  return (
    <StyledOverlay isOpen={isOpen} onDismiss={onClose}>
      <StyledDialogContent aria-label="dialog">
        <button onClick={onClose}>X</button>
        {children}
      </StyledDialogContent>
    </StyledOverlay>
  );
};

export default DialogStyled;

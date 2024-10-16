import styled from 'styled-components';

const SaveButton = styled.button`
  background-color: #39FF14; /* Verde fluorescente */
  color: #fff;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  box-shadow: 0 6px 15px rgba(0, 255, 0, 0.4); /* Sombra suave */
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-color: #32E010; /* Tom ligeiramente mais escuro no hover */
    box-shadow: 0 8px 20px rgba(0, 255, 0, 0.6); /* Sombra mais forte no hover */
    transform: translateY(-3px); /* Efeito de elevação no hover */
  }

  &:active {
    background-color: #28C20E; /* Tom mais escuro ao pressionar */
    box-shadow: 0 4px 10px rgba(0, 255, 0, 0.4);
    transform: translateY(0); /* Remover elevação ao pressionar */
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 8px #39FF14;
  }
`;

export default SaveButton;

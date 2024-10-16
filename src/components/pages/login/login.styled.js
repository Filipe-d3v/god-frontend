import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, #999999, #4b4b4b);  /* Gradiente preto para cinza escuro */
    height: 100vh;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5); /* Sombra mais escura */
    background: rgba(20, 20, 20, 0.85);  /* Fundo cinza-escuro com opacidade */
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);

    p {
        color: #d4d4d4;  /* Texto cinza claro */
        margin: 10px 0;
        font-size: 14px;
    }

    h1 {
        color: #ffffff;  /* Texto branco */
        margin-bottom: 20px;
        font-size: 2rem;
        font-weight: bold;
        letter-spacing: 1px;
    }
`;

export const TextFieldStyled = styled(TextField)`
    width: 100%;
    margin-bottom: 20px;
    background-color: rgba(100, 100, 100, 0.2);  /* Fundo cinza médio transparente */
    border-radius: 5px;

    & .MuiOutlinedInput-root {
        fieldset {
            border-color: rgba(200, 200, 200, 0.5);  /* Borda prata clara */
        }
        &:hover fieldset {
            border-color: #ffffff;  /* Borda branca ao passar o mouse */
        }
        &.Mui-focused fieldset {
            border-color: #ffffff;  /* Borda branca ao focar */
        }
    }

    & .MuiInputLabel-root {
        color: rgba(220, 220, 220, 0.7);  /* Cor da label em prata clara */
    }
`;

export const Span = styled.span`
    cursor: pointer;
    color: #b3b3b3;  /* Texto cinza claro */
    font-weight: bold;
    transition: color 0.3s ease;

    &:hover {
        color: #ffffff;  /* Muda para branco ao passar o mouse */
        text-decoration: underline;
    }
`;

export const Logodm = styled.img`
    width: 150px;
    margin-bottom: 20px;
    animation: fadeIn 1s ease-in-out;
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

export const ButtonStyled = styled(Button)`
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    font-weight: bold;
    color: #ffffff;  /* Texto branco */
    background-color: #6e6e6e;  /* Fundo cinza médio */
    border-radius: 5px;
    margin-top: 20px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #9e9e9e;  /* Fundo cinza mais claro ao passar o mouse */
        transform: translateY(-3px);
    }

    &:active {
        background-color: #5e5e5e;  /* Fundo cinza escuro ao clicar */
        transform: translateY(0);
    }
`;

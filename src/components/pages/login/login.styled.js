import { Button, TextField } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #cccccc;
    height: 100vh;
`;

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px;
    border-radius: 5px;
    box-shadow: -3px 3px 8px -2px #000000;
    background-color: #222222;

    p {
        color: #ffffff;
    }

    h1 {
        color: #ffffff;
    }
`;

export const TextFieldStyled = styled(TextField)`
    bottom: 3;
    width: 350px;
    margin-bottom: 6px;
    background-color: #787878;
    color: #d2d2d2;
`;

export const Span = styled.span`
    cursor: pointer;
    color: blue;
    &&:hover {
        text-decoration: underline;
    }
`;


export const Logodm = styled.img`
    width: 350px;
`;

export const ButtonStyled = styled(Button)`
`;
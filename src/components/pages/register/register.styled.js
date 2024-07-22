import { Button, TextField } from "@mui/material";
import styled from "styled-components";

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
    align-items: center;
    justify-content: center;
    padding: 20px;
    border-radius: 5px;
    box-shadow: -3px 3px 8px -2px #000000;
    background-color: #222222;
    margin-bottom: 50px;
    width: 70%;

    h1 {
        color: #ffffff;
    }
    p {
        color: #ffffff;
    }
`;

export const TextFieldStyled = styled(TextField)`
    margin-bottom: 5px;
    width: 80%;
    background-color: #787878;
`;

export const Logodm = styled.img`
    width: 350px;
`;

export const ButtonStyled = styled(Button)`
    width: 80%;
`;
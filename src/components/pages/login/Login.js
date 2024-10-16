import React, { useContext, useState } from "react";
import { Context } from "../../../context/UserContext";
import { Container, Form, Span, TextFieldStyled, Logodm, ButtonStyled } from "./login.styled";
import { useNavigate } from "react-router-dom";
import Logo from '../../../assets/god.png';

export default function Login() {
  const [user, setUser] = useState({});
  const { login } = useContext(Context);
  const navigate = useNavigate();

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(user);
  }

  const customText = {
    color: '#ffffff',
    fontWeight: 'bold'
  };

  const customLabel = {
    color: '#aaaaaa'
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logodm src={Logo} alt="god" />
        <h1>Login</h1>
        <TextFieldStyled
          type="email"
          size="small"
          name="email"
          label="E-mail"
          variant="outlined"
          placeholder="Digite o email"
          onChange={handleChange}
          InputProps={{ style: customText }}
          InputLabelProps={{ style: customLabel }}
        />
        <br />
        <TextFieldStyled
          type="password"
          size="small"
          name="password"
          label="Senha"
          placeholder="Digite a senha"
          variant="outlined"
          onChange={handleChange}
          InputProps={{ style: customText }}
          InputLabelProps={{ style: customLabel }}
        />
        <p>
          Esqueceu sua senha? <Span>Clique aqui</Span>
        </p>
        <ButtonStyled type="submit">
          Entrar
        </ButtonStyled>
        <p onClick={() => navigate("/register")}>
          Não tem conta? <Span>Clique aqui</Span>
        </p>
      </Form>
    </Container>
  );
}

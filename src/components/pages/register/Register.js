import React, { useContext, useState } from "react";
import { Container, Form, TextFieldStyled, Logodm, ButtonStyled } from "./register.styled";
import {Context} from '../../../context/UserContext';
import Logo from '../../../assets/dmcuter.png'
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [user, setUser] = useState({});
    const {register} = useContext(Context);
    const navigate = useNavigate();


    function handleChange(e) {
        setUser({...user, [e.target.name]: e.target.value});
      };

    function handleSubmit(e) {
        e.preventDefault();
        register(user);

    }

    const customText = {
        color: '#ffffff'
      }
    
      const customLabel = {
        color: '#ffffff'
      }

    return(
        <Container>
            <Form onSubmit={handleSubmit}>
            <Logodm src={Logo} alt="DevMasters" />
            <h1>CADASTRO</h1>
            <TextFieldStyled sx={{marginBottom: '5px'}}
                type="text"
                name="username"
                size="small"
                label="Nome de usuário"
                placeholder="Digite o nome de usuario"
                variant="outlined"
                onChange={handleChange}
                InputProps={{style: customText}}
                InputLabelProps={{style: customLabel}}
            />
            <TextFieldStyled sx={{marginBottom: '5px'}}
                type="text"
                name="name"
                size="small"
                label="Nome"
                placeholder="Digite o nome"
                variant="outlined"
                onChange={handleChange}
                InputProps={{style: customText}}
                InputLabelProps={{style: customLabel}}
            />
            <TextFieldStyled sx={{marginBottom: '5px'}}
                type="text"
                name="surname"
                size="small"
                label="Sobrenome"
                placeholder="Digite o sobrenome"
                variant="outlined"
                onChange={handleChange}
                InputProps={{style: customText}}
                InputLabelProps={{style: customLabel}}
            />
            <TextFieldStyled sx={{marginBottom: '5px'}}
                type="email"
                name="email"
                size="small"
                label="E-mail"
                placeholder="Digite o e-mail"
                variant="outlined"
                onChange={handleChange}
                InputProps={{style: customText}}
                InputLabelProps={{style: customLabel}}
            />
            
            <TextFieldStyled sx={{marginBottom: '5px'}}
                type="password"
                name="password"
                size="small"
                label="Senha"
                placeholder="Digite a senha"
                variant="outlined"
                onChange={handleChange}
                InputProps={{style: customText}}
                InputLabelProps={{style: customLabel}}
            />
            <TextFieldStyled sx={{marginBottom: '5px'}}
                type="password"
                name="confirm_pass"
                size="small"
                label="Confirmação"
                placeholder="Confirme a senha"
                variant="outlined"
                onChange={handleChange}
                InputProps={{style: customText}}
                InputLabelProps={{style: customLabel}}
            />
            <ButtonStyled
            type="submit"
            variant="contained"
            color="success"
            >CRIAR CONTA</ButtonStyled>

            <p onClick={()=> navigate('/login')}
            >Já tem uma conta? <span
             style={{
                color: 'blue',
                cursor: 'pointer'
             }}
             >
                Clique aqui</span></p>
        </Form>
        </Container>
    );
};
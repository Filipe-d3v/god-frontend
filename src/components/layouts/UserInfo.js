import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp } from 'react-icons/fa';

// Contêiner principal do Perfil do Usuário
const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

// Imagem do Usuário
const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

// Detalhes do Usuário
const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// Nome do Usuário
const UserName = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #333;
`;

// Nome de Usuário (Username)
const UserUsername = styled.span`
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

// Email do Usuário
const UserEmail = styled.a`
  color: #555;
  font-size: 0.9rem;
  margin-bottom: 10px;
  text-decoration: none;

  &:hover {
    color: #000;
  }
`;

// Stack do Desenvolvedor
const UserStack = styled.span`
  background-color: #eee;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9rem;
  margin-bottom: 10px;
`;

// Quantidade de XP
const UserXP = styled.span`
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

// Seção de Redes Sociais
const SocialMediaContainer = styled.div`
  display: flex;
  gap: 15px;
`;

// Ícones de Redes Sociais
const SocialIcon = styled.a`
  color: #555;
  font-size: 1.5rem;

  &:hover {
    color: #000;
  }
`;

const UserInfo = ({ user }) => {
  return (
    <UserProfileContainer>
      <UserImage src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
      <UserDetails>
        <UserName>{user.firstName} {user.lastName}</UserName>
        <UserUsername>@{user.username}</UserUsername>
        <UserEmail href={`mailto:${user.email}`}>{user.email}</UserEmail>
        <UserStack>{user.stack}</UserStack>
        <UserXP>{user.xp} XP</UserXP>
      </UserDetails>
      <SocialMediaContainer>
        <SocialIcon href={user.github} target="_blank" aria-label="GitHub">
          <FaGithub />
        </SocialIcon>
        <SocialIcon href={user.instagram} target="_blank" aria-label="Instagram">
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href={user.linkedin} target="_blank" aria-label="LinkedIn">
          <FaLinkedin />
        </SocialIcon>
        <SocialIcon href={user.twitter} target="_blank" aria-label="Twitter">
          <FaTwitter />
        </SocialIcon>
        <SocialIcon href={`https://wa.me/${user.whatsapp}`} target="_blank" aria-label="WhatsApp">
          <FaWhatsapp />
        </SocialIcon>
      </SocialMediaContainer>
    </UserProfileContainer>
  );
};

export default UserInfo;

import React, { useEffect, useState } from "react";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";  // Importa os ícones
import api from "../../../utils/api";
import Avatar from '../../../assets/avatar.jpg';
import Verified from '../../../assets/verified.png';
import { Container, ImgStyled, UserInfo, SocialLinks, SocialIcon, ImgVerified, SkillsPainel, Skill, ColorBar, LevelBar } from "./userInfoComponent.styled.js";
import { Dialog } from "@mui/material";

export default function UserInfoComponent() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || "");
  const [colors, setColors] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    api.get('/users/checkuser/profile', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data);
    });
  }, [token]);

  useEffect(() => {
    api.get('/levels/getmyskills', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setLevels(response.data.levels);
      // Atualiza as cores correspondentes às habilidades
      setColors(response.data.levels.map(level => {
        if (level.proficiency <= 20) {
          return '#ff0000';
        } else if (level.proficiency <= 40) {
          return '#ff7f07';
        } else if (level.proficiency <= 60) {
          return '#c9fc00';
        } else if (level.proficiency <= 80) {
          return '#008cff';
        } else {
          return '#00fc7e';
        }
      }));
    });
  }, [token]);

  return (
    <Container>
      {user.image ? (
        <ImgStyled src={`${process.env.REACT_APP_API_LOCAL}/img/users/${user.image}`} alt={user.name} />
      ) : (
        <ImgStyled src={Avatar} alt={user.name} />
      )}
      <UserInfo>
        <h4>@{user.username} {!user.verified ? (<></>) : (<ImgVerified src={Verified} alt='verified' />)}</h4>
        <h6>{user.xp} XP</h6>
        <h3>{`${user.name} ${user.surname}`}</h3>
        <h4>{user.stack}</h4>
        <h5>{user.email}</h5>
        <SocialLinks>
          <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
            <SocialIcon><FaLinkedin /></SocialIcon>
          </a>
          <a href={user.instagram} target="_blank" rel="noopener noreferrer">
            <SocialIcon><FaInstagram /></SocialIcon>
          </a>
          <a href={user.github} target="_blank" rel="noopener noreferrer">
            <SocialIcon><FaGithub /></SocialIcon>
          </a>
        </SocialLinks>
      </UserInfo>
      <SkillsPainel>
        {levels.map((level, index) => (
          <Skill key={level._id}>
            <img src={`${process.env.REACT_APP_API_LOCAL}/img/skills/${level.technology.icon}`} alt={level.technology.name} /><br />
            
            <LevelBar>
              <ColorBar style={{ width: `${level.proficiency}%`, backgroundColor: colors[index] }} />
            </LevelBar>
            <p>{level.proficiency}%</p>
          </Skill>
        ))}
      </SkillsPainel>
    </Container>

  );
}

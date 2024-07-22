import React, { useEffect, useState } from "react";
import { ColorBar, Container, LevelBar, PersonalInfo, Skill, SkillsPainel } from "./userDetails.styled";
import { useParams } from "react-router-dom";
import { IoMail, IoFlag, IoLogoFacebook } from "react-icons/io5";
import {  FaTransgenderAlt, FaGithub, FaWhatsappSquare } from "react-icons/fa";
import { FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";
import api from "../../../utils/api";
import { FaLinkedin } from "react-icons/fa";
import Avatar from '../../../assets/avatar.jpg';

export default function UserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [levels, setLevels] = useState([]);
  const [colors, setColors] = useState([]); // Armazena as cores correspondentes às habilidades
  const [token] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    api.get(`/users/userdetails/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data.user);
    });
  }, [id, token]);

  useEffect(() => {
    api.get(`/levels/getuserskills/${id}`, {
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
      <PersonalInfo>
        <h3 style={{fontSize: '25px', color: '#ffffff', marginTop: 0}}>{user.description}</h3>
        {user.image ? (<img src={`${process.env.REACT_APP_API_LOCAL}/img/users/${user.image}`} alt={user.name} />) : (
          (<img src={Avatar} alt={user.name} />)
        )}
        <h3 style={{color: '#ffffff'}}>{`${user.name} ${user.surname}`}</h3>
        <h4>@{user.username}</h4>
        <div>
          <i><FaLinkedin /></i>
          <i><FaSquareInstagram /></i>
          <i><FaSquareXTwitter /></i>
          <i><FaGithub /></i>
          <i><IoLogoFacebook /></i>
          <i><FaWhatsappSquare /></i>
        </div>
        <div style={{textAlign: 'start'}}>
          <h5><IoMail style={{verticalAlign: 'middle', color: '#222222', fontSize: '18px'}} /> {user.email}</h5>
        </div>
      </PersonalInfo>
      <br />
      <label>SKILLS</label>
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

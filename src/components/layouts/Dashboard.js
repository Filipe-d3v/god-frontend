import React, { useEffect, useState } from 'react';
import { CardProject, DashboardContainer, ItemName, ItemScore, Note, NotificationBar, RankingCard, RankingItem, RankingSection, RankingTitle } from './Dashboard.styled';
import api from '../../utils/api';
import Verified from './verified';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [notifications, setNotification] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (token) {
      api.get('/notifications/getall', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      }).then((response) => {
        setNotification(response.data);
      }).catch((error) => {
        console.error("Erro ao buscar notificações:", error);
      });

      api.get('/projects/top10', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        }
      }).then((response) => {
        setProjects(response.data);
      }).catch((error) => {
        console.error("Erro ao buscar projetos:", error);
      });
    } else {
      console.error("Token de autenticação está vazio ou inválido.");
    }

    api.get('/users/topusers', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUsers(response.data)
    }).catch((error) => {
      console.log('Erro!', error)
    })
  }
  , [token]);

  return (
    <DashboardContainer>
      <NotificationBar>
        {notifications.length > 0 ? (
          notifications.map((note) => (
            <Note key={note._id}>
              <img src={`${process.env.REACT_APP_API_LOCAL}/img/users/${note.sender.image}`} alt={note.sender.name} />
              <Link style={{ textDecoration: 'none', color: '#111111' }} to={`/userdetails/${note.sender._id}`}>
                <h5>@{note.sender.username} {!note.sender.verified ? (<></>) : (<Verified />)}</h5>
                <h6>{note.sender.xp}XP</h6>
              </Link>
              {note.text}
            </Note>
          ))
        ) : (
          <p>Nenhuma notificação encontrada.</p>
        )}
      </NotificationBar>
      <RankingSection>
        <RankingCard>
          <RankingTitle>Top Projects</RankingTitle>
          {projects.length > 0 ? (
            projects.map((project) => (
              <Link to={`/projectdetails/${project._id}`}>
                <CardProject key={project._id}>
                  <h4>{project.name}</h4>
                  <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={project.name} />
                  <h6>{project.score}</h6>
                </CardProject>
              </Link>
            ))
          ) : (
            <p>Nenhum projeto encontrado.</p>
          )}
        </RankingCard>
        <RankingCard>
          <RankingTitle>Top Users</RankingTitle>
          {users?.map((user) => (
            <div key={user._id}>
              {user.username}
            </div>
          ))}
        </RankingCard>
      </RankingSection>
    </DashboardContainer>
  );
};

export default Dashboard;

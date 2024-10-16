import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {Button} from "@mui/material";
import api from "../../../utils/api";
import { useSnackbar } from "notistack";
import { ActionContent, Container, ImageContent, ProjectContent, ProjectsCard } from "./myprojects.styled";
import { Delete, Edit, SentimentVeryDissatisfied } from '@mui/icons-material';
import CreateProject from "./CreateProject";

export default function MyProject() {
  const [token] = useState(localStorage.getItem('token') || '');
  const { enqueueSnackbar } = useSnackbar();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects/alluserprojects', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        setProjects(response.data.projects)
      })
  }, [token]);


  const handleDeleteClick = async (projectId) => {

    try {
      const response = await api.delete(`/projects/delete/${projectId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      enqueueSnackbar(response.data.message, { variant: 'success' });

    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  }


  return (
    <Container>

      <ProjectsCard>
      <CreateProject />
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectContent key={project._id}>

              <ImageContent>
                <h3>{project.name}</h3>
                <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={`${project.name}`}
                  style={{ height: '200px' }}
                />
              </ImageContent>

              <ActionContent>
                <Link to={`/updateproject/${project._id}`}>
                  <Button
                    sx={{
                      width: '100%',
                      marginRight: '5px'
                    }}
                    variant="contained"
                    size="small"
                    color="warning"
                  > <Edit /></Button>
                </Link>

                <Button onClick={() => handleDeleteClick(project._id)}
                  sx={{
                    width: '100%',
                    marginLeft: '5px'
                  }}
                  variant="contained"
                  size="small"
                  color="error"
                ><Delete /></Button>
              </ActionContent>
            </ProjectContent>
          ))
        ) : (
          <>
            <h1>Nenhum projeto cadastrado ainda!</h1>
            <p><SentimentVeryDissatisfied style={{ fontSize: '10em', opacity: '30%' }} /></p>
          </>
        )}
      </ProjectsCard>
    </Container>
  );
}

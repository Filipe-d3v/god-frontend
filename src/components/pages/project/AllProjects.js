import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { CardProject, Container, ProjectsWrapper } from "./allProjects.styled";
import { Button } from '@mui/material';

export default function AllProjects() {
  const [token] = useState(localStorage.getItem('token') || '');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects/getAll', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setProjects(response.data.projects);
    })
  }, [token])
  return (
    <Container>
      <ProjectsWrapper>
        {projects.map((project) => (
          <CardProject key={project._id}>
            {project.name}
            <img
              src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`}
              alt={project.name}
            />
            {project.link}
            {project.pric}
            <Button variant="contained" size="small" color="success">
              Testar
            </Button>
          </CardProject>
        ))}
      </ProjectsWrapper>
    </Container>
  )
}

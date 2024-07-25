import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { CardProject, Container, ProjectsWrapper } from "./allProjects.styled";
import { Link } from "react-router-dom";

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
            <h2>{project.name}</h2>
            <Link to={`/projectdetails/${project._id}`}>
              <img
                src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`}
                alt={project.name}
              />
            </Link>
            <p>{project.link}</p>
            <p>{project.value}</p>
          </CardProject>
        ))}
      </ProjectsWrapper>
    </Container>
  )
}

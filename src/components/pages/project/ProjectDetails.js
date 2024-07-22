import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import { CardDocs, CardImage, CardUserInfo, Container, Desc, Docs, Header, Images, ImgAndDesc, ImgProject, Skills } from "./projectDetails.styled";
import { Dialog, DialogContent, Divider, Rating } from "@mui/material";
import { SiAdobeacrobatreader } from 'react-icons/si';
import { useSnackbar } from "notistack";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Avatar from '../../../assets/avatar.jpg';

export default function ProjectDetails() {
  const { id } = useParams();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [project, setProject] = useState();
  const [token] = useState(localStorage.getItem('token') || '');
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [dialog, setDialog] = useState(false);
  const [rate, setRate] = useState({
    rating: 0,
    project: id
  });

  useEffect(() => {
    api.get(`/projects/getbyid/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setProject(response.data.project)
    })
  }, [id, token]);

  useEffect(() => {
    api.get(`/imagesproject/getimages/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setImages(response.data)
    })
  }, [id, token]);

  useEffect(() => {
    api.get(`/docsproject/getdocs/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setDocs(response.data)
    })
  }, [id, token]);

  const handlesubmit = async (event) => {
    event.preventDefault();

    const newdata = new FormData();
    newdata.append('rating', rate.rating);
    newdata.append('project', rate.project);


    try {
      const response = await api.post('/ratings/create', newdata, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })

      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  }

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };



  if (!project) {
    return <div>Carregando...</div>; // ou qualquer mensagem indicando que o projeto está sendo carregado
  }

  return (
    <Container>
      <Header>
        <h1>{`<${project.name}/>`}</h1>
        
        <CardUserInfo>
        <div>
        {project.owner.image ? (<img src={`${process.env.REACT_APP_API_LOCAL}/img/users/${project.owner.image}`} alt={project.owner.name} />):(
            (<img src={Avatar} alt={project.owner.name} />)
          )}
          <h4>{project.owner.name}</h4>
          
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
        <p>@{project.owner.username}</p>
        <p>{project.owner.xp}XP</p>
        </div>
        </CardUserInfo>
        
      </Header>
      {project.image && (
        <ImgProject src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={project.name} />
      )}

      <Skills>
        {project.projectSkills?.map((skill, index) => (
          <div key={index}>
            <img src={`${process.env.REACT_APP_API_LOCAL}/img/skills/${skill.icon}`} alt={skill.name} />
          </div>
        ))}
      </Skills>
      <Desc>
        <h3>{project.desc}</h3>
      </Desc>

      <h2>GALERIA</h2>

      <Images>
        {project.images?.map((image, index) => (
          <CardImage key={index}>
            <h4>{image.name}</h4>
            <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${image}`} alt={project.name} />

          </CardImage>
        ))}
      </Images>

      <h2>DOCUMENTOS</h2>

      <Docs>
        {docs?.map((doc) => (
          <CardDocs key={doc._id}>
            <h4>{doc.name}</h4>
            <a href={`${process.env.REACT_APP_API_LOCAL}/files/projects/${doc.doc}`} target="_blank" rel="noopener noreferrer">
              <i><SiAdobeacrobatreader style={{ fontSize: '60px', margin: 0, color: '#ffffff' }} /></i>
            </a>

          </CardDocs>
        ))}
      </Docs>

      <Rating
        precision={0.5}
        onClick={() => handleClickOpen()}
        name="simple-controlled"
        value={rate.rating}
        onChange={(event, newRate) => {
          setRate({
            ...rate,
            rating: newRate
          });
        }}
      />

      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
      >
        <DialogContent>


          DEseja mesmo avaliar esse projeto com uma nota de {rate.rating}?
          <button
            onClick={(event) => handlesubmit(event)}
          >
            avaliar
          </button>
          <button
            onClick={() => handleClose()}
          >
            cancelar
          </button>
        </DialogContent>

      </Dialog>

    </Container>
  );
}

import React, { useEffect, useState } from "react";
import {
  Container, CreatePost, HeaderPost, ImgProfile, ImgProject, NewPost, PostInfo,
  Button, Skills
} from "./feedP.styled";
import api from "../../../utils/api";
import {
  Dialog, DialogContent, DialogContentText, DialogTitle, Divider, ListItemButton,
  Rating, TextareaAutosize, useMediaQuery, useTheme
} from "@mui/material";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";
import { Add, Check, CheckRounded, Close, SentimentDissatisfied } from "@mui/icons-material";
import Avatar from '../../../assets/avatar.jpg';

export default function FeedP() {
  const [posts, setPosts] = useState([]);
  const [token] = useState(localStorage.getItem('token') || '');
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [nameProject, setNameProject] = useState(null);
  const [formData, setFormData] = useState({
    subtitle: '',
    project: ''
  });


  useEffect(() => {
    api.get('/posts/getall', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
      .then((response) => {
        setPosts(response.data.posts)
      })
  }, [token]);

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


  const handleClose = () => {
    setSelectedProjectId(null);
    setDialog(false);
  };

  const handleClickOpen = (event) => {
    event.preventDefault();
    setDialog(true);
  };

  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
    setDialog(false);
  };

  const handleClick = (name) => {
    setNameProject(name);
  }

  const handleTextChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newData = {
      subtitle: formData.subtitle,
      project: selectedProjectId
    }

    try {
      const res = await api.post('posts/create', newData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
      });

      enqueueSnackbar(res.data.message, { variant: 'success' });
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Erro desconhecido ao criar post';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  }

  function cancelPost(e) {
    setNameProject(null);
    setSelectedProjectId(null);
    formData.subtitle = '';
  }

  return (

    <Container>
      <CreatePost>
        <form onSubmit={handleSubmit}>
          <div style={{ width: '100%', display: 'flex' }}>
            <Button onClick={handleClickOpen}
              style={{ backgroundColor: '#084DF2' }}
            ><Add sx={{ color: '#ffffff' }} /></Button>
            <h4>
              {!nameProject ? (
                <span><SentimentDissatisfied /></span>
              ) : (
                <span>{`${nameProject} `} <Check /></span>
              )}
            </h4>

          </div>
          <TextareaAutosize style={{ marginBottom: '10px', marginTop: '10px', minHeight: '40px', maxHeight: '60px' }}
            placeholder="Digite uma legenda"
            value={formData.subtitle}
            onChange={(e) => handleTextChange(e, 'subtitle')}
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Button
              style={{ backgroundColor: '#04AA6D' }}
              type="submit"
            ><CheckRounded sx={{ color: '#ffffff' }} /></Button>

            <Button onClick={cancelPost}
              style={{ backgroundColor: '#E23934' }}
            ><Close sx={{ color: '#ffffff' }} /></Button>
          </div>
        </form>
      </CreatePost>

      {posts?.map((post) => (

        <NewPost key={post._id}>
          <HeaderPost>
            <Link style={{ textDecoration: 'none' }} to={`/userdetails/${post.owner._id}`}>
              {post.owner.image ? (<ImgProfile src={`${process.env.REACT_APP_API_LOCAL}/img/users/${post.owner.image}`} alt={post.owner.name} />) : (
                (<ImgProfile src={Avatar} alt={post.owner.name} />)
              )}
              
            </Link>
            <PostInfo>
              <div style={{ marginLeft: '10px' }}>
                <Link style={{ textDecoration: 'none', color: '#111111' }} to={`/userdetails/${post.owner._id}`}>{`${post.owner.name} ${post.owner.surname}`}</Link>
                <h6>{post.date}</h6>
                <h5>{post.subtitle}</h5>
              </div>
              <Link style={{ textDecoration: 'none', textTransform: 'uppercase', }} to={`/projectdetails/${post.project._id}`}><img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${post.project.image}`} alt={post.project.image} /></Link>
            </PostInfo>
          </HeaderPost>
          <Divider />
          <ImgProject src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${post.project.image}`} alt={post.project.name} />
          <div style={{ display: 'flex' }}>
            {post.project.projectSkills.map((skill, index) => (
              <Skills key={index}>
                <img src={`${process.env.REACT_APP_API_LOCAL}/img/skills/${skill.icon}`} alt={skill.name} />
              </Skills>
            ))}
          </div>
          <Divider />
          <Rating name="aprovation-level" precision={0.5} defaultValue={0} size="large" max={5}
            sx={{position: "static"}}
          />
        </NewPost>

      ))}

      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Escolha um projeto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {projects.map((project) => (
              <div onClick={() => handleClick(project.name)} key={project._id}>
                <ListItemButton onClick={() => handleProjectClick(project._id)}>
                  {project.name}
                </ListItemButton>
              </div>
            ))}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Container>

  )
}
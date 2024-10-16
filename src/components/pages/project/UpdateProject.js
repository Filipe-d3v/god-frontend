import React, { useEffect, useState } from "react";
import { CardImage, Container, Docs, Header, Images, ListSkills, SelectedImages, SkillPainel } from './updateProject.styled';
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Checkbox, Fade, ListItemButton, TextField } from "@mui/material";
import { AddAPhoto, Check, CheckBox, Close } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useSnackbar } from "notistack";
import { CardDocs } from "./projectDetails.styled";
import { SiAdobeacrobatreader } from "react-icons/si";
import SkillSelector from "../../layouts/skillSelector";

export default function UpdateProject() {
  const [project, setProject] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const [isEditing, setIsEditing] = useState(false);
  const [thumbImgUrl, setThumbImgUrl] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [skills, setSkills] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [checked, setChecked] = useState(false);
  const [preview, setPreview] = useState([]);
  const [formData, setFormData] = useState({});

  const { id } = useParams();

  useEffect(() => {
    api.get(`/projects/getById/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setProject(response.data.project);
      setFormData({
        name: response.data.project.name,
        desc: response.data.project.desc,
        image: response.data.project.image,
        images: response.data.project.images,
        link: response.data.project.link,
        value: response.data.project.value,
        projectSkills: response.data.project.projectSkills || [],
      });
    });
  }, [id, token]);

  useEffect(() => {
    api.get(`/imagesproject/getimages/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setImages(response.data.docs)
    })
  }, [id, token]);

  useEffect(() => {
    api.get(`/docsproject/getdocs/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setDocs(response.data.docs)
    })
  }, [id, token]);


  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    api.get('/skills/getall').then((response) => {
      setSkills(response.data.skills)
    })
  }, []);

  const handleFileChange = (event, fieldName) => {
    const selectedFile = event.target.files[0];

    if (fieldName === 'image') {
      setFormData({
        ...formData,
        image: selectedFile,
      });

      setSelectedFileName(selectedFile.name);

      const readerimg = new FileReader();
      readerimg.onload = () => {
        setThumbImgUrl(readerimg.result);
      };
      readerimg.readAsDataURL(selectedFile);
    }
  };

  function onFileChange(e) {
    const files = Array.from(e.target.files);

    // Filtra apenas os itens que são do tipo File
    const validFiles = files.filter((file) => file instanceof File);

    if (validFiles.length > 0) {
      // Cria URLs de objeto apenas para arquivos válidos
      const previews = validFiles.map((file) => URL.createObjectURL(file));
      setPreview(previews);

      // Atualiza o state do projeto com os arquivos válidos
      setProject({ ...project, images: validFiles });
    }
  }


  const handleTextChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleSkillClick = (skill) => {
    const isSkillSelected = formData.projectSkills.some((selectedSkill) => selectedSkill._id === skill._id);

    if (isSkillSelected) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectSkills: prevFormData.projectSkills.filter((selectedSkill) => selectedSkill._id !== skill._id),
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        projectSkills: [...prevFormData.projectSkills, skill],
      }));
    }
  };

  const renderSkillItem = (skill) => {
    const isSkillSelected = formData.projectSkills?.some((selectedSkill) => selectedSkill._id === skill._id) || false;

    return (
      <div key={skill._id} onClick={() => handleSkillClick(skill)}>
        <ListItemButton selected={isSkillSelected}>
          {isSkillSelected ? <CheckIcon /> : <RadioButtonUncheckedIcon />}
          {skill.name}
        </ListItemButton>
      </div>
    );
  }

  const addImages = async (e) => {
    e.preventDefault();
  
    const formDataImg = new FormData();
  
    // Adiciona outras informações do projeto, se necessário
    Object.keys(project).forEach((key) => {
      if (key !== 'images') {
        formDataImg.append(key, project[key]);
      }
    });
  
    // Adiciona as imagens (verifica se são realmente arquivos)
    if (project.images && project.images.length > 0) {
      project.images.forEach((image) => {
        if (image instanceof File) {
          formDataImg.append('images', image); // Apenas adiciona arquivos válidos
        }
      });
    }
  
    try {
      const response = await api.patch(`/projects/addimages/${id}`, formDataImg, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response?.data?.message || 'Erro ao enviar os dados', { variant: 'error' });
    }
  };
  


  const handleSubmit = async (event) => {
    event.preventDefault();

    const newdata = new FormData();
    newdata.append('image', formData.image);

    newdata.append('name', formData.name);
    newdata.append('desc', formData.desc);
    newdata.append('link', formData.link);
    newdata.append('value', formData.value);
    newdata.append('projectSkills', JSON.stringify(formData.projectSkills));

    try {
      const response = await api.patch(`/projects/update/${id}`, newdata, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.reponse.data.message, { variant: 'error' });
    }
  };

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Container>
      <h1>{project.name}</h1>
      <Header>
        <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={project.name} />
        {selectedFileName && (
          <p style={{ marginTop: '5px', width: '100%', height: '20px', backgroundColor: '#c1c1c1' }}>{selectedFileName}</p>
        )}
        <label
          htmlFor="imgInput"
          style={{
            padding: '5px',
            backgroundColor: '#555',
            color: '#fff',
            textTransform: 'uppercase',
            textAlign: 'center',
            display: 'block',
            marginTop: '10px',
            cursor: 'pointer',
          }}
        >
          <AddAPhoto sx={{ verticalAlign: 'middle' }} />
        </label>
        {thumbImgUrl && (
          <div style={{ marginTop: '5px' }}>
            <img src={thumbImgUrl} alt="image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
        )}

        <input
          type="file"
          id="imgInput"
          name="imgInput"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'image')}
          style={{ display: 'none' }}
        />
      </Header>
      <div style={{ display: 'flex' }}>
        {project.projectSkills?.map((skill, index) => (
          <SkillPainel key={index}>
            <img src={`${process.env.REACT_APP_API_LOCAL}/img/skills/${skill.icon}`} alt={skill.name} />
          </SkillPainel>
        ))}
      </div>
      <h4>{project.desc}</h4>
      <Images>
        {/* Exibe as imagens existentes do projeto, mas só se não houver imagens novas no preview */}
        {preview.length === 0 && project.images?.map((image, index) => (
          <img
            src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${image}`}
            alt={`project-${index}`}
            key={index}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        ))}
      </Images>

      <SelectedImages>
        {/* Exibe o preview das novas imagens selecionadas */}
        {preview.length > 0 && preview.map((image, index) => (
          <img
            src={image}
            alt={`preview-${index}`}
            key={index}
            style={{ maxWidth: '100px', maxHeight: '100px' }}
          />
        ))}
      </SelectedImages>


      <label
        htmlFor='files'
        style={{
          cursor: 'pointer',
          display: 'inline-block',
          padding: '10px',
          backgroundColor: '#555',
          borderRadius: '50%'
        }}
      >
        <AddAPhoto sx={{ color: '#fff', fontSize: '24px' }} />
      </label>

      <input
        id='files'
        type="file"
        name="images"
        onChange={onFileChange}
        multiple={true}
        style={{ display: 'none' }} // Esconder o input
      />
      <Button onClick={addImages}>
        add images
      </Button>


      <Docs>
        {!docs ? (<h2>Nenhum documento ainda</h2>) : (
          <>
            {docs?.map((doc) => (
              <CardDocs key={doc._id}>
                <h4>{doc.name}</h4>
                <a href={`${process.env.REACT_APP_API_LOCAL}/files/projects/${doc.doc}`} target="_blank" rel="noopener noreferrer">
                  <i><SiAdobeacrobatreader style={{ fontSize: '60px', margin: 0, color: '#ffffff' }} /></i>
                </a>

              </CardDocs>
            ))}
          </>
        )}
      </Docs>

      {!isEditing && (
        <button onClick={handleEditClick}>Editar</button>
      )}

      <input
        margin="dense"
        label="Nome do projeto"
        type="text"
        value={formData.name}
        onChange={(e) => handleTextChange(e, 'name')}
        disabled={!isEditing}
      />
      <input
        margin="dense"
        label="Link do Projeto"
        type="text"
        value={formData.link}
        onChange={(e) => handleTextChange(e, 'link')}
        disabled={!isEditing}
      />
      <label>Breve descrição do projeto</label>
      <textarea
        id="textarea"
        value={formData.desc}
        disabled={!isEditing}
        onChange={(e) => handleTextChange(e, 'desc')}
        style={{ width: '98%', minHeight: '60px' }}
      />


      <ListSkills>
        {skills.map((skill) => renderSkillItem(skill))}
      </ListSkills>

      <div>
        <Checkbox
          checked={checked}
          onChange={handleCheck}
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Fade in={checked}>
          <TextField
            id="outlined-basic"
            label="Valor"
            variant="outlined"
            style={{ marginTop: 20 }}
            value={formData.value}
            onChange={(e) => handleTextChange(e, 'value')}
          />
        </Fade>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          type="submit"
          color="success"
          size="large"
          sx={{ margin: 0, borderRadius: '50%' }}
          onClick={handleSubmit}
        >
          <Check />
        </Button>

        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ margin: 0, borderRadius: '50%' }}
        >
          <Close />
        </Button>
      </div>
      <SkillSelector />
    </Container>
  );
}

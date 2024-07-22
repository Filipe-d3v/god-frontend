import React, { useEffect, useState } from "react";
import { CardImage, Container, Docs, Header, Images, ListSkills, SkillPainel } from './updateProject.styled';
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Checkbox, Fade, ListItemButton, TextField } from "@mui/material";
import { AddAPhoto, Check, CheckBox, Close } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useSnackbar } from "notistack";
import { CardDocs } from "./projectDetails.styled";
import { SiAdobeacrobatreader } from "react-icons/si";

export default function UpdateProject() {
  const [project, setProject] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const [isEditing, setIsEditing] = useState(false);
  const [thumbImgUrl, setThumbImgUrl] = useState('');
  const [thumbImgUrlGaleria, setThumbImgUrlGaleria] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFileNameImagesGaleria, setSelectedFileNameImagesGaleria] = useState([]);
  const [skills, setSkills] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [images, setImages] = useState([]);
  const [docs, setDocs] = useState([]);
  const [checked, setChecked] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    value: '',
    image: null,
    images: [],
    link: '',
    projectSkills: [],
  });

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
        projectSkills: response.data.project.projectSkills,
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

  const handleFilesChange = (event, fieldName) => {
    const selectedFiles = event.target.files;

    if (fieldName === 'images') {
      // Converte o FileList em um array de arquivos
      const filesArray = Array.from(selectedFiles);

      // Atualiza o estado formData para armazenar múltiplas imagens
      setFormData({
        ...formData,
        images: filesArray,
      });

      // Exibe os nomes das imagens selecionadas
      let selectedNames = '';
      for (let i = 0; i < filesArray.length; i++) {
        selectedNames += filesArray[i].name + ', ';
      }
      setSelectedFileNameImagesGaleria(selectedNames.slice(0, -2)); // Remove a última vírgula e espaço

      // O código abaixo é opcional, para exibir uma prévia das imagens selecionadas
      const readerimg = new FileReader();
      readerimg.onload = () => {
        setThumbImgUrlGaleria(readerimg.result);
      };
      readerimg.readAsDataURL(filesArray[0]); // Exibe apenas a primeira imagem selecionada
    }
  };

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
    const isSkillSelected = formData.projectSkills.some((selectedSkill) => selectedSkill._id === skill._id);

    return (
      <div key={skill._id} onClick={() => handleSkillClick(skill)}>
        <ListItemButton selected={isSkillSelected}>
          {isSkillSelected ? <CheckIcon /> : <RadioButtonUncheckedIcon />}
          {skill.name}
        </ListItemButton>
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário

    const newdata = new FormData();
    newdata.append('image', formData.image); // Envio da imagem principal

    // Envio de múltiplas imagens
    formData.images.forEach((image) => {
      newdata.append('images', image);
    });

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

      console.log(response.data);

      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
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
        {selectedFileNameImagesGaleria && (
          <p style={{ marginTop: '5px', width: '100%', height: '20px', backgroundColor: '#c1c1c1' }}>{selectedFileNameImagesGaleria.length}</p>
        )}
        <label
          htmlFor="imgInputGaleria"
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
        {thumbImgUrlGaleria && (
          <div style={{ marginTop: '5px' }}>
            <img src={thumbImgUrlGaleria} alt="image" style={{ maxWidth: '100px', maxHeight: '100px' }} />
          </div>
        )}

        <input
          multiple
          type="file"
          id="imgInputGaleria"
          name="imgInputGaleria"
          accept="image/*"
          onChange={(e) => handleFilesChange(e, 'images')}
          style={{ display: 'none' }}
        />
        {!project.images ? (<h2>Nenhuma imagem ainda</h2>) : (
          <>
            {project.images?.map((image, index) => (
              <CardImage key={index}>
                <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${image}`} alt={project.name} />

              </CardImage>
            ))}
          </>
        )}
      </Images>

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
    </Container>
  );
}

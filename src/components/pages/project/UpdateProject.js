import React, { useEffect, useState } from "react";
import { Container, Docs, Header, Images, Inputs, ListSkills, SectionStyled, SelectedImages } from './updateProject.styled';
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import { Button, Dialog, DialogContent, DialogTitle, Fade, ListItemButton, TextareaAutosize, TextField } from "@mui/material";
import { AddAPhoto, Check, Close } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useSnackbar } from "notistack";

export default function UpdateProject() {
  const [project, setProject] = useState({});
  const [token] = useState(localStorage.getItem('token') || '');
  const [thumbImgUrl, setThumbImgUrl] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [skills, setSkills] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [checked, setChecked] = useState(false);
  const [preview, setPreview] = useState([]);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [fileSelected, setFileSelected] = useState(false);
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
      setFileSelected(true);
      setIsPreviewDialogOpen(true);
      setSelectedFileName(selectedFile.name);
      const readerimg = new FileReader();
      readerimg.onload = () => {
        setThumbImgUrl(readerimg.result);
      };
      readerimg.readAsDataURL(selectedFile);
    } else {
      setFileSelected(false);
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

  const clearFile = () => {
    setFileSelected(false);
  };

  const closePreview = () => {
    setIsPreviewDialogOpen(false);
  }
  return (
    <Container>
      <Header>
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
          <img src={`${process.env.REACT_APP_API_LOCAL}/img/projects/${project.image}`} alt={project.name} />
        </label>
        {selectedFileName && (
          <p style={{ marginTop: '5px', height: '20px' }}>{selectedFileName}</p>
        )}
        {thumbImgUrl && (
          <Dialog open={isPreviewDialogOpen} onClose={() => setIsPreviewDialogOpen(false)}>
            <DialogTitle>Preview</DialogTitle>
            <DialogContent>
              <div style={{ marginTop: '5px' }}>
                <img src={thumbImgUrl} alt="preview" style={{ width: '100%' }} />
              </div>
              {fileSelected && <Button onClick={closePreview}>OK</Button>}
            </DialogContent>
          </Dialog>
        )}
        <SectionStyled>
          <Inputs>
            <TextField
              variant="outlined"
              label="Nome do projeto"
              type="text"
              value={formData.name}
              onChange={(e) => handleTextChange(e, 'name')}

            />
            <TextField
              variant="outlined"
              label="Link do Projeto"
              type="text"
              value={formData.link}
              onChange={(e) => handleTextChange(e, 'link')}

            />
            <TextareaAutosize
              id="textarea"
              value={formData.desc}
              onChange={(e) => handleTextChange(e, 'desc')}
              style={{ width: '100%', minHeight: '60px', backgroundColor: '#1c1c1c' }}
            />
            <TextField
              variant="outlined"
              label="Valor"
              type="text"
              value={formData.value}
              onChange={(e) => handleTextChange(e, 'value')}
            />
            <TextField
              variant="outlined"
              label="Link"
              type="text"
              value={formData.link}
              onChange={(e) => handleTextChange(e, 'link')}
            />
          </Inputs>

          <ListSkills>
            {skills.map((skill) => (
              <div key={skill._id} style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={`${process.env.REACT_APP_API_LOCAL}/img/skills/${skill.icon}`}
                  alt={skill.name}
                />
                {renderSkillItem(skill)}
              </div>
            ))}
          </ListSkills>
        </SectionStyled>
        <input
          type="file"
          id="imgInput"
          name="imgInput"
          accept="image/*"
          onChange={(e) => handleFileChange(e, 'image')}
          style={{ display: 'none' }}
        />
      </Header>

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
      <Images>
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
        { }
      </Docs>
    </Container>
  );
}

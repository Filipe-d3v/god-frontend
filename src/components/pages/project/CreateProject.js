import React, { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import api from "../../../utils/api";
import { useSnackbar } from "notistack";
import { Button, Checkbox, Dialog, DialogContent, Fade, ListItemButton, TextareaAutosize, TextField } from "@mui/material";
import { Add, Check, Close, Folder, InsertLink, Paid, PhotoCamera } from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { Container, Form, SkillList, StyledDialogContentText, StyledDialogTitle, VerticalLayout } from './createProject.styled';


const CreateProject = () => {
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [token] = useState(localStorage.getItem('token') || '');
  const { enqueueSnackbar } = useSnackbar();
  const [skills, setSkills] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [thumbImgUrl, setThumbImgUrl] = useState('');
  const [checkedValue, setCheckedValue] = useState(false);
  const [checkedLink, setCheckedLink] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    desc: '',
    image: null,
    link: '',
    value: '',
    platform: '',
    projectSkills: [],
  });

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
    event.preventDefault();

    const newdata = new FormData();
    newdata.append('image', formData.image);
    newdata.append('platform', formData.platform);
    newdata.append('name', formData.name);
    newdata.append('desc', formData.desc);
    newdata.append('link', formData.link);
    newdata.append('value', formData.value);
    newdata.append('projectSkills', JSON.stringify(formData.projectSkills));
    
    try {
      const response = await api.post('projects/create', newdata, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      

      enqueueSnackbar(response.data.message, { variant: 'success' });
      setDialog(false);
    } catch (error) {
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };
  const handleCheckValue = (event) => {
    setCheckedValue(event.target.checked);
  };
  const handleCheckLink = (event) => {
    setCheckedLink(event.target.checked);
  };
  return (
    <Container>
      <div>
        <h3>NOVO PROJETO</h3>
        <Folder />
        <button onClick={() => handleClickOpen()}>
          <Add sx={{ color: "#ffffff" }} />
        </button>
      </div>

      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <StyledDialogTitle id="responsive-dialog-title">
          Criar novo projeto
        </StyledDialogTitle>
        <DialogContent>
          <StyledDialogContentText>
            <Form onSubmit={handleSubmit}>
              <label>

                Foto do projeto:
                {selectedFileName && (
                  <div style={{ marginTop: '5px', width: '100%', height: '20px', backgroundColor: '#c1c1c1' }}>{selectedFileName}</div>
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
                > <PhotoCamera sx={{ verticalAlign: 'middle' }} />   ADD FOTO </label>
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

              </label>
              <TextField
                autoFocus
                margin="dense"
                label="Nome do projeto"
                type="text"
                variant="outlined"
                size="small"
                value={formData.name}
                onChange={(e) => handleTextChange(e, 'name')}
              />

              <TextField
                autoFocus
                margin="dense"
                label="Plataforma"
                type="text"
                variant="outlined"
                size="small"
                value={formData.platform}
                onChange={(e) => handleTextChange(e, 'platform')}
              />

              Descrição do projeto
              <TextareaAutosize
                id="textarea"
                value={formData.desc}
                onChange={(e) => handleTextChange(e, 'desc')}
                style={{ width: '100%', minHeight: '60px' }}
                maxLength={500}
              />
              <br />

              <VerticalLayout>
                <Checkbox
                  checked={checkedValue}
                  onChange={handleCheckValue}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <Paid />
                <Fade in={checkedValue}>
                  <TextField
                    sx={{ margin: 0 }}
                    id="outlined-basic"
                    size="small"
                    label="Valor"
                    variant="outlined"
                    style={{ marginTop: 20 }}
                    value={formData.value}
                    onChange={(e) => handleTextChange(e, 'value')}
                  />
                </Fade>
                <Checkbox
                  checked={checkedLink}
                  onChange={handleCheckLink}
                  color="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <InsertLink />

                <Fade in={checkedLink}>
                  <TextField
                    sx={{ margin: 0 }}
                    id="outlined-basic"
                    size="small"
                    label="link"
                    variant="outlined"
                    style={{ marginTop: 20 }}
                    value={formData.link}
                    onChange={(e) => handleTextChange(e, 'link')}
                  />
                </Fade>

              </VerticalLayout>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  type="submit"
                  color="success"
                  size="large"
                  sx={{ margin: 0, borderRadius: '50%' }}
                >
                  <Check />
                </Button>

                <Button onClick={handleClose} autoFocus
                  variant="contained"
                  color="error"
                  size="large"
                  sx={{ margin: 0, borderRadius: '50%' }}
                >
                  <Close />
                </Button>
              </div>

            </Form>

            <SkillList>{skills.map((skill) => renderSkillItem(skill))}</SkillList>
          </StyledDialogContentText>
        </DialogContent>
      </Dialog>
    </Container>
  )
}

export default CreateProject;
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { DialogStyled, ImageProfile, Img, SectionStyled } from "./editUser.styled";
import { PhotoCamera, Settings } from "@mui/icons-material";
import { useSnackbar } from "notistack";
import Avatar from '../../../assets/avatar.jpg';
import { jwtDecode } from "jwt-decode";
import CustomInput from "../../layouts/customInput";
import CustomSelect from "../../layouts/customSelect";
import { SaveButton } from "./profile.styled";
import { OptionStyled, SelectStyled } from "../register/register.styled";

export default function Edituser() {
  const [dialog, setDialog] = useState(false);
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || "");
  const [fileSelected, setFileSelected] = useState(false);
  const [thumbImgUrl, setThumbImgUrl] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    username: '',
    email: '',
    stack: ''
  });

  useEffect(() => {
    api.get('/users/checkuser/profile', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data);
      setFormData({
        name: response.data.name,
        surname: response.data.surname,
        username: response.data.username,
        email: response.data.email,
        github: response.data.github,
        instagram: response.data.instagram,
        stack: response.data.stack || '',
        gender: response.data.gender,
        linkedin: response.data.linkedin
    })
    });
  }, [token]);

  const handleFileChange = (event, fieldName) => {
    const selectedFile = event.target.files[0];
    if (event.target.files.length > 0) {
      setFileSelected(true);
      setIsPreviewDialogOpen(true);
    } else {
      setFileSelected(false);
    }

    if (fieldName === 'image') {
      setFormData({
        ...formData,
        image: selectedFile,
      });

      const readerimg = new FileReader();
      readerimg.onload = () => {
        setThumbImgUrl(readerimg.result);
      };
      readerimg.readAsDataURL(selectedFile);
    }
  };

  const handleUserUpdate = async (event) => {
    event.preventDefault();

    const newdata = new FormData();

    newdata.append('image', formData.image);
    newdata.append('name', formData.name);
    newdata.append('username', formData.username);
    newdata.append('stack', formData.stack);
    newdata.append('github', formData.github);
    newdata.append('linkedin', formData.linkedin);
    newdata.append('instagram', formData.instagram);
    newdata.append('gender', formData.gender);

    const userId = getUserIdFromToken(token);

    try {
      const response = await api.patch(`/users/update/${userId}`, newdata, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const handleClickOpen = () => {
    setDialog(true);
  };
  const handleClose = () => {
    setDialog(false);
  };

  const clearFile = () => {
    setFileSelected(false);
  };

  const handleTextChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  let img = `${process.env.REACT_APP_API_LOCAL}/img/users/${user.image}`;

  const closePreview = () => {
    setIsPreviewDialogOpen(false);
  }

  return (
    <SectionStyled>
      <Button onClick={handleClickOpen}
        sx={{
          maxWidth: '70%'
        }}
        variant="contained"
        color="warning"
        size="large"
      ><Settings /> Editar Perfil</Button>

      <DialogStyled
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Editar Perfil"}</DialogTitle>
        <DialogContent
        >
          <Img>
            <label>
              <label
                htmlFor="imgInput"
                style={{
                  padding: '5px',
                  backgroundColor: '#555',
                  color: '#fff',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  height: '100%',
                  
                }}
              >
                <PhotoCamera sx={{ verticalAlign: 'middle' }} />
                {user.image ? (
              <ImageProfile src={img} alt={user.name} />
            ) : (
              <ImageProfile src={Avatar} alt={user.name} />
            )}
              </label>
              <input
                onClick={clearFile}
                type="file"
                id="imgInput"
                name="imgInput"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'image')}
                style={{ display: 'none' }}
              />
            </label>
          </Img>
          <div>
            <CustomInput
              label='Nome'
              type='text'
              value={formData.name}
              onChange={(e) => handleTextChange(e, 'name')}
            />
            <CustomInput
              label='Sobrenome'
              value={formData.surname}
              type='text'
              onChange={(e) => handleTextChange(e, 'surname')}
            />
            <CustomInput
              label='Username'
              value={formData.username}
              type='text'
              onChange={(e) => handleTextChange(e, 'username')}
            />
            <CustomInput
              label='E-mail'
              value={formData.email}
              type='email'
              onChange={(e) => handleTextChange(e, 'email')}
            />
            <SelectStyled
                    name="stack"
                    size="small"
                    variant="outlined"
                    value={formData.stack}
                    onChange={(e) => handleTextChange(e, 'stack')}
                    sx={{ marginBottom: '5px' }}
                >
                    <OptionStyled value="">Selecione sua stack</OptionStyled>
                    <OptionStyled value="Desenvolvedor Web Fullstack">Desenvolvedor Web Fullstack</OptionStyled>
                    <OptionStyled value="Desenvolvedor Web FrontEnd">Desenvolvedor Web FrontEnd</OptionStyled>
                    <OptionStyled value="Desenvolvedor Web BackEnd">Desenvolvedor Web BackEnd</OptionStyled>
                    <OptionStyled value="Desenvolvedor Mobile">Desenvolvedor Mobile</OptionStyled>
                    <OptionStyled value="Desenvolvedor DevOps">Desenvolvedor DevOps</OptionStyled>
                    <OptionStyled value="Desenvolvedor de Dados/Engenheiro de Dados">Desenvolvedor de Dados/Engenheiro de Dados</OptionStyled>
                    <OptionStyled value="Cientista de Dados/Engenheiro de Machine Learning">Cientista de Dados/Engenheiro de Machine Learning</OptionStyled>
                    <OptionStyled value="Desenvolvedor Blockchain">Desenvolvedor Blockchain</OptionStyled>
                    <OptionStyled value="Engenheiro de Software de Testes/QA">Engenheiro de Software de Testes/QA</OptionStyled>
                    <OptionStyled value="Designer de UX/UI">Designer de UX/UI</OptionStyled>
                    <OptionStyled value="Desenvolvedor de Jogos">Desenvolvedor de Jogos</OptionStyled>
                    <OptionStyled value="Engenheiro de Nuvem">Engenheiro de Nuvem</OptionStyled>
                    <OptionStyled value="Desenvolvedor de Software Embedded">Desenvolvedor de Software Embedded</OptionStyled>
                </SelectStyled>
            <CustomInput
              label='GitHub'
              type= 'text'
              value={formData.github}
              onChange={(e) => handleTextChange(e, 'github')}
            />
            <CustomInput
              label='LinkedIn'
              type='text'
              value={formData.linkedin}
              onChange={(e) => handleTextChange(e, 'linkedin')}
            />
            <CustomInput
              label='Instagram'
              type='text'
              value={formData.instagram}
              onChange={(e) => handleTextChange(e, 'instagram')}
            />
            <SaveButton
              onClick={handleUserUpdate}
            >
              salvar
            </SaveButton>
          </div>

        </DialogContent>
      </DialogStyled>
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
    </SectionStyled>
  )
}

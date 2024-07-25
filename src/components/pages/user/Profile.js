import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { ImageProfile, InfoUser, Container, Social, SkillsPainel, Skill, SkillSelector, SaveButton } from "./profile.styled";
import { Delete, Email, GitHub, Instagram, LinkedIn, PhotoCamera} from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, ListItemButton, TextField } from "@mui/material";
import Avatar from '../../../assets/avatar.jpg';
import { useSnackbar } from "notistack";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { jwtDecode } from "jwt-decode";
import DialogStyled from "../../layouts/DialogStyled";

export default function Profile() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || "");
  const [levels, setLevels] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [dialog, setDialog] = useState(false);
  const theme = useTheme();
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const [thumbImgUrl, setThumbImgUrl] = useState('');
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [skills, setSkills] = useState([]);
  const [skillId, setSkillId] = useState('');
  const [skillName, setSkillName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    proficiency: undefined,
    technology: ''
  });

  useEffect(() => {
    api.get('/skills/getall', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setSkills(response.data.skills)
    })
  }, [token])


  const handleTextChange = (event, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newData = {
      proficiency: formData.proficiency,
      technology: skillId
    }

    try {
      const response = await api.post('levels/create', newData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
      });
      enqueueSnackbar(response.data.message, { variant: 'success' });
      setLevels([...levels, response])

    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  }


  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };


  function getSkillId(id_skill, name_skill) {
    setSkillId(id_skill);
    setSkillName(name_skill);
  }


  useEffect(() => {
    api.get('/users/checkuser/profile', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data)
    })
  }, [token]);

  useEffect(() => {
    api.get('/levels/getmyskills', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setLevels(response.data.levels)
    })
  }, [token])

  const handleDeleteClick = async (levelId) => {
    try {
      const response = await api.delete(`/levels/delete/${levelId}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      })
      enqueueSnackbar(response.data.message, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error.data.message, { variant: 'error' });
    }

    const updatedSkills = levels.filter((level) => level._id !== levelId);
    setLevels(updatedSkills);
  }


  const handleFileChange = (event, fieldName) => {
    const selectedFile = event.target.files[0];

    if (event.target.files.length > 0) {
      if (event.target.files.length > 0) {
        setFileSelected(true);
      } else {
        setFileSelected(false);
      }
    }

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

  const handleImgUpdate = async (event) => {
    event.preventDefault();

    const newdata = new FormData();
    newdata.append('image', formData.image);

    const userId = getUserIdFromToken(token);

    try {
      const response = await api.patch(`/users/update/${userId}`, newdata, {
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

  const getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <Container>
        <div style={{ minWidth: '640px', display: 'flex' }}>
          <InfoUser>
          <h3>{`${user.name} ${user.surname}`}</h3>
            {user.image ? (<ImageProfile src={`${process.env.REACT_APP_API_LOCAL}/img/users/${user.image}`} alt={user.name} />) : (
              (<ImageProfile src={Avatar} alt={`${user.name}`} />)
            )}

            <label>

              <label
                htmlFor="imgInput"
                style={{
                  padding: '5px',
                  backgroundColor: '#555',
                  color: '#fff',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  display: 'block',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  paddingTop: '-5em'
                }}
              > <PhotoCamera sx={{ verticalAlign: 'middle' }} /></label>
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
              {fileSelected && <SaveButton onClick={handleImgUpdate}>Salvar</SaveButton>} {/* Alteração aqui */}

            </label>

            <Social>
              <a className="in" href={`${user.linkedin}`} target="_blank" rel="noopener noreferrer"><LinkedIn sx={{ fontSize: '30px' }} /></a>
              <a className='git' href={`${user.github}`} target="_blank" rel="noopener noreferrer"><GitHub sx={{ fontSize: '30px' }} /></a>
              <a className='insta' href={`${user.github}`} target="_blank" rel="noopener noreferrer"><Instagram sx={{ fontSize: '30px' }} /></a>
            </Social>
            <p><i><Email /> </i>{user.email}</p>
          </InfoUser>
        </div>

        <SkillsPainel>
          {levels.map((level) => (
            <Skill key={level._id}>
              {level.technology && level.technology.icon && (
                <img src={`${process.env.REACT_APP_API_LOCAL}/img/skills/${level.technology.icon}`} alt={level.technology.name} />
              )}
              <br />

              <div style={{ width: '100%', height: '10px', border: 'solid 1px #999999' }}>
                <div style={{ width: `${level.proficiency}%`, backgroundColor: 'red', height: '10px' }}>
                </div>
              </div>
              <Button onClick={() => handleDeleteClick(level._id)}
                variant="contained"
                size="small"
                color="error"
              >
                <Delete />
              </Button>
            </Skill>
          ))}

          <Button onClick={() => handleClickOpen()}
            variant="contained"
          >abrir</Button>
        </SkillsPainel>

        <Button onClick={openDialog}>Open Dialog</Button>
      <DialogStyled isOpen={isDialogOpen} onClose={closeDialog}>
        <h2>Title</h2>
        <p>This is an elegant and lightly transparent dialog box.</p>
      </DialogStyled>

      </Container>

      <Divider />
      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ textAlign: 'center' }}>Criar nova skill</DialogTitle>

        <DialogContent sx={{ display: 'flex' }}>
          <SkillSelector>
            {skills?.map((skill) => (
              <div key={skill._id}>
                <ListItemButton onClick={() => getSkillId(skill._id, skill.name)}>
                  {skill.name}
                </ListItemButton>
              </div>
            ))}
          </SkillSelector>

          <DialogContentText >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
              <TextField sx={{ width: '150px', marginTop: '20px' }}
                type="number"
                variant="outlined"
                label='Proficiência'
                size="small"
                value={formData.proficiency}
                onChange={(e) => handleTextChange(e, 'proficiency')}
              />
              <Button

                sx={{ width: "100%" }}
                type="submit"
                size="small"
                variant="contained"
                color="success"

              >salvar</Button>
            </form>
            <p>{skillName}</p>
          </DialogContentText>
        </DialogContent>


      </Dialog>
    </>
  );
}

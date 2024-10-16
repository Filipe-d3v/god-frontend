import React, { useEffect, useState } from "react";
import api from "../../../utils/api";
import { 
  ImageProfile, InfoUser, Container, Social, SkillsPainel, 
  Skill, SkillSelector, SaveButton, ImgName, InfoPersonal 
} from "./profile.styled";
import { Delete, Email, GitHub, Instagram, LinkedIn, Phone, PhotoCamera } from "@mui/icons-material";
import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, ListItemButton, TextField } from "@mui/material";
import Avatar from '../../../assets/avatar.jpg';
import { useSnackbar } from "notistack";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { jwtDecode } from "jwt-decode";
import UserInfoComponent from "./UserInfoComponent";
import Edituser from "./EditUser";

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
      setSkills(response.data.skills);
    });
  }, [token]);

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
    };

    try {
      const response = await api.post('levels/create', newData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        },
      });
      enqueueSnackbar(response.data.message, { variant: 'success' });
      setLevels([...levels, response]);

    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  const handleClickOpen = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

  const getSkillId = (id_skill, name_skill) => {
    setSkillId(id_skill);
    setSkillName(name_skill);
  };

  useEffect(() => {
    api.get('/users/checkuser/profile', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setUser(response.data);
    });
  }, [token]);

  useEffect(() => {
    api.get('/levels/getmyskills', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {
      setLevels(response.data.levels);
    });
  }, [token]);

  const handleDeleteClick = async (levelId) => {
    try {
      const response = await api.delete(`/levels/delete/${levelId}`, {
        headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
        }
      });
      enqueueSnackbar(response.data.message, { variant: 'success' });
      const updatedSkills = levels.filter((level) => level._id !== levelId);
      setLevels(updatedSkills);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
    }
  };

  const handleFileChange = (event, fieldName) => {
    const selectedFile = event.target.files[0];
    if (event.target.files.length > 0) {
      setFileSelected(true);
      openDialog(true);
    } else {
      setFileSelected(false);
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

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const clearFile = () => {
    setFileSelected(false);
  };

  return (
    <>
      <Container>
         {/*
        <InfoUser>
         
          <ImgName>
            <h3>{`${user.name} ${user.surname}`}</h3>
            {user.image ? (
              <ImageProfile src={`${process.env.REACT_APP_API_LOCAL}/img/users/${user.image}`} alt={user.name} />
            ) : (
              <ImageProfile src={Avatar} alt={user.name} />
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
                  cursor: 'pointer',
                  borderRadius: '50%',
                }}
              >
                <PhotoCamera sx={{ verticalAlign: 'middle' }} />
              </label>
              {thumbImgUrl && (
                <Dialog open={isDialogOpen} onClose={closeDialog}>
                  <div style={{ marginTop: '5px' }}>
                    <img src={thumbImgUrl} alt="preview" />
                  </div>
                  {fileSelected && <SaveButton onClick={handleImgUpdate}>Salvar</SaveButton>}
                </Dialog>
              )}

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
            <h4>{user.stack}</h4>

            <Social>
              <a className="in" href={user.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedIn sx={{ fontSize: '30px' }} />
              </a>
              <a className='git' href={user.github} target="_blank" rel="noopener noreferrer">
                <GitHub sx={{ fontSize: '30px' }} />
              </a>
              <a className='insta' href={user.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram sx={{ fontSize: '30px' }} />
              </a>
            </Social>
          </ImgName>
         
        </InfoUser>

        <SkillsPainel>
          {levels?.map((level) => (
            <>
              <Skill>
                <p key={level._id}>Skill: {level.technology.name}</p>
                <p>Proficiency: {level.proficiency}</p>
                <Delete
                  key={level._id}
                  sx={{ cursor: "pointer", color: 'red' }}
                  onClick={() => handleDeleteClick(level._id)}
                />
              </Skill>
              <Divider />
            </>
          ))}
        </SkillsPainel>

        <SaveButton onClick={handleClickOpen}>Adicionar nova skill</SaveButton>
         */}
      </Container>
{/*
      <Dialog
        fullScreen={fullScreen}
        open={dialog}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Adicionar nova skill"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              fullWidth
              variant="standard"
              label="Proficiency"
              type="number"
              value={formData.proficiency}
              onChange={(e) => handleTextChange(e, 'proficiency')}
              inputProps={{
                maxLength: 2,
                min: 0,
                max: 100,
              }}
            />
            <SkillSelector>
              {skills.map((skill) => (
                <ListItemButton
                  key={skill._id}
                  selected={skillId === skill._id}
                  onClick={() => getSkillId(skill._id, skill.name)}
                >
                  {skill.name}
                </ListItemButton>
              ))}
            </SkillSelector>
          </DialogContentText>
        </DialogContent>
        <Button autoFocus onClick={handleSubmit}>
          Salvar
        </Button>
      </Dialog>*/}
      <UserInfoComponent>
        
      </UserInfoComponent>
      <Edituser />
    </>
  );
}

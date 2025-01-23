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
import {jwtDecode} from "jwt-decode";
import UserInfoComponent from "./UserInfoComponent";
import Edituser from "./EditUser";

export default function Profile() {
  const [user, setUser] = useState(null);
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
      setLevels([...levels, response.data.level]); // Atualize o estado com a nova skill

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

  if (!user) {
    return <div>Carregando...</div>; // Renderize um estado de carregamento enquanto os dados não estão disponíveis
  }

  return (
    <>
      <SaveButton onClick={handleClickOpen}>Adicionar nova skill</SaveButton>
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
            <Container>
              <SkillsPainel>
                {levels?.map((level, index) => (
                  <div key={level?._id || index}>
                    <Skill>
                      <p>Skill: {level?.technology?.name || 'N/A'}</p>
                      <p>Proficiency: {level?.proficiency}</p>
                      <Delete
                        key={level?._id}
                        sx={{ cursor: "pointer", color: 'red' }}
                        onClick={() => handleDeleteClick(level?._id)}
                      />
                    </Skill>
                  </div>
                ))}
              </SkillsPainel>
            </Container>
          </DialogContentText>
        </DialogContent>
        <Button autoFocus onClick={handleSubmit}>
          Salvar
        </Button>
      </Dialog>
      <UserInfoComponent />
      <Edituser />
    </>
  );
}
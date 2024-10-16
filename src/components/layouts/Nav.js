import { React, useContext, useEffect, useState } from 'react';
import { Navi, ImageProfile, Photo, Dm, ListButton, XpImgUsr, Verifi } from './nav.styled';
import api from '../../utils/api';
import Logo from '../../assets/god.png';
import { Divider, List, ListItem, ListItemIcon, Tab, Tabs } from '@mui/material';
import { Person, Badge, AddCircle, ExitToApp, Close, Feed, Folder, Public, Verified } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import Avatar from '../../assets/avatar.jpg';
import { styled } from '@mui/system';
import Verified2 from '../../assets/verified.png';


export default function Nav() {
  const [user, setUser] = useState({});
  const [token] = useState(localStorage.getItem('token') || "");
  const [dwidith, setDwidth] = useState(0);
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [value, setValue] = useState('feed');
  const navigate = useNavigate();
  const { logout } = useContext(Context);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
    const listElement = document.getElementById('list');

    if (listElement) {
      listElement.style.display = dwidith === 0 ? 'none' : 'block';
    }
  }, [dwidith]);

  function setWidth() {
    setDwidth(prevWidth => (prevWidth === 0 ? 300 : 0));
    setIsSideNavOpen(prevIsSideNavOpen => !prevIsSideNavOpen);

    const body = document.body;
    if (dwidith === 0) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }
  }

  const Side = () => {
    return (
      <>
        {isSideNavOpen && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 999,
            }}
            onClick={() => setWidth()}
          />
        )}
        <div
          style={{
            width: `${dwidith}px`,
            backgroundColor: '#111111',
            height: '100%',
            position: 'fixed',
            right: 0,
            transition: 'width 0.3s ease-in-out',
            borderTopLeftRadius: '6px',
            boxShadow: '-5px 0px 5px -4px #000000',
            zIndex: 1000,
            top: 0,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ display: 'flex', width: '100%' }}>
            {user.image ? (<img src={`${process.env.REACT_APP_API_LOCAL}img/users/${user.image}`} alt={user.name}
              style={{
                height: '50px',
                width: '50px',
                borderRadius: '50%',
                margin: '6px'
              }} />) :
              (<img src={Avatar} alt={user.name}
                style={{
                  height: '50px',
                  width: '50px',
                  borderRadius: '50%',
                  margin: '6px'
                }} />)}

            <p style={{
              color: '#d1d1d1',
              marginLeft: '10px',
              fontSize: '14px',
              marginTop: '20px'
            }}>
              {`${user.name} ${user.surname}`}
            </p>
            <i onClick={() => setWidth()} style={{
              right: 0,
              margin: 'auto',
              color: '#d1d1d1',
            }}>
              <Close sx={{
                padding: '2px',
                transition: '0.2s',
                borderRadius: '4px',
                '&:hover': {
                  backgroundColor: '#333333',
                  cursor: 'pointer'
                }
              }} />
            </i>
          </div>
          <Divider sx={{ backgroundColor: '#333333' }} />
          <List id="list" style={{ display: 'none' }}>
            <Link style={{ textDecoration: 'none' }} to='/profile' onClick={() => setWidth()}>
              <ListItem>
                <ListButton sx={{
                  color: "#d1d1d1",
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: "#333333",
                  }
                }}>
                  <ListItemIcon sx={{ color: "#d1d1d1" }}>
                    <Person />
                  </ListItemIcon>
                  Perfil
                </ListButton>
              </ListItem>
            </Link>
            <Link style={{ textDecoration: 'none' }} to='/myprojects' onClick={() => setWidth()}>
              <ListItem>
                <ListButton sx={{
                  color: "#d1d1d1",
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: "#333333",
                  }
                }}>
                  <ListItemIcon sx={{ color: "#d1d1d1" }}>
                    <Badge />
                  </ListItemIcon>
                  Meus Projetos
                </ListButton>
              </ListItem>
            </Link>
            <ListItem>
              <ListButton sx={{
                color: "#d1d1d1",
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: "#333333",
                }
              }}>
                <ListItemIcon sx={{ color: "#d1d1d1" }}>
                  <AddCircle />
                </ListItemIcon>
                Novo Projeto
              </ListButton>
            </ListItem>
            <ListItem>
              <ListButton onClick={() => logout()}
                sx={{
                  color: "#d1d1d1",
                  borderRadius: '10px',
                  '&:hover': {
                    backgroundColor: "#333333",
                  }
                }}>
                <ListItemIcon sx={{ color: "#d1d1d1" }}>
                  <ExitToApp />
                </ListItemIcon>
                Sair
              </ListButton>
            </ListItem>
          </List>
        </div>
      </>
    );
  };

  function navTabFeed() {
    return navigate('/feed')
  }
  function navTabForum() {
    return navigate('/allprojects')
  }
  function navTabNews() {
    return navigate('/public')
  }

  const CustomTabs = styled(Tabs)({
  });

  const CustomTab = styled(Tab)(({ theme }) => ({
    '&:focus': {
      boxShadow: `0 0 10px 0 ${theme.palette.primary.main} inset`,
    },
  }));

  return (
    <>
      <Navi>
        <Dm src={Logo} alt="devmasters" />
        <CustomTabs
          value={value}
          onChange={handleChange}
          aria-label="secondary tabs example"
          style={{ color: '#ffffff' }}
        >

          <CustomTab value="feed" label={<Feed sx={{ color: '#cccccc' }} />} onClick={() => navTabFeed()}></CustomTab>
          <CustomTab value="forum" label={<Folder sx={{ color: '#cccccc' }} />} onClick={() => navTabForum()}></CustomTab>
          <CustomTab value="search" label={<Public sx={{ color: '#cccccc' }} />} onClick={() => navTabNews()}></CustomTab>
        </CustomTabs>

        <XpImgUsr>

          <ImageProfile onClick={setWidth}>
            {user.image ? (<Photo src={`${process.env.REACT_APP_API_LOCAL}img/users/${user.image}`} alt={user.name} />) :
              (<Photo src={Avatar} alt='Avatar' />)}

            <div style={{position: 'relative', top: '-6px', textAlign: 'center'}}>
              <p style={{ color: 'white', fontSize: '13px' }}>{!user.verified ? (<></>) : (<Verifi src={Verified2} alt='verified' />)}  @{user.username}</p>
              <p style={{ color: '#00ce6a', fontSize: '12px', alignSelf: 'end' }}>{user.xp} XP</p>
            </div>
          </ImageProfile>
        </XpImgUsr>
      </Navi>

      <Side />

    </>
  );
}

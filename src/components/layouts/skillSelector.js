import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import styled from "styled-components";
import { ListItemButton } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const Container = styled.section`
  display: flex;
`;
const ListSkills = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px #c2c2c2;
  margin-left: 2em;
  max-height: 600px;
`;

export default function SkillSelector(){
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    api.get('/skills/getall').then((response) => {
      setSkills(response.data.skills)
    })
  }, []);

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

  return(
    <Container>
       <ListSkills>
        {skills.map((skill) => renderSkillItem(skill))}
      </ListSkills>
    </Container>
  )
}
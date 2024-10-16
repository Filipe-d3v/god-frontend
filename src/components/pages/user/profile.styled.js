import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
`;

export const InfoUser = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;

export const ImgName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageProfile = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
`;

export const InfoPersonal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Social = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  
  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const SkillsPainel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const Skill = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

export const SkillSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SaveButton = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

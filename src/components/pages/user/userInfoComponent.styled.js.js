import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #121212;
  color: #f0f0f0;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 0 auto;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 15px;
  }
`;

export const ImgStyled = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 2px solid #2c2c2c;
`;

export const UserInfo = styled.div`
  text-align: center;

  h3 {
    margin: 10px 0;
    font-size: 24px;
    color: #ffffff;
  }
  h4 {
    margin: 5px 0;
    font-size: 18px;
    color: #b3b3b3;
  }

  h5 {
    margin: 5px 0;
    font-size: 16px;
    color: #7a7a7a;
  }

  h6 {
    margin: 5px;
    color: #2196F3;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  
  a {
    margin: 0 10px;
    color: #7a7a7a;
    transition: color 0.2s;

    &:hover {
      color: #cccccc; /* Cor de destaque ao passar o mouse */
    }
  }
`;

export const SocialIcon = styled.div`
  font-size: 24px;
`;

export const ImgVerified = styled.img`
  height: 25px;
  position: relative;
  bottom: -6px;
`;

export const SkillsPainel = styled.div`
    display: flex;
    padding: 20px;
    border-top: solid 1px #cccccc;
    border-bottom: solid 1px #cccccc;

    i {
        color: #059862;
        cursor: pointer;
        transition: 0.2s;
        height: 50px;
        width: 50px;
    }

    img {
        height: 40px;
        border-radius: 10%;
        transition: 1.1s;

        &:hover {
        box-shadow: 0px 0px 8px 0px #000000;
        cursor: pointer;
  }
    }
`;

export const Skill = styled.div`
    margin-left: 10px;
    text-align: center;
    transition: 0.2s;
    height: auto;

    p {
        font-size: 10px;
        margin: 0;
        color: #cccccc;
    }

    &:hover {
    scale: 1.1;
    cursor: pointer;
  }
`;

export const LevelBar = styled.div`
  width: 100%;
  height: 10px;
  border: solid 1px #555555;
  border-radius: 5px;
  background-color: #999999;
`;

export const ColorBar = styled.div`
  height: 100%;
  border-radius: 5px;
`;

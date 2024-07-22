import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
  background-color: #777777;
  width: 70%;
  padding-bottom: 20px;
  padding-top: 10px;

  label {
    font-weight: 700;
    font-size: 20px;
    color: #111111;
  }
`;

export const PersonalInfo = styled.div`
  text-align: center;
  background-color: #999999;
  padding: 40px;
  border-radius: 5px;
  box-shadow: 0px 1px 8px -1px #000000;

  h3  {
    color: #ffffff;
    margin-bottom: 5px;
  }
  h4 {
    color: #ffffff;
    margin: 0;
    margin-bottom: 10px;
  }
  h5 {
    margin: 0;
    color: #ffffff;
  }
  img {
    height: 150px;
    border-radius: 50%;
    border: solid 1px #333333;
  }
  i {
    color: #111111;
    font-size: 30px;
    margin-left: 3px;
    margin-right: 3px;
    transition: 0.1s;
    padding: 0;
    margin-top: 0;
    margin-bottom: 0;

    &:hover {
      cursor: pointer;
      scale: 1.1;
    }
  }
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
        height: 60px;
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
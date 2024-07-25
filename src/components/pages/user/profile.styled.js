import styled from "styled-components";

export const ImageProfile = styled.img`
    border-radius: 50%;
    height: 10em;
    border: solid 2px #333333;
    width: 10em;
`;

export const InfoUser = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    padding-bottom: 20px;
    align-items: center;

    p {
        font-size: large;
        margin-bottom: 7px;
        margin-top: 0;
        padding: 0;
        font-weight: 700;
        color: #555555;
    }

    h3 {
        margin-top: 5px;
        margin-bottom: 5px;
        color: #555555;
        text-transform: uppercase;
    }
`;

export const AlterImage = styled.div`
    margin-top: -22px;
    position: relative;
    margin-right: -120px;
    label {
        color: #333333;
        border-radius: 45%;
        vertical-align: middle;
        cursor: pointer;
    }
`;

export const Social = styled.div`
    a { &:hover{
        scale: 1.2;
    }}
    a.git{
        color: #222222;
        margin-left: 10px;
    }
    a.in{
        color: blue;
        margin-right: 10px;
    }
    a.insta{
        color: #E6495F;
        margin-left: 20px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;

export const InfoPersonal = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 3em;
    text-align: left;
    margin-top: 5px;
    p {
        margin-top: 10px;
        margin-bottom: 0;
        color: #cccccc;
        font-weight: 500;
    }
    i {
        vertical-align: middle;
        color: #999999;
    }
`;

export const Skill = styled.div`
    margin-left: 10px;
    text-align: center;
    transition: 0.2s;
    height: 50px;

    p {
        font-size: 10px;
        margin: 0;
    }

    h4 {
        color: white;
    }

    &:hover {
        scale: 1.1;
    }
`;

export const SkillsPainel = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    width: 99%;
    i {
        color: #059862;
        cursor: pointer;
        transition: 0.2s;
        height: 30px;
        width: 30px;
    }
    i{ &:hover{
        scale: 1.2;
    }}

    img {
        height: 60px;
        border-radius: 25%;
    }
    p {
        color: #ffffff;
    }

    h3 {
        color: #ffffff;
        transition: 0.5s;
    }
    button {
        height: 3em;
        position: static;
    }
`;

export const SkillSelector = styled.div`
    margin: 10px;
    max-height: 500px;
`;

export const SaveButton = styled.button`
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;
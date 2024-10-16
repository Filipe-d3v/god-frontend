import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: auto;
  padding-bottom: 20px;
`;

export const ImgProject = styled.img`
  max-width: 300px;
`;

export const Skills = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 600px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-left: 10px;
    margin-top: 10px;
  }
`;

export const Desc = styled.div`
  h3 {
    color: #cccccc;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  border-bottom: #ffffff;
  width: 100%;

  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin-top: 1em;
    margin-right: 1em;
  }

  p {
    font-size: 30px;
    color: #000000;
    margin: 0;
  }

  h1 {
    margin: 0;
    color: #333333;
  }
`;

export const Images = styled.div`
  display: flex;
  border: solid 1px #111111;
  width: 80%;
  border-radius: 5px;
  background-color: #e1e1e1;
`;

export const CardImage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  margin-top: 0;
  border-radius: 5px;
  transition: 0.1s;

  img {
    height: 5em;
    transition: 0.2s;
    &:hover {
    box-shadow: 0px 0px 8px 0px #000000;
    scale: 1.1;
    cursor: pointer;
  }
  }

  h4 {
    margin: 0;
    color: #111111;
    margin-bottom: 0.5em;
  }
  
  
`;
export const Docs = styled.div`
  display: flex;
  border: solid 1px #111111;
  width: 80%;
  border-radius: 5px;
  background-color: #e1e1e1;
`;

export const CardDocs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  margin-top: 0;
  border-radius: 5px;
  transition: 0.1s;

  i {
    height: 5em;
    transition: 0.2s;
    align-items: center;
    justify-content: center;
    display: flex;
    background-color: #B51308;
    border-radius: 5px;

    &:hover {
    box-shadow: 0px 0px 8px 0px #000000;
    scale: 1.1;
    cursor: pointer;
  }
  }

  h4 {
    margin: 0;
    color: #111111;
    margin-bottom: 0.5em;
  }
`;

export const CardUserInfo = styled.div`
  display: flex;
  padding: 2em;
  background-color: #333333;
  color: #cccccc;

  p {
    font-size: 12px;
    font-weight: 700;
  }

  h4 {
    margin: 0;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-left: solid 1px #999999;
  padding-left: 0.5em;

  p {
    color: #cccccc;
  }
`;

export const ImgUser = styled.div`
width: auto;
  img {
    border: solid 2px #cccccc;
  }
  h4 {
    text-align: center;
  }
`;
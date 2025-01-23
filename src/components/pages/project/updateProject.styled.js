import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  align-items: center;
  background-color: #777777;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 240px;
    height: auto;
    object-fit: cover;
  }
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-family: Arial, sans-serif;
  font-size: 16px;
  resize: vertical;
`;

export const ListSkills = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background-color: #1c1c1e;
  border-radius: 8px;
  border: 1px solid #2c2c2e;
  max-width: 400px;
  height: 25em;
  margin: 0 auto;
  color: #cccccc;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 8px;
  }
  &::-webkit-scrollbar-track{
   background: #3a3a3c;
   padding: 1px;
  }
  &::-webkit-scrollbar-thumb{
    background: #888;
    border-radius: 10px;
  }

  div {
    display: flex;
    align-items: center;
    padding: 3px;
    border-radius: 5px;
    background-color: #2c2c2e;
    transition: background-color 0.2s ease;
    width: 90%;

    img {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 8px;
    }

    .MuiSvgIcon-root {
      color: #4caf50;
      margin-right: 5px;
    }

    span {
      color: #f1f1f1;
    }

    &:hover {
      background-color: #3a3a3c;
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;




export const Docs = styled.div`
  display: flex;
  border: solid 1px #111111;
  width: 80%;
  border-radius: 5px;
  background-color: #cccccc;
  height: 7em;
`;

export const CardDocs = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  border-radius: 5px;
  transition: 0.1s;
  background-color: #cccccc;

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

export const Images = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: solid 1px #333;
  border-radius: 8px;
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  overflow-x: auto;
  width: 90%;
  margin: 1em;

  & img {
    flex-shrink: 0;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 12px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    }
  }

  /* Scrollbar styles */
  &::-webkit-scrollbar {
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`;

export const CardImage = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  border-radius: 5px;
  transition: 0.1s;
  background-color: #cccccc;

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

export const SkillPainel = styled.div`
  width: 40px;
  height: 40px;
  margin: 2px;
  
  img {
    width: 100%;
    border-radius: 50%;
  }
`;

export const SelectedImages = styled.div`
  display: flex;
  width: 100%;

  img {
    height: 5em;
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1em;
  background-color: #1c1c1c;
`;

export const SectionStyled = styled.section`
  display: flex;
`;

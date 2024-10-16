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

  img {
    height: 140px;
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
  border: solid 1px #c2c2c2;
  margin-left: 2em;
  max-height: 600px;
`;

export const Docs = styled.div`
  display: flex;
  border: solid 1px #111111;
  width: 80%;
  border-radius: 5px;
  background-color: #cccccc;
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
  overflow-x: auto;
  width: 90%;
  margin: 0 auto;

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
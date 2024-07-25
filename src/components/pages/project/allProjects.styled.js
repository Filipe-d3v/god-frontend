import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center; 
`;

export const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;

  h2 {
    margin: 0;
  }
`;

export const CardProject = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #333333;
  padding: 10px;
  width: 200px; 
  align-items: center;
  text-align: center;
  color: #cccccc;
  background-color: #222222;
  border-radius: 10px;
  box-shadow: -3px 6px 9px -4px #000000;

  img {
    height: 10em;
    width: 100%;
    object-fit: cover;
    border: solid 1px #444444;
  }

  p {
    margin: 0;
    color: #cccccc;
    font-weight: 500;
    
  }
`;

export const Button = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

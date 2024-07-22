import styled from 'styled-components';

export const Container = styled.div`
  border: solid 1px #888888;
  display: flex;
  justify-content: center; 
`;

export const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
`;

export const CardProject = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px; 
  align-items: center;
  text-align: center;

  img {
    height: 10em;
    width: 100%;
    object-fit: cover; 
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

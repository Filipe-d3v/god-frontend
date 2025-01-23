import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f4f4f4;
`;

export const NotificationBar = styled.div`
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  height: 150px;
  overflow-y: auto;
  padding-left: 5em;
  padding-right: 50px;

  img {
    height: 40px;
    border-radius: 50%;
    border: 1px solid #fff;
  }

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
`;

export const RankingSection = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const RankingCard = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const RankingTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 15px;
`;

export const RankingItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const ItemName = styled.span`
  font-weight: 600;
`;

export const ItemScore = styled.span`
  color: #888;
`;

export const Note = styled.div`
  display: flex;
  border: solid 1px #555;
  border-radius: 5px;
  padding: 5px;
  margin: 3px;
  background-color: #6666;
  box-shadow: -2px 4px 4px -2px #000000;

  h5, h6 {
    margin: 0;
    color: #fff;
    padding: 1px;
  }
`;

export const CardProject = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 2px solid #cccccc;
  
  h4 {
    margin: 0;
    text-decoration: none;
  }

  h6 {
    margin: 1px;
    text-decoration: none;
  }

  img {
    height: 50px;
    width: auto;
    max-width: 100%;
    object-fit: contain;
    align-self: flex-start;
    border-radius: 50%;
  }
`;

import React, { useEffect, useState } from "react";
import { Container } from "./userDetails.styled";
import { useParams } from "react-router-dom";
import api from "../../../utils/api";
import { jwtDecode } from 'jwt-decode';
import UserInfoComponent from "./UserInfoComponent";

export default function UserDetails() {
  const { id } = useParams();
  const [token] = useState(localStorage.getItem('token') || '');


  useEffect(() => {
    
    const getVisitor = async () => {
      try {
        const decoded = jwtDecode(token);
        const visitorId = decoded.id;
        const newVisit = {
          visitor: visitorId,
          visited: id
        }
        console.log(newVisit);
        await api.post('/visits/create', newVisit, {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`
          }
        });
        console.log("deu certo");
      } catch (error) {
        console.log("deu errado", error.response ? error.response.data : error.message);
      }
    };

    if (token && id) {
      getVisitor();
    }
  }, [id, token]);

  return (
    <Container>
      <UserInfoComponent />
    </Container>
  );
}

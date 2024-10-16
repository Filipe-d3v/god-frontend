import { Button, Dialog } from "@mui/material";
import styled from "styled-components";

export const Img = styled.div`
  height: 10em;
  border-radius: 50%;
`;

export const ImageProfile = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
`;

export const SectionStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DialogStyled = styled(Dialog)`
  width: 100%;
`;
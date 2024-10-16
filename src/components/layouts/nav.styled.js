import { ListItemButton } from "@mui/material";
import styled from "styled-components";

export const Navi = styled.nav`
    top: 0;
    position: fixed;
    width: 100%;
    height: 5em;
    background-color: #111111;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
    box-shadow: 0px 2px 6px 0px #000000;
`;

export const H1 = styled.h1`
`;

export const ImageProfile = styled.div`
    position: absolute;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    padding: 0;

    p {
        margin: 0;
    }
`;

export const Photo = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: solid 2px #cccccc;
    cursor: pointer;
    position: relative;
    bottom: -6px;
    right: -17px;
`;

export const InfoUser = styled.div`
    position: absolute;
    left: 200px;
    display: flex;
    flex-direction: column;
    border-left: solid 1px #9d9d9d;
    padding-left: 15px;
`;

export const H3 = styled.h3`
    margin-top: 0;
    padding-top: 0;
    margin-bottom: 10px;
`;

export const P = styled.p`
    margin-top: 0;
    padding-top: 0;
    margin-bottom: 10px;
`;

export const Dm = styled.img`
    height: 50px;
    left: 20px;
    position: absolute;
`;

export const SideNav = styled.div`
    padding: 20px;
    background-color: '#444444';
    height: "100%";
    position: "absolute";
    right: 0;
    transition: "width 0.3s ease-in-out";
    border-Top-Left-Radius: "6px";
    box-Shadow: '-5px 0px 5px -4px #000000';
`;

export const ListButton = styled(ListItemButton)`
    font-weight: bold;
    color: '#d2d2d2';
    border-radius: "10px";
    &&:hover{
        background-color: '#666666';
    }
`;

export const XpImgUsr = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
`;

export const Verifi = styled.img`
    height: 1.7em;
    margin: 0;
    bottom: -5px;
    position: relative;
`;
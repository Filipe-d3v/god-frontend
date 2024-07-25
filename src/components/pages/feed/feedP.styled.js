import styled, {keyframes} from "styled-components";

const rippleAnimation = keyframes`
  to {
    width: 200px;
    height: 200px;
    opacity: 0;
  }
`;

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const NewPost = styled.div`
    border-radius: 10px;
    margin-bottom: 20px;
    padding: 10px;
    width: 600px;
    background-color: #111111;
    margin-top: 20px;
    color: #cccccc;
    box-shadow: 0px 2px 6px 0px #000000;
`;

export const HeaderPost = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

export const ImgProfile = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: solid 2px #cccccc;
`;

export const ImgProject = styled.img`
    width: 100%;
    max-height: 400px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
`;

export const CreatePost = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    padding: 15px;
    border-radius: 5px;
    width: 600px;
    background-color: #222222;
    box-shadow: 0px 2px 6px 0px #000000;

    form {
        display: flex;
        flex-direction: column;
        text-align: center;
    }

    h4 {
        margin: auto;
        text-transform: uppercase;
        font-weight: 500;
        color: #333333;
        padding: 0.5em;
        background-color: #cccccc;
        border-radius: 4px;
        margin-right: -1px;
        width: 28%;
    }

    form p{
        margin-top: 5px;
        margin-bottom: 5px;
        font-size: 18px;
        font-weight: 600;
    }
`;

export const PostInfo = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    p {
        margin: 0;
        font-weight: 500;
        transition: 0.2;
        &:hover {
            scale: 1.05;
        }
    }

    img {
        height: 50px;
        margin: 0;
        padding: 0;
    }

    h6 {
        color: #cccccc;
        margin: 0;
    }
    h5 {
        color: #cccccc
    }

    h4 {
        margin: 0;
        color: #cccccc;
    }

    a:focus {
        outline: none;
    }
`;

export const Button = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    transition: 0.1s;
    &:hover {
    box-shadow: 0px 0px 8px 0px #000000;
    scale: 1.2;
    }

    &:after {
    content: '';
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.4);
    animation: ${rippleAnimation} 0.6s linear;
    pointer-events: none;
  }
`;

export const Skills = styled.div`
    margin-left: 3px;
    margin-right: 3px;
    margin-bottom: 5px;
    margin-top: 0;
    transition: 0.3s;
    img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: block;
    }

    &:hover {
        scale: 1.1;
    }
`;
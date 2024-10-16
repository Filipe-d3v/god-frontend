import React from "react";
import VefifiedIco from '../../assets/verified.png';
export default function Verified(){
  return(
    <>
      <img src={VefifiedIco} alt="verified"
        style={{
          height: '1.5em',
          margin: '0',
          position: 'relative',
          bottom: '-6px',
          margin: '0'
        }}
      />
    </>
  )
}
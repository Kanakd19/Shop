import React from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";
import { NavLink } from "react-router-dom";


const THANK = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-right:150
  flex: 1;
  ${mobile({ padding: "10px" })}
`;

const THANKS = styled.h1`
padding: 150px;
border: 2px solid teal;
background-color: yellow;
justify-content: center;
align-item:center;
cursor: pointer;
font-weight: 700;
&:hover {
  background-color: grey;
}
`;
const Thanks = () => {
 

  return (

    <THANK style={{margin:150 }}>
        <NavLink to="/"> 
<THANKS  style={{  margin:150 }}>THANK YOU</THANKS>

            </NavLink>
    </THANK>
   
  )
}

export default Thanks
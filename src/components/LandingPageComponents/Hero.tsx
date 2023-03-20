import React from "react";
import styled from "styled-components";

const Section = styled.div`
    height: 100vh;
    background-color: rebeccapurple;
`

const Hero: React.FC = () => {
  return(
    <Section>Hello from hero.</Section>
  ) 
};

export default Hero;

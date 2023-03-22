import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
const Right = styled.div`
  flex: 3;
  position: relative;
`;

const Title = styled.h1`
  font-size: 74px;
  /* border: "1px solid red";
  border-width: 1px;
  text-align: center;
  border-radius: 5px; */
`;

const Desc = styled.p`
  font-size: 20px;
  color: lightgray;
`;

const Button = styled.button`
  background-color: #9B2C2C;
  color: white;
  font-weight: 500;
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

&:hover {
    background-color: white;
    color: #9B2C2C;
  }
`;

const Img = styled.img`
  width: 800px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @keyframes animate {
    to {
      transform: translateY(20px);
    }
  }
`;

const Hero: React.FC = () => {
  return (
    <Section>
      <Navbar />
      <Container>
        <Left>
          <Title>Shall. We. Talk</Title> 
          <Desc>A hesitation free talking environment 
            for everyone. We provide you a hassle free space where
            you can talk to anybody you know or do not know with
            a relevant interest.</Desc>
          <Button>Learn more</Button>
        </Left>
        <Right>
          <Img src="./img/3dfloor.png" />
        </Right>
      </Container>
    </Section>
  );
};

export default Hero;

import React from "react";
import Contact from "./LandingPageComponents/Contact";
import Hero from "./LandingPageComponents/Hero";
import OurWorks from "./LandingPageComponents/OurWorks";
import WhoWeAre from "./LandingPageComponents/WhoWeAre";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow: auto;
  scrollbar-width: none;
  color: white;
  /* background-color: #FC8181; */
  /* background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  ); */ 
  background: rgb(208, 33, 33);
  background: linear-gradient(
    151deg,
    rgba(208, 33, 33, 1) 0%,
    rgba(205, 187, 187, 1) 100%
  );
  &::-webkit-scrollbar {
    display: none;
  }
`;

const LandingPage: React.FC = () => {
  return (
    <Container>
      <Hero />
      <WhoWeAre />
      <OurWorks />
      <Contact />
    </Container>
  );
};

export default LandingPage;

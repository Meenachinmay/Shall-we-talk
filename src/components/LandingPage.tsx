import React from "react";
import Contact from "./LandingPageComponents/Contact";
import Hero from "./LandingPageComponents/Hero";
import OurWorks from "./LandingPageComponents/OurWorks";
import WhoWeAre from "./LandingPageComponents/WhoWeAre";
import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
`

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <OurWorks />
      <Contact />
    </>
  );
};

export default LandingPage;

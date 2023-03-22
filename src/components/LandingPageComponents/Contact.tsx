import React from "react";
import styled from "styled-components";

const Section = styled.div`
    height: 100vh;
    scroll-snap-align: center;
`

const Contact: React.FC = () => {
  return <Section>i am contact component.</Section>;
};

export default Contact;
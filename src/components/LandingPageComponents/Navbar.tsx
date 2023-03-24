import React from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center; 
  width: 100%;
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
`;

const Links = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Icons = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`;

const Logo = styled.img`
  height: 50px;
`;

const List = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

const ListItem = styled.li`
  cursor: pointer;
`;

const Navbar: React.FC = () => {
  return (
    <Section>
      <Container>
        <Links>
          <a href="#hero"><Logo src="./img/parrot.png" /></a>
          <List>
            <ListItem>
              <a href="#hero">Home</a>
            </ListItem>
            <ListItem>
              <a href="#whoweare">Who are are</a>
            </ListItem>
            <ListItem>
              <a href="#ourworks">Our works</a>
            </ListItem>
            <ListItem>
              <a href="#contactus">Contact us</a>
            </ListItem>
          </List>
        </Links>
        <Icons></Icons>
      </Container>
    </Section>
  );
};

export default Navbar;

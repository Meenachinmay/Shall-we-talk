import React from "react";
import styled from "styled-components";

const Section = styled.div`
  display: flex;
  justify-content: center;
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

const Icon = styled.img`
    width: 20px;
    cursor: pointer;
`;

const Button = styled.button`
    width: 100px;
    padding: 10px;
    background-color:#9B2C2C;
    color: white;
    border-radius: 5px;
    border: none;
`;

const Navbar: React.FC = () => {
  return (
    <Section>
      <Container>
        <Links>
          <Logo src="./img/parrot.png" />
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Who are are</ListItem>
            <ListItem>What we do</ListItem>
            <ListItem>Contact us</ListItem>
          </List>
        </Links>
        <Icons>
          
        </Icons>
      </Container>
    </Section>
  );
};

export default Navbar;

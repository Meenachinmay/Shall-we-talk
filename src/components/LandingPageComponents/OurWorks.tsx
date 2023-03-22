import React from "react";
import styled from "styled-components";

interface IListItem {
  text: string;
}

const data = ["Real to Virtual Space", "Talk Status", "Send Message"];

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li<IListItem>`
  font-size: 70px;
  cursor: pointer;
  color: transparent;
  -webkit-text-stroke: 1px white;
  position: relative;

  ::after {
    content: "${(props) => props.text}";
    position: absolute;
    top: 0;
    left: 0;
    /* color: #9b2c2c; */
    color: pink;
    width: 0px;
    overflow: hidden;
    white-space: nowrap;
    -webkit-text-stroke: 0px transparent;
  }

  &:hover {
    ::after {
      animation: moveText 0.5s linear both;

      @keyframes moveText {
        to {
          width: 100%;
        }
      }
    }
  }
`;

const OurWorks: React.FC = () => {
  return (
    <Section>
      <Container>
        <Left>
          <List>
            {data.map((data) => (
              <ListItem key={data} text={data}>
                {data}
              </ListItem>
            ))}
          </List>
        </Left>
        <Right></Right>
      </Container>
    </Section>
  );
};

export default OurWorks;

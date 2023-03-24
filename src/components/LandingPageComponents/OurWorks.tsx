import React, { useState } from "react";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/effect-coverflow";

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
  flex: 2;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ListItem = styled.li<IListItem>`
  font-size: 50px;
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

const SwipeImage = styled.img`
  height: 300px;
  border: 1px solid white;
  border-radius: 5px;
animation: animate 2s infinite ease alternate;

  @keyframes animate {
    to {
      transform: translateY(20px) rotateZ(5deg);
    }
  }
`;

const OurWorks: React.FC = () => {
  const [work, setWork] = useState<string>("Real to Virtual Space");

  function renderImage() {
    if (work === "Real to Virtual Space") {
      return <SwipeImage src="./img/layer2.webp" />;
    } else if (work === "Talk Status") {
      return <SwipeImage src="./img/layer3.webp" />;
    } else {
      return <SwipeImage src="./img/layer4.webp" />;
    }
  }

  return (
    <Section id="ourworks">
      <Container>
        <Left>
          <List>
            {data.map((data) => (
              <ListItem key={data} text={data} onClick={() => setWork(data)}>
                {data}
              </ListItem>
            ))}
          </List>
        </Left>
        <Right> {renderImage()} </Right>
      </Container>
    </Section>
  );
};

export default OurWorks;

import { Flex, HStack } from "@chakra-ui/react";
import React from "react";
import { Layer, Stage, Image } from "react-konva";
import styled from "styled-components";
import useImage from "use-image";
import Floor from "../../images/testing_floor.jpg";

const Section = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  height: 100vh;
  scroll-snap-align: center;
  width: 1400px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 74px;
`;

const WhatWeDo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Line = styled.img`
  height: 5px;
`;

const Subtitle = styled.h2`
  color: white;
  font-size: 15pt;
`;

const Desc = styled.p`
  font-size: 20px;
  color: lightgray;
`;

const Button = styled.button`
  background-color: #9b2c2c;
  color: white;
  font-weight: 500;
  width: auto;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: #9b2c2c;
  }
`;

const Img = styled.img`
  width: 650px;
  height: 450px;
  object-fit: cover;
  background-blend-mode: lighten;
  background-repeat: no-repeat, repeat;
  border: 5px solid white;
  border-radius: 10px;
`;

const WhoWeAre: React.FC = () => {

  const [bgImage] = useImage(Floor);

  return (
    <Section id="whoweare">
      <Container>

        <Left>
          <HStack
            borderWidth={1}
            borderColor="gray.100"
          >
            <Flex
              style={{
                overflow: "scroll",
              }}
              flexDirection={"column"}
            >
              <Stage className="stage" width={650} height={450}>
                <Layer>
                  {/* this image tag is rendering BG image in the virtual space */}
                  <Image image={bgImage} width={650} height={450} />
                </Layer>
              </Stage>
            </Flex>
          </HStack>
        </Left>

        <Right>
          <Title>A unreal but real space for you.</Title>
          <WhatWeDo>
            <Line src="./img/line.png" />
            <Subtitle>Who we are</Subtitle>
          </WhatWeDo>
          <Desc>
            RCI created an opportunity for you to talk to anybody in your
            co-working space anywhere. Get yourself out of this world full of
            hesitation and restrictions and make new connection where ever you
            are. It's a totally new way to get connected with unknows, of course
            we are not a dating site but we provides a platform to talk with
            your interest in a closed space.
          </Desc>
          <Button>Let's jump in the space</Button>
        </Right>
      </Container>
    </Section>
  );
};

export default WhoWeAre;

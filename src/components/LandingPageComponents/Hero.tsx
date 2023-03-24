import { MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import { Sphere } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
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
  display: flex;
  align-items: center;
  font-weight: bold;
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
  background-color: #9b2c2c;
  color: white;
  font-weight: 500;
  width: 150px;
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
  height: 450px;
  object-fit: contain;
  position: absolute;
  border: 5px solid white;
  border-radius: 10px;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @keyframes animate {
    to {
      transform: translateY(20px) rotateZ(5deg);
    }
  }
`;

const ShallWe = styled.p`
  margin-right: 5px;
  color: black;
  text-decoration: underline;
`;

const Talk = styled.p`
  text-decoration: underline;
  color: #fed7d7;
`;

const Hero: React.FC = () => {
  return (
    <Section id="hero">
      <Navbar />
      <Container>
        <Left>
          <Title>
            <ShallWe>Shall We</ShallWe> <Talk>Talk</Talk>
          </Title>
          <Desc>
            A hesitation free talking environment for everyone. We provide you a
            hassle free space where you can talk to anybody you know or do not
            know with a relevant interest.
          </Desc>
          <Button>Learn more</Button>
        </Left>
        <Right>
          <Canvas>
            <OrbitControls enableZoom={false} autoRotate />
            <ambientLight intensity={1} />
            <directionalLight position={[3, 2, 1]} />
            <Sphere args={[1, 100, 200]} scale={2.3}>
              <MeshDistortMaterial
                color="#dd7481"
                attach="material"
                distort={0.5}
                speed={2}
              />
            </Sphere>
          </Canvas>
          <Img src="./img/layer1-officeImage.jpg" />
        </Right>
      </Container>
    </Section>
  );
};

export default Hero;

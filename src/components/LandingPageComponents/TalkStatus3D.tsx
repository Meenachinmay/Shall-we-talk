import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Tlight from "./Tlight";

const TalkStatus3d: React.FC = () => {
  return (
    <Canvas>
      <Stage environment="city" intensity={0.6}>
        <Tlight />
      </Stage>
      <OrbitControls enableZoom={true} />
    </Canvas>
  );
};

export default TalkStatus3d;

import React, { useState } from "react";
import { Image } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import useImage from "use-image";
import useronline from "../images/useronline.jpg";
import useroffline from "../images/useroffline.jpg";
import userletstalk from "../images/userletstalk.jpg";
import { Html } from "react-konva-utils";

type UserProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  status: string;
  highLightUser: boolean;
  showX: number;
  showY: number;
  profileImage: string;
  userName: string;
  userId: string;
  userClicked: string;
};

const User: React.FC<UserProps> = ({
  highLightUser,
  showX,
  showY,
  x,
  y,
  width,
  height,
  status,
  profileImage,
  userName,
  userId,
  userClicked,
}: UserProps) => {
  const [dragUser, setDragUser] = useState<boolean>(false);
  const [currentUserPos, setCurrentUserPos] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  let [imageOnline] = useImage(useronline);
  let [imageOffline] = useImage(useroffline);
  let [imageReady] = useImage(userletstalk);
  let [defaultImage] = useImage(useroffline);
  let [profileImg] = useImage(profileImage);

  const handleIconDragStart = (e: KonvaEventObject<DragEvent>) => {
    setCurrentUserPos({ x: e.target.x(), y: e.target.y() });
    setDragUser(true);
  };

  const handleIconDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setCurrentUserPos({ x: e.target.x(), y: e.target.y() });
    setDragUser(false);
  };

  return (
    <>
      {/* <Image
        x={x}
        y={y}
        image={
          status === "want_to_talk"
            ? imageOnline
            : status === "do_not_want_to_talk"
            ? imageOffline
            : status === "lets_talk"
            ? imageReady
            : defaultImage
        }
        width={width}
        height={height}
        draggable
        onDragStart={(e) => handleIconDragStart(e)}
        onDragEnd={(e) => handleIconDragEnd(e)}
        onClick={() => alert(status)}
      /> */}

      <Image
        x={x}
        y={y}
        image={profileImg}
        width={width}
        height={height}
        draggable
        onDragStart={(e) => handleIconDragStart(e)}
        onDragEnd={(e) => handleIconDragEnd(e)}
        onClick={() => alert(status)}
      />
      {highLightUser && userId === userClicked ? (
        <Html
          divProps={{
            style: {
              position: "absolute",
              top: `${showX}px`,
              left: `${showY}px`,
              color: "black",
            },
          }}
        >
          <button onClick={() => alert("clicked")}>{userName}</button>
        </Html>
      ) : null}
    </>
  );
};

export default User;

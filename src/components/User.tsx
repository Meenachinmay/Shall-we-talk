import React, { useState } from "react";
import { Image } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import useImage from "use-image";
import useronline from "../images/useronline.jpg";
import useroffline from "../images/useroffline.jpg";
import userletstalk from "../images/userletstalk.jpg";
import { Html } from "react-konva-utils";

import "../components/messagePopUp.css";

type UserProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  status: string;
  companyName: string;
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
  companyName,
  profileImage,
  userName,
  userId,
  userClicked,
}: UserProps) => {
  const [dragUser, setDragUser] = useState<boolean>(false);
  const [currentUserPos, setCurrentUserPos] = useState<{
    x: number;
    y: number;
  }>({ x: x, y: y });
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
              top: `${currentUserPos.y - 60}px`,
              left: `${currentUserPos.x + 30}px`,
            },
          }}
        >
          <div
            style={{
              color: "#1A202C",
              borderRadius: "10px",
              border: "4px solid",
              borderColor: `${
                status === "want_to_talk"
                  ? "#38A169"
                  : status === "do_not_want_to_talk"
                  ? "#E53E3E"
                  : "#63B3ED"
              }`,
              fontSize: "15px",
              backgroundColor: "white",
              padding: "10px",
              width: "150px",
              textAlign: "start",
            }}
            onClick={() => alert("clicked")}
          >
            <div style={{ display: "flex" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>{userName}</div>
                <div>{companyName}</div>
              </div>
            </div>
          </div>
        </Html>
      ) : null}
    </>
  );
};

export default User;

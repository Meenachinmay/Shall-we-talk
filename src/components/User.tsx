import React, { useState } from "react";
import { Image } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import useImage from "use-image";
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
  currentLoggedInUser: string;
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
  currentLoggedInUser,
  userClicked,
}: UserProps) => {
  const [dragUser, setDragUser] = useState<boolean>(false);
  const [currentUserPos, setCurrentUserPos] = useState<{
    x: number;
    y: number;
  }>({ x: x, y: y });
  let [profileImg] = useImage(profileImage);

  const handleIconDragStart = (e: KonvaEventObject<DragEvent>) => {
    setDragUser(true);
    setCurrentUserPos({ x: e.target.x(), y: e.target.y() });
  };

  const handleIconDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setCurrentUserPos({ x: e.target.x(), y: e.target.y() });
    setDragUser(false);
  };
 
  function handleMouseEnter() {
    if (currentLoggedInUser === userId) {
      setDragUser(true);
    } else {
      setDragUser(false);
    }
  }

  return (
    <>
      <Image
        x={x}
        y={y}
        stroke={`${
          status === "want_to_talk"
            ? "#38A169"
            : status === "do_not_want_to_talk"
            ? "#E53E3E"
            : "#63B3ED"
        }`}
        strokeWidth={10}
        lineJoin="round"
        image={profileImg}
        width={width}
        height={height}
        draggable={dragUser}
        onDragStart={(e) => handleIconDragStart(e)}
        onDragEnd={(e) => handleIconDragEnd(e)}
        onClick={() => alert(status)}
        onMouseEnter={() => handleMouseEnter()}
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
              fontSize: "10px",
              backgroundColor: "white",
              padding: "10px",
              width: "150px",
              textAlign: "start",
            }}
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

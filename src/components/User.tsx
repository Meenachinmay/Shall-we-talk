import React, { useState } from "react";
import { Image } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import useImage from "use-image";
import { Html } from "react-konva-utils";
import { Flex } from "@chakra-ui/react";

import "../components/messagePopUp.css";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase/clientApp";

type UserProps = {
  mobileUser: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  status: string;
  companyName: string;
  highLightUser: boolean;
  profileImage: string;
  userName: string;
  userId: string;
  currentLoggedInUser: string;
  userClicked: string;
};

const User: React.FC<UserProps> = ({
  mobileUser,
  highLightUser,
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
  const [localHighlight, setLocalHighlight] = useState<boolean | null>(null);

  const handleIconDragStart = async (e: KonvaEventObject<DragEvent>) => {
    setDragUser(true);
    //setCurrentUserPos({ x: e.target.x(), y: e.target.y() });
  };

  const handleIconDragEnd = async (e: KonvaEventObject<DragEvent>) => {
    //setCurrentUserPos({ x: e.target.x(), y: e.target.y() });

    await updateDoc(doc(firestore, `vs-users/userId-${userId}`), {
      userPosX: e.target.x(),
      userPosY: e.target.y(),
    });

    //setDragUser(false);
    handleMouseEnter();
  };

  //this method is controlling the drag and drop auth issues in the virtual space
  function handleMouseEnter() {
    if (currentLoggedInUser === userId) {
      setDragUser(true);
    } else {
      setDragUser(false);
    }
  }

  return (
    <> 
    { !mobileUser ? 
      <Flex>
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
          strokeWidth={8}
          lineJoin="round"
          image={profileImg}
          width={width}
          height={height}
          draggable={dragUser}
          onDragStart={(e) => handleIconDragStart(e)}
          onDragEnd={(e) => handleIconDragEnd(e)}
          onClick={() => setLocalHighlight(!localHighlight)}
          onMouseEnter={() => handleMouseEnter()}
        />
        {highLightUser && userId === userClicked ? (
          <Html
            divProps={{
              style: {
                position: "absolute",
                top: `${y - 60}px`,
                left: `${x + 30}px`,
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
                  <div style={{ fontWeight: "bolder"}}>{userName}</div>
                  <div>{companyName}</div>
                </div>
              </div>
            </div>
          </Html>
        ) : localHighlight ? (
          <Html
            divProps={{
              style: {
                position: "absolute",
                top: `${y - 60}px`,
                left: `${x + 30}px`,
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
                  <div style={{ fontWeight: 'bolder'}}>{userName}</div>
                  <div>{companyName}</div>
                </div>
              </div>
            </div>
          </Html>
        ) : null}
      </Flex> : null }
    </>
  );
};

export default User;

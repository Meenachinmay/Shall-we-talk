import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Tooltip,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { HiBell } from "react-icons/hi";
import NotificationCard from "../Notifications/NotificationCard";
import { NotificationType } from "../../types/NotificationType";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { firestore } from "../firebase/clientApp";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../atoms/currentUserState";
import LoadingSpinner from "../customUIComponents/LoadingSpinner";

const NotificationsDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUserState] = useRecoilState(currentUserState);
  const btnRef = useRef().current;
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const notificationCol = collection(firestore, "notifications");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      const fetchNotificationQuery = query(
        notificationCol,
        where("receiver", "==", `${currentUser.id}`)
      );
      setLoading(true);
      onSnapshot(fetchNotificationQuery, (snapShot) => {
        const notificationsLocal: NotificationType[] = [];
        snapShot.forEach((doc) => {
          notificationsLocal.push(doc.data() as NotificationType);
        });
        setNotifications(notificationsLocal);
        setLoading(false);
      });
    } catch (error) {
      console.log("fetch notification service error " + error);
    }
  }, [firestore, isOpen]);

  return (
    <>
      <Tooltip label="Notification" placement="bottom">
        <IconButton
          ref={btnRef}
          onClick={onOpen}
          color="red.500"
          icon={<HiBell />}
          mr={2}
          ml={2}
          size="sm"
          display={{ base: "flex", sm: "inherit" }}
          aria-label="Notification"
        />
      </Tooltip>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Notifications</DrawerHeader>

          {loading ? (
            <DrawerBody>
              <LoadingSpinner />
            </DrawerBody>
          ) : (
            <DrawerBody>
              {notifications.filter((n) => {
                return n.seen === true ? null  : n
              }).map((notification) => (
                <NotificationCard
                  key={notification.message}
                  seen={notification.seen}
                  type={notification.type}
                  message={notification.message}
                />
              ))}
              {notifications.length === 0 ? (
                <Text fontSize="sm">No notifications for you as of now.</Text>
              ) : null}
            </DrawerBody>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationsDrawer;

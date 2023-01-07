import { collection, doc, setDoc } from "firebase/firestore"
import { firestore } from "../components/firebase/clientApp"

const notificationCol = collection(firestore, 'notifications')

export function createNotification(sender: string, receiver: string, seen: boolean, type: string, message: string): boolean {

  try {
    setDoc(doc(notificationCol, 'notifications'), {
      sender: sender, receiver: receiver, seen: seen, type: type, message: message
    })
    return true
  } catch (error) {
    console.log("create notification service error " + error)
    return false
  }
}

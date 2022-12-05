import { atom } from 'recoil'
import { Message } from '../types/Message'

export interface MyMessagesModelState {
  messages: Message[]
  open: boolean
}

const defaultState: MyMessagesModelState = {
  messages: [],
  open: false
}

export const myMessagesModelState = atom<MyMessagesModelState>({
  key: "myMessagesModelState",
  default: defaultState
})

import { atom } from 'recoil'

export interface SendMessageModelState {
  open: boolean,  
}

const defaultState: SendMessageModelState = {
  open: false,
}

export const sendMessageModelState = atom<SendMessageModelState>({
  key: "sendMessageModelState",
  default: defaultState
})

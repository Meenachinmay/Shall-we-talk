import { atom } from 'recoil'

export interface AuthModelState {
 open: boolean,
  view: "login" | "signup" | "resetPassword"
}

const defaultState: AuthModelState = {
  open: false,
  view: "login"
}

export const authModelState = atom<AuthModelState>({
  key: "authModelState",
  default: defaultState
})

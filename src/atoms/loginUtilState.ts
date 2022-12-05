import { atom } from 'recoil'

export interface LoginUtilState {
  foundProfile: boolean,
  alreadyInUsers: boolean
}

const defaultState: LoginUtilState = {
  foundProfile: false,
  alreadyInUsers: false
}

export const loginUtilState = atom<LoginUtilState>({
  key: "loginUtilState",
  default: defaultState
})

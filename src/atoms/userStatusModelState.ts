import { atom } from 'recoil'

export interface UserStatusModelState {
  open: boolean,
}

const defaultState: UserStatusModelState = {
  open: false,
}

export const userStatusModelState = atom<UserStatusModelState>({
  key: "userStatusModelState",
  default: defaultState
})

import { atom } from 'recoil'

export interface LogoutState {
 currentUserLoggedOut: boolean,
}

const defaultState: LogoutState = {
   currentUserLoggedOut: true
}

export const currentUserLogoutState = atom<LogoutState>({
  key: "currentUserLogoutState",
  default: defaultState
})
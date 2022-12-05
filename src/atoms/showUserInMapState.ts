import { atom } from 'recoil'

export interface ShowUserInMapState {
  show: boolean,
  x: number,
  y: number
}

const defaultState: ShowUserInMapState = {
  show: false,
  x: 0,
  y: 0
}

export const showUserInMapState = atom<ShowUserInMapState>({
  key: "showUserInMapState",
  default: defaultState
})

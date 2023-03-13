import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export interface CurrentUserState {
  id: string,
  status: string,
  online: string,
  email: string,
  userPosX: number,
  userPosY: number,
  spaceId: string
}

const defaultState: CurrentUserState = {
  id: '',
  status: '',
  online: '',
  email: '',
  userPosX: 0,
  userPosY: 0,
  spaceId: ''
}

export const currentUserState = atom<CurrentUserState>({
  key: "currentUserState",
  default: defaultState,
  effects_UNSTABLE: [persistAtom]
})

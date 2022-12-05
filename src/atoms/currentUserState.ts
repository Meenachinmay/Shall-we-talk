import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export interface CurrentUserState {
  id: string,
  status: string,
  online: string,
  email: string
}

const defaultState: CurrentUserState = {
  id: '',
  status: '',
  online: '',
  email: ''
}

export const currentUserState = atom<CurrentUserState>({
  key: "currentUserState",
  default: defaultState,
  effects_UNSTABLE: [persistAtom]
})

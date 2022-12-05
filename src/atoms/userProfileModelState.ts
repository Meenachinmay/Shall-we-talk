import { atom } from 'recoil'

export interface ProfileModelState {
  open: boolean,
  loadingProfileInModel: boolean
}

const defaultState: ProfileModelState = {
  open: false,
  loadingProfileInModel: false
}

export const profileModelState = atom<ProfileModelState>({
  key: "profileModelState",
  default: defaultState
})

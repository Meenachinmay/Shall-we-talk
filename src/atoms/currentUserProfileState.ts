import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

export interface CurrentUserProfileState {
  id: string,
  name: string,
  status: string,
  profileImage: string,
  companyName: string,
  companyProfile: string,
  workProfile: string,
  pr: string,
  pet: string,
  hobbies: string
}

const defaultState: CurrentUserProfileState = {
  id: '',
  name: '',
  status: '',
  profileImage: '',
  companyName: '',
  companyProfile: '',
  workProfile: '',
  pr: '',
  pet: '',
  hobbies: ''
}

export const currentUserProfileState = atom<CurrentUserProfileState>({
  key: "currentUserProfileState",
  default: defaultState,
  effects_UNSTABLE: [persistAtom]
})

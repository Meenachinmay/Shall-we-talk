import { atom } from 'recoil'

export interface UserProfileState {
  id: string,
  name: string,
  email: string,
  profileImage: string,
  companyName: string,
  companyProfile: string,
  workProfile: string,
  pr: string,
  pet: string,
  hobbies: string,
  status: string
}

const defaultState: UserProfileState = {
  id: '',
  name: '',
  email: '',
  profileImage: '',
  companyName: '',
  companyProfile: '',
  workProfile: '',
  pr: '',
  pet: '',
  hobbies: '',
  status: ''
}

export const userProfileState = atom<UserProfileState>({
  key: "userProfileState",
  default: defaultState
})

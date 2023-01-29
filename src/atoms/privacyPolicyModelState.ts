import { atom } from 'recoil'

export interface PrivacyPolicyModelState {
 open: boolean,
}

const defaultState: PrivacyPolicyModelState = {
  open: false,
}

export const privacyPolicyModelState = atom<PrivacyPolicyModelState>({
  key: "privacyPolicyModelState",
  default: defaultState
})

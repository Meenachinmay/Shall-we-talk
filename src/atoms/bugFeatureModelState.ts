import { atom } from 'recoil'

export interface BugFeatureModelState {
 open: boolean,
}

const defaultState: BugFeatureModelState = {
  open: false,
}

export const bugFeatureModelState = atom<BugFeatureModelState>({
  key: "bugFeatureModelState",
  default: defaultState
})


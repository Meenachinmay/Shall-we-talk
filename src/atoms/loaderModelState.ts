import { atom } from 'recoil'

export interface LoaderModelState {
 open: boolean,
}

const defaultState: LoaderModelState = {
  open: false,
}

export const loaderModelState = atom<LoaderModelState>({
  key: "loaderModelState",
  default: defaultState
})


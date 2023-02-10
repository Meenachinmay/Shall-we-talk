import { atom } from 'recoil'

export interface ImageViewModelState {
  open: boolean
}

const defaultState:ImageViewModelState = {
  open: false
}

export const imageViewModelState = atom<ImageViewModelState>({
  key: "imageViewModelState",
  default: defaultState
})
import { atom } from 'recoil'

export interface SearchInputState {
    searchText: String
}

const defaultState: SearchInputState = {
    searchText: ""
}

export const searchInputState = atom<SearchInputState>({
  key: "searchInputState",
  default: defaultState
})

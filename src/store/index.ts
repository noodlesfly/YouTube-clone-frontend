import { getItem, setItem } from '@/utils/useStorage'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import { InjectionKey } from 'vue'
import type { ResUser } from '@/service/types/user'

const state = {
  user: getItem('youtube-user') || null as (ResUser | null)
}

export type State = typeof state

export const key: InjectionKey<Store<State>> = Symbol('store')

// 定义自己的 `useStore` 组合式函数
export function useStore () {
  return baseUseStore(key)
}

export const store = createStore<State>({
  state,
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setItem('youtube-user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})

import { defineStore } from 'pinia'
export const usePersistStore = defineStore('persistStore', {
  state: () => ({
    token: ''
  }),
  persist: true
})

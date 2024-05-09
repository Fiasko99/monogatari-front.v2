import { defineStore } from 'pinia'

export const userStore = defineStore('user', {
  state: () => ({
    user: {},
    character: {}
  }),
  getters: {
    getAuthStatus(state) {
      return Object.keys(state.user).length > 0
    },
    data(state) {
      return state.user
    },
    activeCharacter(state) {
      const existActiveCharacter = Object.keys(state.character).length > 0
      if (!existActiveCharacter) {
        return undefined
      }
      return state.character
    }
  },
  actions: {
    fieldUser(data = {}) {
      this.user = data
      if (data.characters) {
        this.user.characters.forEach((character) => {
          this.fieldCharacter(character)
        })
      } else {
        this.character = {}
      }
    },
    fieldCharacter(data = {}) {
      if (data.active) {
        this.character = data
      }
    }
  }
})

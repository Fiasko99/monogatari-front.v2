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
          if (character.active) {
            this.character = character
          }
        })
      }
    },
    fieldCharacter(data = {}) {
      this.character = data
    }
  }
})

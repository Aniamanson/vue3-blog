import { defineStore } from 'pinia'

interface ErrorState {
  currentError: string,
  currentPlace: string
}

export const useErrors = defineStore('errors', {
  state: (): ErrorState => ({
    currentError: '',
    currentPlace: ''
  }),
  actions: {
    setError(error: ErrorState) {
      this.currentError = error.currentError
      this.currentPlace = error.currentPlace
    }
  }
})

import { defineStore } from 'pinia'
import { NewUser } from '../users'
import axios from 'axios'
import { useErrors } from './error'
import { Post } from '../data/posts'
import moment from 'moment'

interface UsersState {
  currentUserId?: string
}

export const useUsers = defineStore('users', {
  state: (): UsersState => ({
    currentUserId: undefined
  }),
  actions: {
    async authentication () {
      try {
        const result =  await axios.get('/api/current-user')
        this.currentUserId = result.data.id
      } catch (e) {
        this.currentUserId = undefined
      }
    },
    async login (newUser: NewUser) {
      try {
        await axios.post('/api/login', newUser)
        await this.authentication()
        return true
      }
      catch (e: any) {
        if ([401, 404].includes(e.response.status)) {
          useErrors().setError({
            currentError: 'Username or password was incorrect',
            currentPlace: 'login'
          })
        }
        console.log(e)
        return false
      }
    },
    async createUser (newUser: NewUser) {
      try {
        await axios.post('/api/users', newUser)
        await this.authentication()
      }
      catch (e) {
        console.log(e)
      }
    },
    async logout () {
      await axios.post('/api/logout')
      await this.authentication()
    },
    async getUser (id: string) {
      try {
        const response = await axios.get(`/api/get-user/${id}`)
        return response.data.username as string
      } catch (e) {
        console.log(e)
        return false
      }
    }
  }
})

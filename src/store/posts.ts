import { defineStore } from 'pinia'
import { Post, TimeLinePost } from '../data/posts'
import { Period } from "../constants"
import moment from 'moment'
import axios from 'axios'

interface PostsState {
  ids: String[],
  all: Map<string, Post>,
  selectedPeriod: Period,
  selectedPost: string
}

function delay () {
  return new Promise<void>(resolve => setTimeout(resolve, 500))
}

export const usePosts = defineStore('posts', {
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: 'Today',
    selectedPost: ''
  }),
  actions: {
    async fetchPosts () {
      const response = await axios.get('/api/posts')
      await delay()
      let ids: string[] = []
      let all = new Map<string, Post>()
      for (const post of response.data) {
        ids.push(post.id)
        all.set(post.id, post)
      }
      this.ids = ids
      this.all = all
    },

    setSelectedPeriod (period: Period) {
      this.selectedPeriod = period
    },

    async createPost (post: Post) {
      const data = {
        ...post,
        created: post.created.toISOString()
      }
      return await axios.post('/api/posts', data)
    },

    async updatePost (post: Post) {
      return await axios.put('/api/posts', post)
    },

    async deletePost () {
      if (this.selectedPost) {
        return await axios.delete(`/api/posts/${this.selectedPost}`)
      }
    }
  },
  getters: {
    filteredPosts: (state): Post[] => {
      return state.ids
        .map(id => state.all.get(id))
        .filter(post => {
        if (state.selectedPeriod === 'Today') {
          return moment(post.created) >= moment().subtract(1, 'days')
        } else if (state.selectedPeriod === 'This week') {
          return moment(post.created) >= moment().subtract(1, 'weeks')
        } else {
          return post
        }
      })
    }
  }
})

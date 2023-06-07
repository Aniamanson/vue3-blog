import moment from 'moment'

export interface Post {
  id: string,
  authorID: string,
  title: string,
  created: string | Date,
  markdown: string,
  html: string,
  img: string
}

export interface TimeLinePost extends Omit<Post, 'created'> {
  created: Date
}

export const today = <Post>{
  id: '1',
  authorID: '-1',
  title: 'Today',
  created: new Date().toUTCString(),
  markdown: '',
  html: '',
  img: ''
}

export const thisWeek = <Post>{
  id: '2',
  authorID: '-1',
  title: 'This Week',
  created: moment().subtract(5, 'days').toISOString(),
  markdown: '',
  html: '',
  img: ''
}

export const thisMonth = <Post>{
  id: '3',
  authorID: '-1',
  title: 'This Month',
  created: moment().subtract(3, 'weeks').toISOString(),
  markdown: '',
  html: '',
  img: ''
}

import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { thisMonth, thisWeek, today, Post } from '../data/posts'
import { User } from '../users'
import { readPosts } from './posts'
import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'

const app = express()
app.use(cors({
  origin: '*'
}))
app.use(bodyParser.json())
app.use(cookieParser())

const allPosts: Post[] = []
const allUsers: User[] = [
  {
    id: '-1',
    username: 'Admin',
    password: '123Qzx'
  },
  {
    id: '1',
    username: 'Anna_V',
    password: '123QWE'
  }
]

app.get('/posts', (req, res) => {
  res.json(allPosts)
})

app.post('/posts', (req, res) => {
  const post = {
    ...req.body,
    id: (Math.random() * 10000).toFixed()
  }
  allPosts.push(post)
  res.json(post)
})

app.put('/posts', (req, res) => {
    const index = allPosts.findIndex(x => x.id === req.body.id)
    if (index === -1) {
      throw Error(`Post with id ${req.body.id} not found`)
    }
    allPosts[index] = {...allPosts[index], ...req.body}
    res.json(allPosts[index])
})

app.delete('/posts/:id', (req, res) => {
    const index = allPosts.findIndex(x => x.id === req.params.id)
    if (index === -1) {
      throw Error(`Post with id ${req.body.id} not found`)
    }
    allPosts.splice(index, 1);
    res.status(200).end()
})

const SECRET = 'my-secret-key'
const COOKIE = 'vuejs-jwt'

function authenticate (id: string, req: Request, res: Response) {
  const token = jsonwebtoken.sign({ id }, SECRET, {
    issuer: 'vuejsBlog',
    expiresIn: '30 days'
  })
  res.cookie(COOKIE, token, {httpOnly: true})
}

app.get('/current-user', (req, res) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jsonwebtoken.verify(token, SECRET) as { id: string }
    res.json({ id: result.id })
  } catch (e) {
    res.status(404).end()
  }
})

app.get('/get-user/:id', (req, res) => {
  try {
    const targetUser = allUsers.find(user => user.id === req.params.id)
    if (targetUser) {
      res.json({ 'username': targetUser.username })
      res.status(200).end()
    }
  } catch (e) {
    res.status(404).end()
  }
})

app.post('/logout', (req, res) => {
  res.cookie(COOKIE, '', {httpOnly: true})
  res.status(200).end()
})

app.post('/login', (req, res) => {
  const targetUser = allUsers.find(user => user.username === req.body.username)
  if (!targetUser || targetUser.password !== req.body.password) {
    res.status(401).end()
  } else {
    authenticate(targetUser.id, req, res)
    res.status(200).end()
  }
})

app.post('/users', (req, res) => {
  const user = {
    ...req.body,
    id: (Math.random() * 10000).toFixed()
  }
  allUsers.push(user)

  authenticate(user.id, req, res)

  const { password, ...rest } = user
  res.json(rest)
})

async function start() {
  const demoPosts = await readPosts();
  allPosts.push(...demoPosts);

  app.listen(8800, () => {
    console.log("Listening on port 8800");
  });
}

start();

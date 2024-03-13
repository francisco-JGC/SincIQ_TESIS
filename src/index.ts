import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import * as fs from 'fs'
import * as path from 'path'
import { AppDataSource } from './config/database.config'
import { eventEmitter as emitterWhatsapp } from './controllers/whatsapp.controller'
import { eventEmitter as emitterBot } from './services/whatsapp.service'

const app = express()
let server = null

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors())

const port = process.env.PORT || 3001

fs.readdirSync(path.join(__dirname, 'routes')).map(async (file) => {
  const { default: route } = await import(`./routes/${file}`)
  const [routeName] = file.split('.')
  app.use(`/api/${routeName}`, route)
})

async function main() {
  try {
    await AppDataSource.initialize()
  } catch (error: any) {
    console.log(error.message)
  }
}

main()

server = app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  emitterWhatsapp.on('received-message', (data) => {
    socket.emit('server:receive-message', data)
  })

  emitterBot.on('sending-message', (data) => {
    console.log('sending-message', data)
    socket.emit('server:sending-message', data)
  })
})

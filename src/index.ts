import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import * as fs from 'fs'
import * as path from 'path'
import { AppDataSource } from './config/database.config'

const app = express()
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
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error: any) {
    console.log(error.message)
  }
}

main()

import 'dotenv/config'

import express from 'express'
import * as fs from 'fs'
import * as path from 'path'
import { AppDataSource } from './config/database.config'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 3000

fs.readdirSync(path.join(__dirname, 'routes')).map(async (file) => {
  const { default: route } = await import(`./routes/${file}`)
  const [routeName] = file.split('.')
  app.use('/' + routeName, route)
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

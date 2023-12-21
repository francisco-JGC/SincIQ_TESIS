import express from 'express'
import dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
dotenv.config()

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

fs.readdirSync(path.join(__dirname, 'routes')).map(async (file) => {
  const { default: route } = await import(`./routes/${file}`)
  const [routeName] = file.split('.')
  app.use('/' + routeName, route)
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

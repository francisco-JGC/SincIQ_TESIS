import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

const app = express()
app.use(express.json())

const port = process.env.PORT || 3000

fs.readdirSync(path.join(__dirname, 'routes')).map(async (file) => {
  const { default: route } = await import(`./routes/${file}`)
  const [routeName] = file.split('.')
  app.use('/api/' + routeName, route)
})

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`)
})

const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const { CONNECTDB } = require('./config/db.js')
const peopleRoute = require('./routes/peoplesRoute.js')
const childrensRoute = require('./routes/childrensRoute.js')

const app = express()
const PORT = 3000

CONNECTDB()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/people', peopleRoute)
app.use('/api/children', childrensRoute)

// GET ERROR URL
app.get('*', (req, res, next) => {
  const error = new Error('pagina no encontrada')
  next(error)
})
app.use((error, req, res, next) => {
  res.status(500).send(error.message)
})
//END ERROR URL

app.listen(PORT, () => console.log(`Running in PORT: "${PORT}"`))

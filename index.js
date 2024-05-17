//Realizamos los requires
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const { CONNECTDB } = require('./config/db.js')
const {
  allPeople,
  registerPeople,
  updatePeople,
  deletePeople
} = require('./controllers/familyControllers.js')
const {
  allChildren,
  registerChildren
} = require('./controllers/childrenControllers.js')

const app = express()
const PORT = 3000

CONNECTDB()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//ROUTES PEOPLE
app.get('/', allPeople)
app.post('/register', registerPeople)
app.put('/edit/:_id', updatePeople)
app.delete('/delete/:_id', deletePeople)
//END ROUTES PEOPLE
//ROUTES CHILDRENS
app.get('/children', allChildren)
app.post('/children/register', registerChildren)
//END ROUTES CHILDRENS

// GET ERROR URL
app.get('*', (req, res, next) => {
  const error = new Error('pagina no encontrada')
  error.status = 404
  next(error)
})
app.use((error, req, res, next) => {
  res.status(500).send(error.message)
})
//END ERROR URL

app.listen(PORT, () => console.log(`Running in PORT: "${PORT}"`))

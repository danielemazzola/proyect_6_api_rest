const express = require('express')
const ROUTER = express.Router()
const {
  allPeople,
  registerPeople,
  updatePeople,
  deletePeople
} = require('../controllers/familyControllers.js')

ROUTER.get('/', allPeople)
ROUTER.post('/register', registerPeople)
ROUTER.put('/edit/:_id', updatePeople)
ROUTER.delete('/delete/:_id', deletePeople)

module.exports = ROUTER

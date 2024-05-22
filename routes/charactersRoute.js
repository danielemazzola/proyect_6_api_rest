const express = require('express')
const ROUTER = express.Router()
const {
  allCharacters,
  registerCharacter,
  updateCharacter,
  deleteCharacter
} = require('../controllers/charactersControllers.js')

ROUTER.get('/', allCharacters)
ROUTER.post('/register', registerCharacter)
ROUTER.put('/edit/:_id', updateCharacter)
ROUTER.delete('/delete/:_id', deleteCharacter)

module.exports = ROUTER

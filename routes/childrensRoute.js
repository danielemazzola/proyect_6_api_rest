const express = require('express')
const ROUTER = express.Router()
const {
  allChildren,
  registerChildren,
  updateChildren,
  deleteChildren
} = require('../controllers/childrenControllers.js')

ROUTER.get('/', allChildren)
ROUTER.post('/register', registerChildren)
ROUTER.put('/update/:_id', updateChildren)
ROUTER.delete('/delete/:_id', deleteChildren)

module.exports = ROUTER

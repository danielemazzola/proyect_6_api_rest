require('dotenv').config()
const { People } = require('../../models/Family')
const mongoose = require('mongoose')

const family = [
  {
    userName: 'Vegeta',
    alias: 'príncipe',
    name: 'Carlos',
    age: '30'
  },
  {
    userName: 'Goku',
    alias: 'guerrero',
    name: 'Jose',
    age: '31'
  },
  {
    userName: 'Piccolo',
    alias: 'maestro',
    name: 'Luis',
    age: '35'
  },
  {
    userName: 'Chichi',
    alias: 'madre',
    name: 'Marta',
    age: '27'
  },
  {
    userName: 'Trunks',
    alias: 'viajero',
    name: 'Hugo',
    age: '14'
  }
]

mongoose
  .connect(process.env.DB_URL)
  .then(async () => {
    const allPeople = await People.find()
    if (allPeople.length) {
      await People.collection.drop()
    }
  })
  .catch((err) => console.log(`Error deleting data: ${err}`))
  .then(async () => {
    await People.insertMany(family)
  })
  .catch((err) => console.log(`Error creating data: ${err}`))
  // Por último nos desconectaremos de la DB.
  .finally(() => mongoose.disconnect())

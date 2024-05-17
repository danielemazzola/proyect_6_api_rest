const mongoose = require('mongoose')

const CONNECTDB = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`)
    console.log(`
    **     **  ******   **      **  ******   ******
    ***   *** **    **  ***     ** **    ** **    **
    **** ****/**      * ****    **/**      /**      *
    ** *** **/**      * ** **   **/**      /**      *
    **     **/**      * **  **  **/** *****/**      *
    **     ** **    **  **   ** **/**    ** **    **
    **     **  ******   **    ****  *******  ****** 
`)
  } catch (error) {
    console.log(`$Hubo un error: ${error}`)
  }
}
module.exports = { CONNECTDB }

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const characterSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    alias: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true,
      trim: true
    },
    idChildrens: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Children',
        required: false
      }
    ]
  },
  {
    timestamps: true
  }
)
const Character = mongoose.model('Character', characterSchema)
module.exports = { Character }

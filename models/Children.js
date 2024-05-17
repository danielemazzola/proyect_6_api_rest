const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ChildrenSchema = new Schema(
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
    idParent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'People',
      required: true
    }
  },
  {
    timestamps: true
  }
)
const Children = mongoose.model('Children', ChildrenSchema)
module.exports = { Children }

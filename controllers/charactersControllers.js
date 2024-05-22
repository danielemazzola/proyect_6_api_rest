const { Character } = require('../models/Characters')
const { Children } = require('../models/Children')

//GET ALL USERS
const allCharacters = async (req, res, next) => {
  const OK = 'Todos los usuarios aqui😎'
  const KO = 'No hay usuarios aún registrados😢'
  try {
    const character = await Character.find().populate({
      path: 'idChildrens',
      select: 'userName'
    })
    if (character.length <= 0) {
      return res.status(200).json({ message: KO })
    } else {
      return res.status(200).json({ message: OK, character })
    }
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

//CRETAE NEW USER
const registerCharacter = async (req, res, next) => {
  const KO = 'Ya existe el username, prueba con otro😉'
  const KO_AGE = 'Eres menor de edad😉'
  const OK = 'Usuario creado😎'
  try {
    const { userName, age } = req.body
    const existcharacter = await Character.findOne({ userName })
    if (existcharacter) return res.status(400).json({ message: KO })
    if (age < 18) return res.status(400).json({ message: KO_AGE })
    const newCharacter = new Character(req.body)
    const saveCharacter = await newCharacter.save()
    return res.status(201).json({ message: OK, saveCharacter })
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

//UPDATE USER
const updateCharacter = async (req, res, next) => {
  const ERROR = 'El usuario no existe😂'
  const OK = 'Usuario modificado😉'
  try {
    const { _id } = req.params
    const existCharacter = await Character.findById(_id)
    if (!existCharacter) return res.status(404).json({ message: ERROR })
    const update = {
      userName:
        req.body.userName !== undefined
          ? req.body.userName
          : existCharacter.userName,
      alias:
        req.body.alias !== undefined ? req.body.alias : existCharacter.alias,
      name: req.body.name !== undefined ? req.body.name : existCharacter.name,
      age: req.body.age !== undefined ? req.body.age : existCharacter.age,
      agidChildrense:
        req.body.agidChildrense !== undefined
          ? [...existCharacter.idChildrens, req.body.agidChildrense]
          : [existCharacter.agidChildrense]
    }
    const updateCharacter = await Character.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    })
    return res.status(200).json({ message: OK, updateCharacter })
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

//DELETE USER
const deleteCharacter = async (req, res, next) => {
  const ERROR = 'El usuario no existe😂'
  const OK = 'Usuario Eliminado y si tenia hijos, se han ido con el.😒'
  try {
    const { _id } = req.params
    const deleteCharacter = await Character.findByIdAndDelete(_id)
    if (!deleteCharacter) return res.status(404).json({ message: ERROR })
    const childrens = await Children.find().where('idParent').equals(_id)
    // DELETE CHILDRENS
    if (childrens.length) {
      childrens.map(async (val) => {
        await Children.findByIdAndDelete(val._id)
      })
    }
    // END DELETE CHILDRENS
    return res.status(200).json({ message: OK })
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

module.exports = {
  allCharacters,
  registerCharacter,
  updateCharacter,
  deleteCharacter
}

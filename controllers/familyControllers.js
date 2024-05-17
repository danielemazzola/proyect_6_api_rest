const { People } = require('../models/Family')
const { Children } = require('../models/Children')

//GET ALL USERS
const allPeople = async (req, res, next) => {
  const OK = 'Todos los usuarios aqui😎'
  const KO = 'No hay usuarios auún registrados😢'
  try {
    const peoples = await People.find().populate({
      path: 'idChildrens',
      select: 'userName'
    })
    if (peoples.length <= 0) {
      return res.status(200).json({ message: KO })
    } else {
      return res.status(200).json({ message: OK, peoples })
    }
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

//CRETAE NEW USER
const registerPeople = async (req, res, next) => {
  const KO = 'Ya existe el username, prueba con otro😉'
  const KO_AGE = 'Eres menor de edad😉'
  const OK = 'Usuario creado😎'
  try {
    const { userName, age } = req.body
    const existUserName = await People.findOne({ userName })
    if (existUserName) return res.status(400).json({ message: KO })
    if (age < 18) return res.status(400).json({ message: KO_AGE })
    const newPeople = new People(req.body)
    const saveUser = await newPeople.save()
    return res.status(201).json({ message: OK, saveUser })
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

//UPDATE USER
const updatePeople = async (req, res, next) => {
  const ERROR = 'El usuario no existe😂'
  const OK = 'Usuario modificado😉'
  try {
    const { _id } = req.params
    const existPeople = await People.findById(_id)
    if (!existPeople) return res.status(404).json({ message: ERROR })
    const updatePeople = await People.findByIdAndUpdate(_id, req.body, {
      new: true
    })
    return res.status(200).json({ message: OK, updatePeople })
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

//DELETE USER
const deletePeople = async (req, res, next) => {
  const ERROR = 'El usuario no existe😂'
  const OK = 'Usuario Eliminado y si tenia hijos, se han ido con el.😒'
  try {
    const { _id } = req.params
    const childrens = await Children.find().where('idParent').equals(_id)
    // DELETE CHILDRENS
    if (childrens.length) {
      childrens.map(async (val) => {
        await Children.findByIdAndDelete(val._id)
      })
    }
    // END DELETE CHILDRENS
    const deletePeople = await People.findByIdAndDelete(_id)
    if (!deletePeople) return res.status(404).json({ message: ERROR })
    return res.status(200).json({ message: OK })
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

module.exports = {
  allPeople,
  registerPeople,
  updatePeople,
  deletePeople
}

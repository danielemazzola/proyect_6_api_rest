const { Children } = require('../models/Children')
const { People } = require('../models/Family')

//GET ALL USERS
const allChildren = async (req, res, next) => {
  const OK = 'Todos los niños aqui👶👧'
  const KO = 'No hay niños aún registrados😢'
  try {
    const childrens = await Children.find()
    if (childrens.length <= 0) {
      return res.status(200).json({ message: KO })
    } else {
      return res.status(200).json({ message: OK, childrens })
    }
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

//CRETAE NEW USER
const registerChildren = async (req, res, next) => {
  const KO = 'Ya existe el username, prueba con otro😉'
  const KOPARENT = 'Su familiar no existe, es huérfano?🤔'
  const OK = 'Usuario creado😎'
  try {
    const { userName, parent } = req.body
    const parentFamily = await People.findOne({ userName: parent })
    if (!parentFamily) return res.status(400).json({ message: KOPARENT })
    const existUserName = await Children.findOne({ userName })
    if (existUserName) return res.status(400).json({ message: KO })

    const newChildren = new Children({
      userName: req.body.userName,
      alias: req.body.alias,
      name: req.body.name,
      age: req.body.age,
      idParent: parentFamily._id
    })
    const saveChildren = await newChildren.save()
    parentFamily.idChildrens = [...parentFamily.idChildrens, saveChildren._id]
    await parentFamily.save()
    return res.status(201).json({ message: OK, saveChildren })
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}

module.exports = {
  allChildren,
  registerChildren
}

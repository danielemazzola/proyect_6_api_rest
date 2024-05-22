const { Children } = require('../models/Children')
const { Character } = require('../models/Characters')

const allChildren = async (req, res, next) => {
  const OK = 'Todos los niños aqui👶👧'
  const KO = 'No hay niños aún registrados😢'
  try {
    const childrens = await Children.find().populate('idParent')
    if (childrens.length <= 0) {
      return res.status(200).json({ message: KO })
    } else {
      return res.status(200).json({ message: OK, childrens })
    }
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}
const registerChildren = async (req, res, next) => {
  const KO = 'Ya existe el username, prueba con otro😉'
  const KO_PARENT = 'Su familiar no existe, es huérfano?🤔'
  const OK = 'Usuario creado😎'
  try {
    const { userName, parent } = req.body
    const parentCharacter = await Character.findOne({ userName: parent })
    if (!parentCharacter) return res.status(400).json({ message: KO_PARENT })
    const existUserName = await Children.findOne({ userName })
    if (existUserName) return res.status(400).json({ message: KO })
    const newChildren = new Children({
      userName: req.body.userName,
      alias: req.body.alias,
      name: req.body.name,
      age: req.body.age,
      idParent: parentCharacter._id
    })
    const saveChildren = await newChildren.save()
    parentCharacter.idChildrens = [
      ...parentCharacter.idChildrens,
      saveChildren._id
    ]
    await parentCharacter.save()
    return res.status(201).json({ message: OK, saveChildren })
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}
const updateChildren = async (req, res) => {
  try {
    const { _id } = req.params
    const existChildren = await Children.findById(_id)
    if (!existChildren) return res.status(400).json('NOT EXIST CHILDREN')
    if (req.body.userName || req.body.parent)
      return res.status(409).json('NOT POSIBLE CHANGE USERNAME OR PARENT')
    const updateChildren = await Children.findByIdAndUpdate(_id, req.body, {
      new: true
    })
    return res.status(201).json(updateChildren)
  } catch (error) {
    return res.status(400).json(`Error en la petición: ${error}`)
  }
}
const deleteChildren = async (req, res) => {
  const { _id } = req.params
  const existChildren = await Children.findById(_id)
  if (!existChildren) return res.status(404).json('NOT EXIST CHILDREN')
  const parent = await Character.findById(existChildren.idParent)
  if (!parent)
    return res.status(404).json('THERE WAS A PROBLEM, PLEASE TRY AGAIN')
  parent.idChildrens = parent.idChildrens.filter(
    (childId) => childId.toString() !== _id
  )
  await parent.save()
  await Children.findByIdAndDelete(_id)
  res.status(200).json('CHILD REMOVED FROM PARENT SUCCESSFULLY')
}

module.exports = {
  allChildren,
  registerChildren,
  updateChildren,
  deleteChildren
}

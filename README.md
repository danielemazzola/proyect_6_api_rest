# 🎸 Proyecto 6 Rock the Code 🎸

## 🚀 Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**

## 📦 Dependencies

```
"dependencies": {
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "mongoose": "^8.3.5"
  },
"devDependencies": {
    "nodemon": "^3.1.0"
  }
```

## 📜 Scripts

- `start`: `node index.js`
- `dev`: `nodemon index.js`
- `seed`: `node ./utils/seed/familySeed.js`

The `npm run seed` script adds 5 people to the database.

## 🌐 API Routes

### Personas

- **Base URL**: `/api/people`
  - `GET /`: Fetch all people (`allPeople`)
  - `POST /register`: Register a new person (`registerPeople`)
  - `PUT /edit/:_id`: Update a person by ID (`updatePeople`)
  - `DELETE /delete/:_id`: Delete a person by ID (`deletePeople`)

### Children

- **Base URL**: `/api/children`
  - `GET /`: Fetch all children (`allChildren`)
  - `POST /register`: Register a new child (`registerChildren`)
  - `PUT /update/:_id`: Update a child by ID (`updateChildren`)
  - `DELETE /delete/:_id`: Delete a child by ID (`deleteChildren`)

## 📄 Sample Data

### Create a Person

To create a person, send the following JSON payload:

```
{
  "userName": "Piccolo",
  "alias": "Maestro",
  "name": "Juan Carlos",
  "age": 18
}
```

> Note: Age must be greater than 18.

### Create a Child

To create a child, send the following JSON payload:

```json
{
  "userName": "Krillin",
  "alias": "Guerrero",
  "name": "LUIS",
  "age": 12,
  "parent": "Piccolo"
}
```

> Note: The `parent` field must match the `userName` of an existing person, otherwise an error will occur.

## 👨‍💻 Author

Work done by Daniele Mazzola

🔗 [GitHub Repository](https://github.com/danielemazzola/proyect_6_api_rest)

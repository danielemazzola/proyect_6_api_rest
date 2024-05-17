# ROCK THE CODE PROYECT 6

## CRUD API Rest

For the creation of my REST API, I have decided on the theme of Dragon Ball Z Families.

My initial idea is that adults can register, and once they exist in the database, their children can be registered.

In case something fails, an error will be shown depending on the case.

We can view all characters, create new characters, edit them, and delete them, keeping in mind that if they have children, their children will also be deleted.

## Features

The routes for the API requests are:

### ROUTES PEOPLE:

app.get('/', allPeople), Get all Characters + populate them with their children, extracting the username of each child..

app.post('/register', registerPeople), Register Characters.

app.put('/edit/:\_id', updatePeople), Edit Characters.

app.delete('/delete/:\_id', deletePeople), Delet Characters.

### ROUTES CHILDRENS:

app.get('/children', allChildren), Get all Characters.

app.post('/children/register', registerChildren), register Characters.

## The commands to start the project:

npm run start: "node index.js".

npm run dev: "nodemon index.js".

seed": "node utils/seed/family.seed.js".

## CONDITIONS TO REGISTER

To input data into the Family model, the userName is considered a unique identifier and should be older than 18 years old.

For children, to input data into the Children model, the userName is considered a unique identifier and should be saved with one of their parents, by inputting their userName.

Powered by Daniele Mazzola

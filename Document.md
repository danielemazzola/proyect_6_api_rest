# ROCK THE CODE PROYECT 6

## CRUD API Rest

For the creation of my REST API, I have decided on the theme of Dragon Ball Z Families.

My initial idea is that adults can register, and once they exist in the database, their children can be registered.

In case something fails, an error will be shown depending on the case.

We can view all characters, create new characters, edit them, and delete them, keeping in mind that if they have children, their children will also be deleted.

## Features

The routes for the API requests are:

//ROUTES PEOPLE
-app.get('/', allPeople) _Get all Characters_
-app.post('/register', registerPeople) _Register Characters_
Example:
{
"userName": "Crillin",
"alias": "príncipe",
"name": "Carlos",
"age": "18"
}
-app.put('/edit/:\_id', updatePeople) _Edit Characters_
-app.delete('/delete/:\_id', deletePeople) _Delet Characters_
//END ROUTES PEOPLE

//ROUTES CHILDRENS
-app.get('/children', allChildren) _Get all Characters_
-app.post('/children/register', registerChildren) _register Characters_
Example:
{
"userName":"Marron",
"alias":"hija",
"name":"Fernanda",
"age":"8",
"parent":"Crillin"
}
//END ROUTES CHILDRENS

```sh
API KEY:
DB_URL
mongodb+srv://mazzoladaniele:firstbbdd@cluster0.fewxfsi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

## The commands to start the project:

-npm run start: "node index.js",
-npm run dev: "nodemon index.js" _RECOMMENDED_
-seed": "node utils/seed/family.seed.js"

## CONDITIONS TO REGISTER

To input data into the Family model, the userName is considered a unique identifier and should be older than 18 years old.

For children, to input data into the Children model, the userName is considered a unique identifier and should be saved with one of their parents, by inputting their userName.

Powered by Daniele Mazzola

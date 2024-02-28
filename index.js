import express from 'express';
import bodyParser from 'body-parser';
import { createUser, deleteUser, getUserById, getUsers, server, updateUser } from './queries.js';

const app = express();

app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', server)

app.get('/allUsers', getUsers);
app.get('/users/:id', getUserById);
app.post('/addUser', createUser);
app.put('/updateUser/:id', updateUser);
app.delete('/deleteUser/:id', deleteUser)


const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})
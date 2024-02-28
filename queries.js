import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api',
    password: 'root',
    port: 5432
})

export const server = (request, response) => {
    // response.send('Server is running properly');
    response.json({ info: 'Node JS, Express and Postgres' })
}

// get all users
export const getUsers = (request, response) => {
    pool.query('SELECT * FROM public.users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// get single user by id
export const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

// Post new user
export const createUser = (request, response) => {
    // const name = request.body.name
    const { name, email } = request.body;
    pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
        if (error) {
            throw error;
        }
        // response.status(200).json(results.rows)
        response.status(201).send(`Users added with id: ${results.rows[0].id}`)
    })
}

//Update PUT user by id
export const updateUser = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;

    pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [name, email, id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User modified with ID: ${id}`)
    })
}

//Delete user by id
export const deleteUser = (request, response) => {
    const id = parseInt(request.params.id);

    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}



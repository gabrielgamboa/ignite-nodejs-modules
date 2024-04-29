import { Database } from '../database.js'
import { randomUUID } from 'node:crypto'

const database = new Database()

export class UserController {
    getAll(req, res) {
        const { search } = req.query
        const users = database.selectAll('users', search ? {
            name: search,
            email: search
        }: null);
        return res
            .end(JSON.stringify(users))
    }

    insert(req, res) {
        const { name, email } = req.body

        const user = {
            id: randomUUID(),
            name,
            email
        }

        database.insert('users', user)

        return res.writeHead(201).end()
    }

    delete(req, res) {
        const { id } = req.params;

        database.delete('users', id)

        return res.writeHead(204).end()
    }

    update(req, res) {
        const { id } = req.params;
        const { name, email } = req.body

        database.update('users', id, {
            email,
            name
        })

        return res.writeHead(204).end()


    }
}
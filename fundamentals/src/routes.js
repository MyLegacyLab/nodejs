import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'
import { routePath } from "./utils/route-path.js"

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: routePath('/health'),
        handler: (req, res) => {
            return res.end('ALive!')
        }
    },
    {
        method: 'GET',
        path: routePath('/users'),
        handler: (req, res) => {
            const {search} = req.query

            const users = database.select('users', {
                name: search,
                email: search,
            })

            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: routePath('/users'),
        handler: (req, res) => {
            const {name, email} = req.body
            const user = {
                id: randomUUID(),
                name,
                email,
            }
            database.insert('users', user)
            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: routePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params

            database.delete('users', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: routePath('/users/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { name, email } = req.body

            database.update('users', id, {
                name,
                email
            })

            return res.writeHead(204).end()
        }
    }
]
import { Database } from "../database.js";

const database = new Database();

export class TasksController {
    create(req, res) {
        const { title, description /* completed_at, created_at, updated_at*/} = req.body;
        console.log(title, description)
        database.insert('tasks', {
            title,
            description,
        })

        return res.writeHead(204).end()
    }
}
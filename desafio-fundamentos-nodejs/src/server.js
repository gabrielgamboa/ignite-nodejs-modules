import http from 'node:http';
import { json } from './middlewares/json.js';
import { TasksController } from './controllers/tasks-controller.js';

const server = http.createServer(async (req, res) => {
    const { method, url } = req

    await json(req, res);

    if (method === 'POST' && url === '/tasks') {
        const tasksController = new TasksController();
        tasksController.create(req, res)
    }
})

server.listen(3333)
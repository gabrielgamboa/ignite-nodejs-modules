import { UserController } from "./handlers/usersController.js"
import { buildRoutePath } from "./utils/build-route-path.js";

const userController = new UserController();

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => userController.getAll(req, res)
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => userController.insert(req, res)
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => userController.delete(req, res)
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => userController.update(req, res)
    },
]
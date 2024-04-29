import fs from 'node:fs/promises'

const databasePath = new URL('../db.json', import.meta.url)
 
export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePath, 'utf-8')
            .then(data => {
                this.#database = JSON.parse(data);
            })
            .catch(() => {
                this.#persist();
            })
    }

    #persist() {
        fs.writeFile(databasePath, JSON.stringify(this.#database));
    }

    selectAll(table, search) {
        let data = this.#database[table] ??  []

        if (search) {
            data = data.filter((row) => {
                return Object.entries(search).some(([key, value]) => {
                    return row[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }

        return data;
    }

    insert(table, data) {
        if (this.#database[table] && Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()
    }

    delete(table, id) {
        const dataIndex = this.#database[table].findIndex(row => row.id === id)

        if (dataIndex > -1) {
            this.#database[table].splice(dataIndex, 1)
            this.#persist()
        }
    }

    update(table, id, data) {
        const dataIndex = this.#database[table].findIndex(row => row.id === id)

        if (dataIndex > -1) {
            this.#database[table][dataIndex] = { id, ...data }
            this.#persist()
        }
    }
}
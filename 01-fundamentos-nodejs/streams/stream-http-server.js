import http from 'node:http';
import { Transform } from 'node:stream'

class InverseNumberStream extends Transform {
    _transform(chunck, encoding, callback) {
        const transformedChunck = Number(chunck.toString()) * -1
        console.log(transformedChunck)
        callback(null, Buffer.from(String(transformedChunck)))
    }
}

const server = http.createServer(async (req, res) => {
    const buffers = [] //Array de buffers contendo cada pedaço da requisição

    for await (const chunck of req) {
        buffers.push(chunck) 
    }

    const fullStreamContent = Buffer.concat(buffers).toString(); //Concatenando todos os buffers em um único buffer e transformando os dados em string

    return res.end(fullStreamContent)
});

server.listen(3334)
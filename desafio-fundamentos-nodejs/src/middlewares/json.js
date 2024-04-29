export async function json(req, res) {
    const buffers = []
    
    for await (const chunk of req) {
        buffers.push(chunk)
    }

    const body = JSON.parse(Buffer.concat(buffers).toString())
    req.body = body;
}
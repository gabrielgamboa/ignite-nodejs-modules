export const json = async (req, res) => {
    const buffers = []

    for await (const chunck of req) {
        buffers.push(chunck) 
    }

    try {
        const bodyInJson = Buffer.concat(buffers).toString();
        const bodyConverted = JSON.parse(bodyInJson)
        req.body = bodyConverted
    } catch {
        req.body = null;
    }
    
    res.setHeader('Content-type', 'application/json')
}
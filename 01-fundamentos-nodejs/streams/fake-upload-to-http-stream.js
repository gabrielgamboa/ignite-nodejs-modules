import { Readable } from 'stream'

class OneToHundredStream extends Readable { //apenas lê dados
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 5) {
                this.push(null) //não há mais informações para serem enviadas na stream
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 500);
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundredStream(),
    duplex: 'half',
}).then(response => response.text())
    .then(data => {
        console.log(data)
    })

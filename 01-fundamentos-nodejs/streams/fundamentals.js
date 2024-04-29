// process.stdin
//     .pipe(process.stdout)

import { Readable, Transform, Writable } from 'node:stream'

class OneToHundredStream extends Readable { //apenas lê dados
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i > 100) {
                this.push(null) //não há mais informações para serem enviadas na stream
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }
        }, 500);
    }
}



class MultiplyByTenSteam extends Writable { //apenas processam dados, não transformam
    _write(chunck, encoding, callback) {
        console.log(Number(chunck.toString()) * 10)
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenSteam()) //para cada pedaço da stream lida, consigo pegar com o método pipe e ir trabalhando com ela aos poucos
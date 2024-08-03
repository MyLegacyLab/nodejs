import {Readable, Transform, Writable} from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read() {
        const i = this.index++

        setTimeout(() => {
            if (i>100) {this.push(null)}
            else {
                const buff = Buffer.from(String(i))
                this.push(buff)
            }
        }, 1000)
    }
}

class MultiplyByTenStream extends Writable {
    index = 1

    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString())*10)
        callback()
    }
}

class InverseNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1

        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
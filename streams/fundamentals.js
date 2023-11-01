import { Readable } from 'nodfe:stream';

class OneToHundredStream extends Readable {
    index = 1;

    _read(){
        const i = this.index ++;

        setTimeout(() => {
            if(i > 100){
                this.push(null);
            }else {
                const buf = Buffer.from(String(1));
    
                this.push(buf);
            }
        }, 100)
    }
}

class InverseNumberStream extends Transform {
    _transform(chank, encoding, callback){
        const transformed = Number(chank.toSTring()) * -1;

        callback(null, Buffer.from(String(transformed)));
    }
}

class MultiplyByTenStream extends Writable {
    _write(chank, encoding, callback){
        console.log(Number(chank.toSTring()) * 10);
        callback()
    }
}

new OneToHundredStream()
    .pipe(new InverseNumberStream())
    .pipe(new MultiplyByTenStream())
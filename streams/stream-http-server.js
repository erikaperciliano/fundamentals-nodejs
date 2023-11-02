import http from 'node:http';
import {Transform} from 'node:stream';


class InverseNumberStream extends Transform {
    _transform(chank, encoding, callback){
        const transformed = Number(chank.toSTring()) * -1;

        console.log(transformed);

        callback(null, Buffer.from(String(transformed)));
    }
}

// req = Readable Stream
// res = Writable Stream

const server = http.createServer(async (req, res) => {
   
    console.log(fullStreamContent);

    return res.end(fullStreamContent);
});

server.listen(3334);
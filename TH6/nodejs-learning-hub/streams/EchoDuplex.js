const { Duplex } = require('stream');

class EchoDuplex extends Duplex {
    _write(chunk, encoding, callback) {
        console.log('Duplex received:', chunk.toString());
        this.push('Echo: ' + chunk.toString());
        callback();
    }
    _read(size) {}
}

module.exports = EchoDuplex;
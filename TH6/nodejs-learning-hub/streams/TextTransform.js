const { Transform } = require('stream');

class TextTransform extends Transform {
    _transform(chunk, encoding, callback) {
        // Biến đổi toàn bộ nội dung file thành chữ HOA
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}

module.exports = TextTransform;
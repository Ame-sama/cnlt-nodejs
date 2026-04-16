// server.js
const http = require('http');
const url = require('url');
const fs = require('fs');

// Tạo file cats.txt trong thư mục files
let fileContent = 'Ragdoll, Scottish fold, British shorthair...';
let filePath = 'files/cats.txt';
fs.writeFile(filePath, fileContent, (err) => {
    if(err) throw err;
    console.log('The file was successfully saved.');
});

const server = http.createServer((req, res) => {
    let urlData = url.parse(req.url, true);
    let fileName = './views' + urlData.pathname;

    // Xử lý file CSS
    if (urlData.pathname.startsWith('/css/')) {
        fileName = '.' + urlData.pathname;
        fs.readFile(fileName, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('404 Not Found');
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            return res.end();
        });
        return;
    }

    // Xử lý trang chủ
    if (urlData.pathname === '/') {
        fileName = './views/index.html';
    }

    fs.readFile(fileName, (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write('404 Not Found');
            return res.end();
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

server.listen(8017, 'localhost');
console.log('Server đang chạy tại http://localhost:8017');
//end
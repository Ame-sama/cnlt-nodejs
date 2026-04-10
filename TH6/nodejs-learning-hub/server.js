const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Import các module (Đảm bảo đúng đường dẫn cấu trúc của Huy)
const appEmitter = require('./events/AppEmitter');
const TextTransform = require('./streams/TextTransform');
const EchoDuplex = require('./streams/EchoDuplex');

const PORT = 3000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;

    // Hàm phụ để render file HTML từ thư mục views
    const renderHTML = (fileName) => {
        const filePath = path.join(__dirname, 'views', fileName);
        if (fs.existsSync(filePath)) {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            fs.createReadStream(filePath).pipe(res);
        } else {
            res.writeHead(404);
            res.end(`Lỗi: Không tìm thấy file ${fileName} trong thư mục views!`);
        }
    };

    // --- ĐIỀU HƯỚNG ROUTES ---

    if (pathname === '/' || pathname === '/index') {
        renderHTML('index.html');
    } 
    
    else if (pathname === '/events') {
        // Kích hoạt sự kiện log khi bấm vào nút
        appEmitter.logAction("Huy truy cập trang Events");
        renderHTML('events.html');
    }

    else if (pathname === '/request') {
        const viewPath = path.join(__dirname, 'views', 'request.html');
        if (fs.existsSync(viewPath)) {
            fs.readFile(viewPath, 'utf8', (err, data) => {
                let html = data.replace('{{URL}}', req.url)
                               .replace('{{METHOD}}', req.method)
                               .replace('{{HEADERS}}', JSON.stringify(req.headers, null, 4));
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(html);
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end(`URL: ${req.url}\nMethod: ${req.method}\nHeaders: ${JSON.stringify(req.headers, null, 4)}`);
        }
    }

    else if (pathname === '/streams') {
        renderHTML('streams.html');
    }

    // --- CÁC ENDPOINT CHỨC NĂNG ---

    // 1. Readable + Transform Stream
    else if (pathname === '/read-story') {
        const storyPath = path.join(__dirname, 'data', 'story.txt');
        if (fs.existsSync(storyPath)) {
            res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
            const reader = fs.createReadStream(storyPath);
            const transformer = new TextTransform();
            reader.pipe(transformer).pipe(res);
        } else {
            res.end("Vui lòng tạo file data/story.txt trước!");
        }
    }

    // 2. Writable Stream (POST form)
    else if (pathname === '/write-data' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const logPath = path.join(__dirname, 'data', 'log.txt');
            const writer = fs.createWriteStream(logPath, { flags: 'a' });
            writer.write(`[Form Input]: ${body}\n`);
            writer.end();
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end('<h3>Ghi thành công!</h3><a href="/streams">Quay lại</a>');
        });
    }

    // 3. Stream ảnh (Sửa lỗi "publics" hay "public" ở đây)
    else if (pathname === '/image') {
        // Lưu ý: Trong hình Huy để là "publics", hãy kiểm tra kỹ tên folder nhé
        const imgPath = path.join(__dirname, 'publics', 'images', 'IMG_20241019_131747_130.jpg'); 
        if (fs.existsSync(imgPath)) {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            fs.createReadStream(imgPath).pipe(res);
        } else {
            res.writeHead(404);
            res.end("Không tìm thấy ảnh tại publics/images/IMG_20241019_131747_130.jpg");
        }
    }

    // 4. Trả JSON
    else if (pathname === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', name: 'Nhathuy', project: 'TH6' }));
    }

    else {
        res.writeHead(404);
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(` Server đang chạy tại: http://localhost:${PORT}`);
});
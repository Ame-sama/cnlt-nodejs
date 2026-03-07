






























































































































const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
  
  const path = req.url;
  console.log("Ban dang truy cap:", path); // Dong nay de kiem tra o Terminal

  if (path === '/' || path === '/home') {
    res.end('Trang chủ');
  } else if (path === '/about') {
    res.end('Trang giới thiệu');
  } else if (path === '/contact') {
    res.end('Trang liên hệ');
  } else {
    res.statusCode = 404;
    res.end('Không tìm thấy trang');
  }
});

server.listen(3000, () => {
  console.log('Server chay tai: http://localhost:3000');
});

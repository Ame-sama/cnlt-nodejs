const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class AppEmitter extends EventEmitter {
    // Hàm này vừa in log ra terminal, vừa ghi vào file data/log.txt
    logAction(message) {
        const logEntry = `[${new Date().toLocaleString()}] Action: ${message}\n`;
        
        // In ra màn hình terminal
        console.log(logEntry);

        // Ghi vào file log.txt (dùng try-catch để nếu lỗi ghi file cũng không sập server)
        try {
            const logPath = path.join(__dirname, '../data/log.txt');
            fs.appendFileSync(logPath, logEntry);
        } catch (err) {
            console.error("Lỗi ghi file log:", err.message);
        }

        // Phát tín hiệu sự kiện (emit)
        this.emit('logged', message);
    }
}

// Xuất ra một instance duy nhất để dùng chung toàn server
module.exports = new AppEmitter();
// Middleware logger
const logger = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
};

// Middleware requireLogin
const requireLogin = (req, res, next) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Chưa đăng nhập" });
    }
    next();
};

// Middleware xử lý lỗi chung
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Lỗi server", error: err.message });
};

module.exports = { logger, requireLogin, errorHandler };
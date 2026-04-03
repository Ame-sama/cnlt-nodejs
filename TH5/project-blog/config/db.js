const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/blogDB');
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Lỗi kết nối:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
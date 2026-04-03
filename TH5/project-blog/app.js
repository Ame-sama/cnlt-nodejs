const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Kết nối DB
connectDB();

// Cấu hình Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Sử dụng Routes
app.use('/', postRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

app.use(express.static('public'));
const express = require('express');
const app = express();
const path = require('path');

// 1. Cấu hình Template Engine EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// 2. Cấu hình phục vụ file tĩnh từ thư mục public
app.use(express.static('public'));

// 3. Khai báo mảng dữ liệu (Trích xuất từ các file HTML của bạn)
const posts = [
    {
        id: 1,
        title: 'Man must explore, and this is exploration at its greatest',
        subtitle: 'Problems look mighty small from 150 miles up',
        author: 'Start Bootstrap',
        date: 'September 24, 2023',
        image: '/assets/img/post-bg.jpg',
        hot: true
    },
    {
        id: 2,
        title: "I believe every human has a finite number of heartbeats",
        subtitle: "I don't intend to waste any of mine.",
        author: 'Start Bootstrap',
        date: 'September 18, 2023',
        image: '/assets/img/post-sample-image.jpg',
        hot: false
    },
    {
        id: 3,
        title: 'Science has not yet mastered prophecy',
        subtitle: 'We predict too much for the next year and yet far too little for the next ten.',
        author: 'Start Bootstrap',
        date: 'August 24, 2023',
        image: '/assets/img/contact-bg.jpg',
        hot: true
    },
    {
        id: 4,
        title: 'Failure is not an option',
        subtitle: 'Many say exploration is part of our destiny, but it’s actually our duty to future generations.',
        author: 'Start Bootstrap',
        date: 'July 8, 2023',
        image: '/assets/img/about-bg.jpg',
        hot: false
    },
    {
        id: 5,
        title: 'The dreams of yesterday are the hopes of today',
        subtitle: 'And the reality of tomorrow.',
        author: 'Start Bootstrap',
        date: 'July 2, 2023',
        image: '/assets/img/home-bg.jpg',
        hot: true
    }
];

// 4. Định nghĩa các Routes (Đảm bảo đủ 4 trang để chụp ảnh)

// Route Trang chủ /
app.get('/', (req, res) => {
    res.render('index', { 
        title: 'Clean Blog - Home',
        bgImage: '/assets/img/home-bg.jpg',
	posts: posts 
    });
});

// Route Trang danh sách /list
app.get('/list', (req, res) => {
    res.render('list', { 
        title: 'Danh sách bài viết', 
        posts: posts,
        bgImage: '/assets/img/about-bg.jpg'
    });
});

// Route Trang chi tiết /detail/:id
app.get('/detail/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    
    if (!post) {
        return res.status(404).send('Không tìm thấy bài viết này!');
    }
    
    res.render('detail', { 
        title: post.title, 
        item: post 
    });
});

// Route Trang liên hệ /contact
app.get('/contact', (req, res) => {
    res.render('contact', { 
        title: 'Liên hệ với tôi',
        bgImage: '/assets/img/contact-bg.jpg'
    });
});

// 5. Khởi chạy Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});

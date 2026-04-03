const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

// --- CÁC ROUTE HIỂN THỊ TRANG (GET) ---

// 1. Trang chủ
router.get('/', postController.getAllPosts);

// 2. Trang tạo bài viết mới (PHẢI ĐỂ TRÊN :id)
router.get('/blogposts/new', postController.getNewPost);

// 3. Trang sửa bài viết
router.get('/post/edit/:id', postController.getEditPost);

// 4. Xem chi tiết (ĐỂ DƯỚI CÙNG TRONG NHÓM GET CÓ ĐƯỜNG DẪN TƯƠNG TỰ)
router.get('/blogposts/:id', postController.getPostDetail);


// --- CÁC ROUTE XỬ LÝ DỮ LIỆU (POST) ---

// Lưu bài viết mới
router.post('/posts/store', postController.storePost);

// Cập nhật bài viết
router.post('/posts/update/:id', postController.updatePost);

// Xóa bài viết
router.post('/posts/delete/:id', postController.deletePost);

module.exports = router;
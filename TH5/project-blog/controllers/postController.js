const BlogPost = require('../models/BlogPost');

// Xem danh sách
exports.getAllPosts = async (req, res) => {
    const posts = await BlogPost.find({}).sort({ _id: -1 });
    res.render('index', { posts });
};

// Xem chi tiết
exports.getPostDetail = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('detail', { post });
};

// Lưu bài viết mới
exports.storePost = async (req, res) => {
    await BlogPost.create(req.body);
    res.redirect('/');
};

// Xóa bài viết
exports.deletePost = async (req, res) => {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.redirect('/');
};

// Hiển thị trang tạo bài mới
exports.getNewPost = (req, res) => {
    res.render('create');
};

// Hiển thị trang sửa bài viết
exports.getEditPost = async (req, res) => {
    const post = await BlogPost.findById(req.params.id);
    res.render('edit', { post });
};

// Cập nhật bài viết sau khi sửa
exports.updatePost = async (req, res) => {
    await BlogPost.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/blogposts/' + req.params.id);
};
const login = (req, res) => {
    const { username, password } = req.body;
    if (username === "admin" && password === "123456") {
        req.session.user = { username: "admin" };
        return res.json({ message: "Đăng nhập thành công" });
    }
    res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
};

const logout = (req, res) => {
    req.session.destroy();
    res.json({ message: "Đăng xuất thành công" });
};

module.exports = { login, logout };
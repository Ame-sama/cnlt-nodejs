const { students, getNextId } = require("../data/students");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validate
const validate = (data, currentId = null) => {
    const { name, email, age } = data;
    if (!name || name.trim().length < 2)
        return "Tên phải >= 2 ký tự";
    if (!email || !emailRegex.test(email))
        return "Email không đúng định dạng";
    const existed = students.find(s => s.email === email && s.id !== currentId && !s.isDeleted);
    if (existed)
        return "Email đã tồn tại";
    if (!age || age < 16 || age > 60)
        return "Tuổi phải từ 16 đến 60";
    return null;
};

// GET /students
const getAll = (req, res) => {
    let result = students.filter(s => !s.isDeleted);

    // Tìm kiếm theo name
    if (req.query.name) {
        result = result.filter(s =>
            s.name.toLowerCase().includes(req.query.name.toLowerCase())
        );
    }

    // Lọc theo class
    if (req.query.class) {
        result = result.filter(s => s.class === req.query.class);
    }

    // Sắp xếp
    if (req.query.sort === "age_asc") {
        result.sort((a, b) => a.age - b.age);
    } else if (req.query.sort === "age_desc") {
        result.sort((a, b) => b.age - a.age);
    }

    // Phân trang
    const page  = parseInt(req.query.page)  || null;
    const limit = parseInt(req.query.limit) || null;

    if (page && limit) {
        const total = result.length;
        const start = (page - 1) * limit;
        const data  = result.slice(start, start + limit);
        return res.json({ page, limit, total, totalPages: Math.ceil(total / limit), data });
    }

    res.json(result);
};

// GET /students/:id
const getById = (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id) && !s.isDeleted);
    if (!student) return res.status(404).json({ message: "Không tìm thấy sinh viên" });
    res.json(student);
};

// POST /students
const create = (req, res) => {
    const error = validate(req.body);
    if (error) return res.status(400).json({ message: error });

    const { name, email, age, class: cls } = req.body;
    const newStudent = { id: getNextId(), name, email, age, class: cls, isDeleted: false };
    students.push(newStudent);
    res.status(201).json({ message: "Thêm thành công", data: newStudent });
};

// PUT /students/:id
const update = (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id) && !s.isDeleted);
    if (index === -1) return res.status(404).json({ message: "Không tìm thấy sinh viên" });

    const error = validate(req.body, parseInt(req.params.id));
    if (error) return res.status(400).json({ message: error });

    const { name, email, age, class: cls } = req.body;
    students[index] = { ...students[index], name, email, age, class: cls };
    res.json({ message: "Cập nhật thành công", data: students[index] });
};

// DELETE /students/:id (soft delete)
const remove = (req, res) => {
    const index = students.findIndex(s => s.id === parseInt(req.params.id) && !s.isDeleted);
    if (index === -1) return res.status(404).json({ message: "Không tìm thấy sinh viên" });

    students[index].isDeleted = true;
    res.json({ message: "Xóa thành công" });
};

// GET /students/stats
const getStats = (req, res) => {
    const total   = students.length;
    const active  = students.filter(s => !s.isDeleted).length;
    const deleted = students.filter(s => s.isDeleted).length;
    const activeStudents = students.filter(s => !s.isDeleted);
    const averageAge = activeStudents.length
        ? parseFloat((activeStudents.reduce((sum, s) => sum + s.age, 0) / activeStudents.length).toFixed(1))
        : 0;

    res.json({ total, active, deleted, averageAge });
};

// GET /students/stats/class
const getStatsByClass = (req, res) => {
    const activeStudents = students.filter(s => !s.isDeleted);
    const classMap = {};
    activeStudents.forEach(s => {
        classMap[s.class] = (classMap[s.class] || 0) + 1;
    });
    const result = Object.keys(classMap).map(cls => ({ class: cls, count: classMap[cls] }));
    res.json(result);
};

module.exports = { getAll, getById, create, update, remove, getStats, getStatsByClass };
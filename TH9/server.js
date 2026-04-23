const express = require("express");
const session = require("express-session");
const { logger, errorHandler } = require("./middleware");
const authRoutes    = require("./routes/auth");
const studentRoutes = require("./routes/students");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(session({
    secret: "th9_secret",
    resave: false,
    saveUninitialized: true
}));

// Logger middleware
app.use(logger);

// Routes
app.get("/", (req, res) => {
    res.json({ message: "Server TH9 đang chạy!" });
});

app.use("/", authRoutes);
app.use("/students", studentRoutes);

// Phần 4: Heavy sync vs async
app.get("/heavy-sync", (req, res) => {
    console.log("SYNC: bắt đầu");
    const data = fs.readFileSync("data.txt", "utf8");
    console.log("SYNC: xong");
    res.json({ type: "sync", data });
});

app.get("/heavy-async", (req, res) => {
    console.log("ASYNC: bắt đầu");
    fs.readFile("data.txt", "utf8", (err, data) => {
        console.log("ASYNC: xong");
        res.json({ type: "async", data });
    });
    console.log("ASYNC: sau readFile (tiếp tục chạy ngay)");
});

// Error handler
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
});
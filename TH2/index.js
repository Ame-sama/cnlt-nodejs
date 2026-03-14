const express = require('express')
const path = require('path')
const app = express()

// Cấu hình tài nguyên tĩnh
app.use(express.static('public'))

// Route trang chủ
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(4000, () => {
  console.log('Server dang chay tai port 4000')
})

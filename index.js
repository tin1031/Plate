const express = require('express')
const app = express()
const port = 4000

// 내 앱과 mongoDB 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://Jin:qwer1234@plate.xoryvus.mongodb.net/?retryWrites=true&w=majority').then(() => console.log('MongoDB connected...')).catch(err => console.log(err))
// then > 잘 연결 됐는지 확인


app.get('/', (req, res) => { res.send('Hello World! 힘내자!!')})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})

// Jin / qwer1234 < mongoDB ID & PW
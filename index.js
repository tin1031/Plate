const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser');

const config = require('./config/key')

const { User } = require('./models/User');

// body가 client에서 오는 정보를 server에서 아래걸 분석해서 가져오게 하는것
// application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:true}));
// application/json > 에러등이 뜰때 json 형식으로 전달
app.use(bodyParser.json());


// 내 앱과 mongoDB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));
// then > 잘 연결 됐는지 확인


app.get('/', (req, res) => { res.send('Hello World! 힘내자!! 행복')});

// 회원가입
app.post('/register', (req, res) => {
  // 회원가입 때 필요한 정보를 client에서 가져오면 데이터베이스에 넣어준다
  const user = new User(req.body)
  
  // mongoDB에 있는 save를 넣어 req.body를 user에 넣어준다
  user.save((err, userInfo) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({success:true})
  })
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)});

// Jin / qwer1234 < mongoDB ID & PW
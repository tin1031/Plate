const express = require('express')
const app = express()
const bodyParser = require('body-parser');
// cookie 사용 > npm i cookie-parser --save
const cookieParser = require('cookie-parser');
const config = require('./config/key')
const {auth} = require('./middleware/auth');

const { User } = require('./models/User');


// body가 client에서 오는 정보를 server에서 아래걸 분석해서 가져오게 하는것
// application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({extended:true}));
// application/json > 에러등이 뜰때 json 형식으로 전달
app.use(bodyParser.json());
app.use(cookieParser());


// 내 앱과 mongoDB 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB connected...')).catch(err => console.log(err));
// then > 잘 연결 됐는지 확인


app.get('/', (req, res) => { res.send('Hello World! 힘내자!! 행복')});


app.get('/api/hello', (req,res) => {
  res.send('이미지 실화냐??');
})


// Sign Up
app.post('/api/users/register', (req, res) => {
  // 회원가입 때 필요한 정보를 client에서 가져오면 데이터베이스에 넣어준다
  const user = new User(req.body)

  // mongoDB에 있는 save를 넣어 req.body를 user에 넣어준다
  user.save((err, userInfo) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({success:true})
  })
});


// login
app.post('/api/users/login', (req, res) => {
  // email database find
  User.findOne({ email :req.body.email}, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess : false,
        message: "존재하지 않는 이메일입니다"
      })
    }

  // email true > password true?
  // comparePassword 이름은 다르게 지정해도 되나 User.js도 바꿔줘야함
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({
        loginSuccess:false, message:"비밀번호가 틀렸습니다."})

      // new token / 새 메서드 생성(generateToken)
      // 토큰 생성을 위해 jsonwebtoken 라이브러리 다운, npm i jsonwebtoken --save
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 저장하기 > 쿠키, 로컬스토리지 등
        res.cookie("x_auth", user.token)
        .status(200)
        .json({ loginSuccess:true, userId:user._id })

      })
    })

  })
})


app.get('/api/users/auth', auth, (req, res) => {
  // next()를 통해 미들웨어를 통과했다면 Authentication이 true라는 뜻
  req.status(200).json({
    _id:req.user._id,
    isAdmin:req.user.role === 0 ? false : true,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role,
    image:req.user.image
  })
})

// logout > login 상태라면 auth가 존재
app.get('/api/users/logout', auth, (req, res) => {
  // console.log('req.user', req.user);
  User.findOneAndUpdate({_id:req.user._id}, {token:""},
  (err, user) => {
    if(err) return res.json({success:false, err});
    return res.status(200).send({success:true});
  })
})



const port = 4000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)});

  
// Jin / qwer1234 < mongoDB ID & PW
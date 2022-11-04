const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type:String,
    maxlength:50
  },
  email: {
    type:String,
    // 상세정보에 space가 있을경우 trim으로 없애줌
    trim:true,
    // 똑같은 이메일 사용못하게
    unique:1
  },
  password: {
    type:String,
    minlength:8
  },
  lastname: {
    type:String,
    maxlength:50
  },
  // 관리자와 유저 구분
  role:{
    // ex. 1 = 관리자, 0 = 유저 형식으로 지정할수있다
    type:Number,
    default:0
  },
  image: String,
  token: {
    type:String
  },
  // 유효기간
  tokenExp:{
    type:Number
  }
})

// index.js(Register Route) 유저정보를 저장하기 전에 하는것
userSchema.pre('save', function(next) {
  var user = this;

  // password가 전환될 때만 암호화되게
  if(user.isModified('password')){

    bcrypt.genSalt(saltRounds, function(err, salt) {
      if(err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash) {
          if(err) return next(err)
          user.password = hash
          next()
      });
    });
  } else{
    // 비밀번호가 아닌 것을 바꿀 때는 next, 그래야 바로 index user로 나갈 수 있다
    next()
  }

  // // 비밀번호 암호화(bcrypt 사이트 Usage 참고)
  // bcrypt.genSalt(saltRounds, function(err, salt) {
  //   if(err) return next(err)

  //   bcrypt.hash(user.password, salt, function(err, hash) {
  //       if(err) return next(err)

  //       // hash로 바꾸어줌
  //       user.password = hash
  //       // 위가 끝나면 next로
  //       next()
  //   });
  // });


});


userSchema.methods.comparePassword = function(plainPassword, cb) {
  // password compare
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function(cb) {
  var user = this;
  // jsonwebtoken을 이용해 token 생성 / mongoDB에 _id 가져옴
  var token = jwt.sign(user._id.toHexString(), 'secretToken')

  user.token = token
  user.save(function(err, user) {
    if(err) return cb(err)
    cb(null, user)
  })

}


// 복호화
userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  // decode
  jwt.verify(token, 'secretToken', function(err, decoded) {
    // 유저 아이디를 이용해 유저를 찾은 다음 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({"_id" : decoded, "token":token}, function(err, user){
      if(err) return cb(err);
      cb(null, user);
    })
  })
}


// 유저라는 이름으로 userSchema를 model에 저장
const User = mongoose.model('User', userSchema)

// 다른 곳에서도 사용할 수 있게 내보내기
module.exports = {User}
const mongoose = require('mongoose')

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
    minlength:5
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

// 유저라는 이름으로 userSchema를 model에 저장
const User = mongoose.model('User', userSchema)

// 다른 곳에서도 사용할 수 있게 내보내기
module.exports = {User}
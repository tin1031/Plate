const { User } = require("../models/User");

let auth = (req, res, next) => {
    //인증 처리
    //client cookie 에서 token 가져오기 (cookie-parser 사용)
    let token = req.cookies.x_auth;

    // token 복호화 해서 DB에서 유저찾기
    User.findByToken(token, (err, user) => {
      if(err) throw err;
      if(!user) return res.json({isAuth:false, err:true})

      req.token = token;
      req.user = user;
      next();
    })

}

module.exports = {auth};
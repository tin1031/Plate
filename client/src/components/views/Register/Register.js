import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import {useNavigate} from 'react-router-dom'

function Register() {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const navi = useNavigate();

  const EmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }
  const PasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }
  const NameHandler = (e) => {
    setName(e.currentTarget.value)
  }
  const ConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
  }
  const SubmitHandler = (e) => {
    e.preventDefault();

    if(Password.length < 6){
      return alert('비밀번호는 최소 6자리 이상이어야 합니다.')
    }
    if(Password !== ConfirmPassword){
      return alert('비밀번호가 맞지 않습니다.')
    }

    let body={
      email:Email,
      name:Name,
      password:Password,
      confirmpassword:ConfirmPassword
    }
    dispatch(registerUser(body)).then(response => {
      if(response.payload.success){
        navi('/login')
      } else{
        alert('회원가입에 실패했습니다.')
      }
    });

  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
      <form style={{display:'flex', flexDirection:'column'}}
        onSubmit={SubmitHandler}>
        <label>이메일</label>
        <input type="email" value={Email} onChange={EmailHandler}/>
        <label>이름</label>
        <input type="text" value={Name} onChange={NameHandler}/>
        <label>비밀번호</label>
        <input type="Password" value={Password} onChange={PasswordHandler}/>
        <br/>
        <label>비밀번호 확인</label>
        <input type="Password" value={ConfirmPassword} onChange={ConfirmPasswordHandler}/>
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}

export default Register
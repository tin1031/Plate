import React, {useEffect} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Auth from '../../../hoc/auth'

function Landing() {

  useEffect(() => {
    // get request를 서버(index.js)로 보내는것
    axios.get('/api/hello')
    .then(response => {console.log(response)})
  }, [])

  const navi = useNavigate();
  const ClickHandler = () =>{
    axios.get(`/api/users/logout`).then(response => {
      if(response.data.success) {
        navi('/login')
      } else {
        alert('로그아웃에 실패했습니다.')
      }
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
      <h2>Landing</h2>

      <button onClick={ClickHandler}>로그아웃</button>
    </div>
  )
}

export default Auth(Landing, null);
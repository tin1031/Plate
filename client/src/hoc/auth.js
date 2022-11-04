import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'
import {useNavigate} from "react-router-dom"



export default function au (SpecificComponent, option, adminRoute = null) {

  function AuthenticationCheck (props) {
   
    const dispatch = useDispatch()
    const navi = useNavigate()

    useEffect(() => {

      dispatch(auth()).then(response => {
        console.log(response)

        // if(!response.payload.isAuth){
        //   if(option){
        //     navi("/login")
        //   }
        // } else{
        //   if(adminRoute && !response.payload.isAdmin){
        //     navi("/");
        //   } else{
        //     if(option === false){
        //       navi("/")
        //     }
        //   }
        // }
      })
  
    }, [])

    return (
      <SpecificComponent/>
    )
  }

  return AuthenticationCheck
}
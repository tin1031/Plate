import {LOGIN_USER, REGISTER_USER, AUTH_USER} from "../_actions/types";

export default function re (state={}, action){
  switch (action.type) {
    case LOGIN_USER:
          //  빈상태, 액션페이로드 불러오기
          return {...state, loginSuccess:action.payload}

    case REGISTER_USER:
          return {...state, register:action.payload}

    case AUTH_USER:
          return {...state, userData:action.payload}
  
    default:
      return state;
  }
}
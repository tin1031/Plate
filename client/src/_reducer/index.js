import {combineReducers} from 'redux';
import user from './user_reducer';

// store에 user, post, comment 등등 여러 리듀서가 있는데 conbineReducers로 여러 리듀서를 합하고 rootReducer라 이름 지음
const rootReducer = combineReducers({
  user
})

// 다른파일에서 이 파일을 가져올 때 rootReducer라는 이름이 아닌 다른이름으로 바꿔서 가져올 수 있다. ex) > Reducer
export default rootReducer;
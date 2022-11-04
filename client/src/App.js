import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Landing from './components/views/Landing/Landing'
import Login from './components/views/Login/Login'
import Register from './components/views/Register/Register'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Landing />}>
          </Route>
          <Route exact path="/login"  element={<Login />}>
          </Route>
          <Route exact path="/register"  element={<Register />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}


export default App;

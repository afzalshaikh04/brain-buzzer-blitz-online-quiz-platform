import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import oldLoginForm from './components/oldLoginForm';
import SignupForm from './components/oldSignUpForm';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import Quiz from './components/Quiz';
import Result from './components/Result';
import Waiting from './components/Waiting';


function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/oldlogin" element={<oldLoginForm />} />

          <Route path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/signup" element={<SignupForm />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/quiz" element={<Quiz/>} />
          <Route exact path="/waiting" element={<Waiting/>} />
          <Route exact path="/result" element={<Result/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

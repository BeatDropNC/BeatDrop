import './App.css';
import ReactGameContainer from './components/ReactGameContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Menu from './components/Menu';
import LoginPage from './components/UserAuthentication/LoginPage';
import SignupPage from './components/UserAuthentication/SignupPage';
import ResetPasswordPage from './components/UserAuthentication/ResetPasswordPage';



function App() {
  const [colorChoice, setColorChoice] = useState('red')
  const [gameTime, setGameTime] = useState(0)

  console.log("Hello")

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {/* user authentication */}
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='/signup'
            element={<SignupPage />}
          />
          <Route
            path='/reset-password'
            element={<ResetPasswordPage />}
          />

          <Route
            path='/'
            element={<Menu colorChoice={colorChoice} setColorChoice={setColorChoice} gameTime={gameTime} />}
          />
          <Route
            path='/newgame'
            element={<ReactGameContainer colorChoice={colorChoice} setColorChoice={setColorChoice} setGameTime={setGameTime} colorProp={colorChoice} />}
          />

        </Routes>

      </div>
    </BrowserRouter>
  );
}



export default App;

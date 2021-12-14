import './App.css';
import ReactGameContainer from './components/ReactGameContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Menu from './components/Menus/LevelSelect';
import LoginPage from './components/UserAuthentication/LoginPage';
import SignupPage from './components/UserAuthentication/SignupPage';
import ResetPasswordPage from './components/UserAuthentication/ResetPasswordPage';
import { UserUidProvider } from './contexts/UserUidContext';
import Homepage from './components/Menus/Homepage';
import MainMenu from './components/Menus/MainMenu';
import SocialFeed from './components/Menus/SocialFeed';
import Profile from './components/Menus/Profile';
import PersonalLeaderboard from './components/Menus/PersonalLeaderboard';
import GlobalLeaderboard from './components/Menus/GlobalLeaderboard';
import LevelSelect from './components/Menus/LevelSelect';

function App() {
  const [gameTime, setGameTime] = useState(0)
  const [levelChoice, setLevelChoice] = useState('level1')

  return (
    <BrowserRouter>
      <UserUidProvider>
        <div className="App">
          <Routes>
            <Route
              path='/'
              element={<Homepage />}
            />

            <Route 
            path='/main-menu'
            element={<MainMenu />}
            />

            <Route
              path='/level-select'
              element={<LevelSelect setLevelChoice={setLevelChoice} gameTime={gameTime} />}
            />
            
            <Route 
            path='/profile'
            element={<Profile />}
            />

            <Route
             path='/personal-leaderboard'
             element={<PersonalLeaderboard />}
            />

            <Route
             path='/global-leaderboard'
             element={<GlobalLeaderboard />}
            />

            <Route 
            path='/social'
            element={<SocialFeed />}
            />

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
              path='/newgame'
              element={<ReactGameContainer levelChoice={levelChoice} setGameTime={setGameTime} />}
            />

          </Routes>

        </div>
      </UserUidProvider>
    </BrowserRouter>
  );
}



export default App;

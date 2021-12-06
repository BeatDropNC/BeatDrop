import './App.css';
import ReactGameContainer from './components/ReactGameContainer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Menu from './components/Menu';
function App() {
  const [colorChoice, setColorChoice] = useState('red')
  const [gameTime, setGameTime] = useState(0)


  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route
         path='/'
         element={<Menu colorChoice={colorChoice} setColorChoice={setColorChoice} gameTime={gameTime}/>}
         />
       <Route
         path='/newgame'
         element={<ReactGameContainer colorChoice={colorChoice} setColorChoice={setColorChoice} setGameTime={setGameTime} colorProp={colorChoice}/>}
         />
          </Routes>

    </div>
    </BrowserRouter>
  );
}



export default App;

import './App.css';
import Home from './home';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Nav/Navbar';
function App() {
  return (
    <div>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

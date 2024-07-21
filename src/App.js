import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <ToastContainer />
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;

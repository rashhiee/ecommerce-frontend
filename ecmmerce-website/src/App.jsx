import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from "./components/Navbar"
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/login';
import Register from './pages/Register';


function App() {


  return (
    <div className="flex flex-col min-h-screen">
    
    <Router>
    <Navbar />
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>

    <Footer/>
    </Router>
    </div>
  )
}

export default App

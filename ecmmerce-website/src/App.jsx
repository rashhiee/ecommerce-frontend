import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import Navbar from "./components/Navbar"
import AdminNavbar from './components/adminNavbar';
import UserNavbar from './components/userNavbar';
import Footer from './components/Footer';
import Home from './pages/publics/Home';
// import Login from './services/login';
import Register from './pages/users/Register';
import AdminLogin from './pages/admin/adminLogin';
import UserLogin from './pages/users/userLogin';
import AdminDashboard from './pages/admin/adminDashboard';
import AdminCategory from './pages/admin/adminCategory';
import AdminCategoyAdd from './pages/admin/adminCategoyAdd';
import AdminCategoryPut from './pages/admin/adminCategoryPut';

function AppData() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserRoute = location.pathname.startsWith('/user');

  return (
    <>

      {isAdminRoute ? (
        <AdminNavbar />
      ) : isUserRoute ? (
        <UserNavbar />
      ) : (
        <Navbar />
      )}
 
      <Routes>
      {/* {=============== public ===================} */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* {============= admin ===================== } */}
        
        <Route path='/admin/home' element={<AdminDashboard />}/>
        <Route path='/admin/category' element={<AdminCategory />}/>
        <Route path='/admin/category/add' element={<AdminCategoyAdd />}/>
        <Route path='/admin/category/:id' element={<AdminCategoryPut />}/>
        
        

      </Routes>

       <Footer />

    </>
  )
}


function App() {


  return (
    <div className="flex flex-col min-h-screen">

      <Router>
          
          <AppData/>
        
      </Router>
    </div>

  )
}

export default App

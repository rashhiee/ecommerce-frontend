import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';


// import Login from './services/login';
import Navbar from "./components/Navbar"
import AdminNavbar from './components/adminNavbar';
import Footer from './components/Footer';
import Home from './pages/publics/Home';
import Register from './pages/users/Register';
import AdminLogin from './pages/admin/adminLogin';
import UserLogin from './pages/users/userLogin';
import Contact from './pages/publics/ContactPage';
import ShopUser from './pages/publics/shopUser';
import Proucts from './pages/publics/Proucts';
import Cart from './pages/users/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Orders from './pages/users/Orders';
import OrderSuccess from './pages/users/OrderDetails';
import AdminRoute from './services/admin/adminRoute';
import NotFound from './services/UnPage';



function AppData() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  const isLoginRoute = location.pathname === '/admin/login' ;
  
   // const isUserRoute = location.pathname.startsWith('/user');
   //  location.pathname === '/login' ||
   //  location.pathname === '/register' ;
   // location.pathname === '/register' ||   location.pathname === '/login'  ||
                    

  const hideFooter = location.pathname === '/contact' ||    isAdminRoute;


  return (
    <>

      {!isLoginRoute && (
      isAdminRoute ? 
        <AdminNavbar />
       : 
   
       <Navbar />
      )}

      <Routes>
        {/* {=============== public ===================} */}
        <Route path="/login" element={<UserLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/shop' element={<ShopUser />} />
        <Route path='/product/:id' element={<Proucts />} />
        <Route path='/logout' element={<></>} />

       
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* <Route path='/dd' element={<></>}>
          <Route path='/shop' element={<>hii</>}/>
        </Route> */}


         <Route path='/admin/*' element={
          <ProtectedRoute role='admin'>
            <AdminRoute />
          </ProtectedRoute>

        } />


        {/* ============= user ========================= */}

        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>

        } />

        <Route path='/orders' element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>

        } />

        <Route path='/order/details' element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>

        } />

       <Route path="*" element={ <NotFound />} />

      </Routes>

      {!hideFooter && <Footer />}

    </>
  )
}


function App() {


  return (
    <div className="flex flex-col min-h-screen">

      <Router>

        <AppData />

      </Router>

    </div>

  )
}

export default App

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
import AdminProductsView from './pages/admin/adminProductsView';
import AdminProductAdd from './pages/admin/adminProductAdd';
import AdminProductEdit from './pages/admin/adminProductEdit';
import AdminUsers from './pages/admin/adminUsers';
import AdminOrders from './pages/admin/adminOrders';
import Contact from './pages/publics/ContactPage';
import ShopUser from './pages/publics/shopUser';
import Proucts from './pages/publics/Proucts';
import Cart from './pages/users/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Orders from './pages/users/Orders';
import OrderSuccess from './pages/users/OrderDetails';


function AppData() {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  // const isUserRoute = location.pathname.startsWith('/user');

  const hideFooter = location.pathname === '/contact' || isAdminRoute;


  return (
    <>

      {isAdminRoute ? (
        <AdminNavbar />
      ) :  (
        <Navbar />
      )}


 
      <Routes>
      {/* {=============== public ===================} */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/contact' element={<Contact />}/> 
        <Route path='/shop' element={<ShopUser />}/> 
        <Route path='/product/:id' element={<Proucts />}/>
        <Route path='/logout' element={<></>}/>
       
        {/* {============= admin ====================} */}
        
        <Route path='/admin/home' element={<AdminDashboard />}/>
        <Route path='/admin/category' element={<AdminCategory />}/>
        <Route path='/admin/category/add' element={<AdminCategoyAdd />}/>
        <Route path='/admin/category/:id' element={<AdminCategoryPut />}/>
        <Route path='/admin/products' element={<AdminProductsView />}/>
        <Route path='/admin/product/add' element={<AdminProductAdd />}/>
        <Route path='/admin/product/:id' element={<AdminProductEdit />}/>
        <Route path='/admin/users' element={<AdminUsers />}/>
        <Route path='/admin/orders' element={<AdminOrders />}/> 

        {/* ============= user ========================= */}
        
        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
          
        }/>

         <Route path='/orders' element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
          
        }/>

         <Route path='/order/details' element={
          <ProtectedRoute>
            <OrderSuccess />
          </ProtectedRoute>
          
        }/>
        


      </Routes>

       {!hideFooter && <Footer />}

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

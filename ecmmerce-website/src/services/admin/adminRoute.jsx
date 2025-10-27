import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import AdminDashboard from '../../pages/admin/adminDashboard' ;
import AdminCategory from '../../pages/admin/adminCategory';
import AdminCategoyAdd from '../../pages/admin/adminCategoyAdd';
import AdminCategoryPut from '../../pages/admin/adminCategoryPut';
import AdminProductsView from '../../pages/admin/adminProductsView';
import AdminProductAdd from '../../pages/admin/adminProductAdd';
import AdminProductEdit from '../../pages/admin/adminProductEdit';
import AdminUsers from '../../pages/admin/adminUsers';
import AdminOrders from '../../pages/admin/adminOrders';



const AdminRoute = () => {


  return (

       <Routes>

           <Route path='home' element={<AdminDashboard />} />
           <Route path='category' element={<AdminCategory />} />
           <Route path='category/add' element={<AdminCategoyAdd />} />
           <Route path='category/:id' element={<AdminCategoryPut />} />
           <Route path='products' element={<AdminProductsView />} />
           <Route path='product/add' element={<AdminProductAdd />} />
           <Route path='product/:id' element={<AdminProductEdit />} />
           <Route path='users' element={<AdminUsers />} />
           <Route path='orders' element={<AdminOrders />} />

       </Routes>
  )
}

export default AdminRoute


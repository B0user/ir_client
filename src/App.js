// Modules
import { Routes, Route } from 'react-router-dom';
// Layouts
import Layout from './components/Layouts/Layout';
import PanelLayout from './components/Layouts/PanelLayout';
import RequireAuth from './components/Layouts/RequireAuth';
import PersistLogin from './components/Layouts/PersistLogin';
// Public
import Home from './components/Home';
import Register from './features/auth/Register';
import Login from './features/auth/Login';
import LinkPage from './components/LinkPage';
import ModelView from './features/modelview/ModelView';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
// Private
import LoginRedir from './features/auth/LoginRedir';
import Admin from './components/admin/Admin';
import Client from './components/client/Client';
// Products CRUD
import Products from './features/products/Products';
import AddProduct from './features/products/AddProduct';
import ReadProduct from './features/products/ReadProduct';
// Users CRUD
import Users from './features/users/Users';
import ReadUserInfo from './features/users/ReadUserInfo';
// Models CRUD
import Models from './features/models/Models';
import AddModel from './features/models/AddModel';
import ReadModel from './features/models/ReadModel';
import AddUser from './features/users/AddUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="modelview/:id" element={<ModelView/>} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Protected */}
        <Route element={<PersistLogin />}>
          <Route path="/redir" element={<LoginRedir />} />

          {/* Client Routing */}
          <Route element={<RequireAuth allowedRoles={[1101]} />}>
            <Route path="client" element={<PanelLayout role={1101}/>}>
              <Route index element={<Client />}/>
              <Route path="products">
                <Route index element={<Products />}/>
                <Route path="add" element={<AddProduct />}/>
                <Route path=":id" element={<ReadProduct />}/>
              </Route>
            </Route>
          </Route>

          {/* Admin Routing */}
          <Route element={<RequireAuth allowedRoles={[2004]} />}>
            <Route path="admin" element={<PanelLayout role={2004}/>}>
              <Route index element={<Admin />}/>
                <Route path="users">
                  <Route index element={<Users />}/>
                  <Route path="add" element={<AddUser />}/>
                  <Route path=":id" element={<ReadUserInfo />}/>
                </Route>
                <Route path="models">
                  <Route index element={<Models />}/>
                  <Route path="add" element={<AddModel />}/>
                  <Route path=":id" element={<ReadModel />}/>
                </Route>
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
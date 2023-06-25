// Modules
import { Routes, Route } from 'react-router-dom';
// Layouts
import Layout from './components/Layouts/Layout';
// Fitting Room
import BrandFittingRoom from './features/modelview/BrandFittingRoom';
import ModelView from './features/modelview/ModelView';
// Public
import Home from './components/Home';
import LinkPage from './components/LinkPage';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
// Demo
import DemoCatalog from './features/demo/DemoCatalog';
import DemoMV from './features/demo/DemoMV';
import DemoProductCard from './features/demo/DemoProductCard';
import ProductCard from './features/modelview/ProductCard';

function App() {
  return (
    <Routes>
      <Route index element={<Home/>} />
      <Route path="/" element={<Layout />}>
        {/* demo */}
        <Route path="show" element={<DemoCatalog/>} />
        <Route path="show/:product_id" element={<DemoProductCard/>} />
        <Route path="show/:product_id/ar" element={<DemoMV/>} />
        {/* public routes */}
        <Route path="modelview/:client_id" element={<BrandFittingRoom/>} />
        <Route path="modelview/:client_id/:product_id" element={<ProductCard/>} />
        <Route path="modelview/:client_id/:product_id/ar" element={<ModelView/>} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
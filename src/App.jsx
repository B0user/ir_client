import WelcomeCatalog from "./WelcomeCatalog";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProductCardPage from "./ProductCardPage";
import ProductDoubleRowList from "./ProductDoubleRowList";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index element={<WelcomeCatalog />} />
          <Route exact path = "/productcard" element = {<ProductCardPage/>}/>
          <Route exact path = "/secondarycatalog" element = {<ProductDoubleRowList/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

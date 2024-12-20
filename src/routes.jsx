import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quemSomos" element={<QuemSomos />} />
        </Routes> 
    </BrowserRouter>
  );
}

export default AppRoutes;
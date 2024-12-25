import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import HomeUsuario from "./pages/HomeUsuario";
import CadastrarMedicamento from "./pages/CadastrarMedicamento";

function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quemSomos" element={<QuemSomos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Cadastro" element={<Cadastro />} />
            <Route path="/home" element={<HomeUsuario/>} />
            <Route path="/esqueceusenha" element={<EsqueceuSenha/>} />
            <Route path="/cadastrarmedicamento" element={<CadastrarMedicamento/>} />
        </Routes> 
    </BrowserRouter>
  );
}

export default AppRoutes;
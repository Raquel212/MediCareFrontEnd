import { BrowserRouter, Route,Routes } from "react-router-dom";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import EsqueceuSenha from "./pages/EsqueceuSenha";
import HomeUsuario from "./pages/HomeUsuario";
import CadastrarMedicamento from "./pages/CadastrarMedicamento";
import GerenciarMedicamentos from "./pages/GerenciarMedicamentos";
import AgendarMedicamento from "./pages/AgendarMedicamento";
import Historico from "./pages/Historico";
import CalendarioMedicamento from "./pages/CalendarioMedicamento";
import Relatorio from "./pages/Relatorio";
import DetalhesMedicamento from "./pages/DetalhesMedicamentos";
import Notificacao from "./pages/Notificacao";
import EditarPerfil from "./pages/EditarPerfil";

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
            <Route path="/gerenciarmedicamento" element={<GerenciarMedicamentos/>} />
            <Route path="/agendarmedicamento" element={<AgendarMedicamento />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/calendario" element={<CalendarioMedicamento/>} />
            <Route path="/relatorio" element={<Relatorio/>} />
            <Route path="verDetalhes" element={<DetalhesMedicamento/>} />
            <Route path="/notificacao" element={<Notificacao />} />
            <Route path="/editarperfil" element={<EditarPerfil/>} />
        </Routes> 
    </BrowserRouter>
  );
}

export default AppRoutes;
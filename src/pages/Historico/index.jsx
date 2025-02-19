import Footer from "../../components/Footer";
import HeaderHomeUsuario from "../../components/HeaderHomeUsuario";
import styles from "./Historico.module.css";
import { useState } from "react";

function Historico() {
  const [filtro, setFiltro] = useState("Todos");

  const dadosMedicamentos = [
    { nome: "Paracetamol", data: "20/12/2024", quantidade: "500mg", status: "Concluído" },
    { nome: "Amoxicilina", data: "18/12/2024", quantidade: "1 comprimido", status: "Pendente" },
    { nome: "Ibuprofeno", data: "17/12/2024", quantidade: "400mg", status: "Concluído" },
    { nome: "Cetirizina", data: "02/01/2025", quantidade: "10mg", status: "Pendente" },
    { nome: "Atenolol", data: "05/01/2025", quantidade: "50mg", status: "Em Progresso" },
    { nome: "Clonazepam", data: "10/01/2025", quantidade: "2mg", status: "Concluído" },
    { nome: "Escitalopram", data: "15/01/2025", quantidade: "10mg", status: "Pendente" },
    { nome: "Levotiroxina", data: "20/01/2025", quantidade: "75mcg", status: "Em Progresso" }
  ];

  const dadosFiltrados = filtro === "Todos" ? dadosMedicamentos : dadosMedicamentos.filter(dado => dado.status === filtro);

  return (
    <>
      <HeaderHomeUsuario />
      <div className={styles.containerHistorico}>
        <div className={styles.headerContainer}>
          <h1 className={styles.tituloHistorico}>Histórico de Medicamentos</h1>
          <div className={styles.filtro}>
            <label htmlFor="filtroStatus">Filtrar por Status:</label>
            <select 
              id="filtroStatus"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Pendente">Pendente</option>
              <option value="Concluído">Concluído</option>
              <option value="Em Progresso">Em Progresso</option>
            </select>
          </div>
        </div>

        <table className={styles.tabelaHistorico}>
          <thead>
            <tr>
              <th>Nome do Medicamento</th>
              <th>Data de Registro</th>
              <th>Dosagem</th>
              <th>Status do Medicamento</th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.map((medicamento, index) => (
              <tr key={index}>
                <td>{medicamento.nome}</td>
                <td>{medicamento.data}</td>
                <td>{medicamento.quantidade}</td>
                <td>{medicamento.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default Historico;

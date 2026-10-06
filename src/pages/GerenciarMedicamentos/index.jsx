import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import HeaderHomeUsuario from "../../components/HeaderHomeUsuario";
import styles from "./GerenciarMedicamentos.module.css";
import api from "../../services/api";
import { getMedicamentosFixos, salvarMedicamentosFixos } from "../../services/medicamentoStore";
import PinGate from "../../components/PinGate";
import { hasPin } from "../../services/pinStore";

function GerenciarMedicamento() {
  const [medicamentos, setMedicamentos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentMedicamento, setCurrentMedicamento] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [confirmaExclusao, setConfirmaExclusao] = useState(null);
  const [usandoMock, setUsandoMock] = useState(false);
  const [pinAberto, setPinAberto] = useState(false);
  const [acaoPendente, setAcaoPendente] = useState(null);

  useEffect(() => {
    api
      .get("/medicamento?pagina=1&quantidadePorPagina=1000")
      .then((response) => setMedicamentos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        // Backend indisponível: carrega exemplos fixos para demonstração
        setMedicamentos(getMedicamentosFixos());
        setUsandoMock(true);
      });
  }, []);

  const handleDelete = (index, medicamento) => {
    if (usandoMock) {
      const medicamentosAtualizados = medicamentos.filter((_, i) => i !== index);
      setMedicamentos(medicamentosAtualizados);
      salvarMedicamentosFixos(medicamentosAtualizados);
      return;
    }
    console.log(medicamento);
    api
      .delete(`/medicamento/${medicamento.id}`)
      .then((response) => console.log(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    const medicamentosAtualizados = medicamentos.filter((_, i) => i !== index);
    setMedicamentos(medicamentosAtualizados);
  };

  const handleEdit = (index, medicamento) => {
    if (usandoMock) {
      setCurrentMedicamento({ ...medicamento });
      setEditIndex(index);
      setIsEditing(true);
      return;
    }
    console.log(medicamento);
    api
      .get(`/medicamento/${medicamento.id}`)
      .then((response) => {
        setCurrentMedicamento(response.data);
        setEditIndex(index);
        setIsEditing(true);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  const saveEdit = () => {
    if (usandoMock) {
      const medicamentosAtualizados = medicamentos.map((med, i) =>
        i === editIndex ? currentMedicamento : med
      );
      setMedicamentos(medicamentosAtualizados);
      salvarMedicamentosFixos(medicamentosAtualizados);
      setIsEditing(false);
      setCurrentMedicamento(null);
      return;
    }
    console.log(currentMedicamento.dataRegistro, "medicamento data registro");
    api
      .put(`/medicamento/${currentMedicamento.id}`, {
        nome: currentMedicamento.nome,
        quantidade: currentMedicamento.quantidade,
        dosagem: currentMedicamento.dosagem,
        horario: currentMedicamento.horario,
        tempoDeTratamento: currentMedicamento.tempoDeTratamento,
        dataRegistro : currentMedicamento.dataRegistro,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
    const medicamentosAtualizados = medicamentos.map((med, i) =>
      i === editIndex ? currentMedicamento : med
    );
    setMedicamentos(medicamentosAtualizados);
    localStorage.setItem(
      "medicamentos",
      JSON.stringify(medicamentosAtualizados)
    );
    setIsEditing(false);
    setCurrentMedicamento(null);
  };

  const closeModal = () => {
    setIsEditing(false);
    setCurrentMedicamento(null);
  };

  // ---- Controle parental: ações sensíveis exigem o PIN ----
  const pedirEdicao = (index, medicamento) => {
    if (hasPin()) {
      setAcaoPendente({ tipo: "editar", index, medicamento });
      setPinAberto(true);
    } else {
      handleEdit(index, medicamento);
    }
  };

  const pedirExclusao = (index, medicamento) => {
    if (hasPin()) {
      setAcaoPendente({ tipo: "excluir", index, medicamento });
      setPinAberto(true);
    } else {
      setConfirmaExclusao({ index, medicamento });
    }
  };

  const confirmarPinAcao = () => {
    const pendente = acaoPendente;
    if (!pendente) return;
    if (pendente.tipo === "editar") {
      handleEdit(pendente.index, pendente.medicamento);
    } else if (pendente.tipo === "excluir") {
      setConfirmaExclusao({ index: pendente.index, medicamento: pendente.medicamento });
    }
    setPinAberto(false);
    setAcaoPendente(null);
  };

  const fecharPin = () => {
    setPinAberto(false);
    setAcaoPendente(null);
  };

  return (
    <>
      <HeaderHomeUsuario />
      <div className={styles.gerenciarMedicamento}>
        <h1 className={styles.tituloGerenciarMedicamento}>
          Gerenciar Medicamentos
        </h1>
        {medicamentos.length === 0 ? (
          <p className={styles.mensagem}>Nenhum medicamento cadastrado.</p>
        ) : (
          <ul className={styles.listaMedicamentos}>
            {medicamentos.map((medicamento, index) => (
              <li key={index} className={styles.medicamentoItem}>
                {medicamento.foto && (
                  <div className={styles.fotoExibicao}>
                    <img
                      src={medicamento.foto}
                      alt={`Foto de ${medicamento.nome}`}
                      className={styles.medicamentoFoto}
                    />
                  </div>
                )}
                <div className={styles.medicamentoInfo}>
                  <p>
                    <strong>Nome:</strong> {medicamento.nome}
                  </p>
                  <p>
                    <strong>Data de Registro do Medicamento:</strong>{" "}
                    {medicamento.dataRegistro}
                  </p>
                  <p>
                    <strong>Quantidade Total:</strong> {medicamento.quantidade}
                  </p>
                  <p>
                    <strong>Dosagem por Unidade:</strong> {medicamento.dosagem}
                  </p>
                  <p>
                    <strong>Intervalo:</strong> {medicamento.horario}
                  </p>
                  <p>
                    <strong>Previsão de Termino do Tratamento:</strong>{" "}
                    {medicamento.tempoDeTratamento}
                  </p>
                </div>
                <div className={styles.acoes}>
                  <button
                    onClick={() => pedirEdicao(index, medicamento)}
                    className={styles.botaoEditar}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => pedirExclusao(index, medicamento)}
                    className={styles.botaoExcluir}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal de Confirmação de Exclusão */}
      {confirmaExclusao && (
        <>
          <div
            className={styles.modalOverlay}
            onClick={() => setConfirmaExclusao(null)}
          ></div>
          <div className={`${styles.modal} ${styles.modalConfirmacao}`}>
            <h2>Excluir Medicamento</h2>
            <p className={styles.confirmacaoTexto}>
              Tem certeza que deseja excluir o medicamento{" "}
              <strong>{confirmaExclusao.medicamento.nome}</strong>? Essa ação
              não poderá ser desfeita.
            </p>
            <div className={styles.confirmacaoAcoes}>
              <button
                className={styles.botaoExcluirSim}
                onClick={() => {
                  handleDelete(confirmaExclusao.index, confirmaExclusao.medicamento);
                  setConfirmaExclusao(null);
                }}
              >
                Sim, excluir
              </button>
              <button
                className={styles.botaoCancelar}
                onClick={() => setConfirmaExclusao(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal de Edição */}
      {isEditing && (
        <>
          <div className={styles.modalOverlay} onClick={closeModal}></div>
          <div className={styles.modal}>
            <h2>Editar Medicamento</h2>
            <label>
              Nome:
              <input
                type="text"
                value={currentMedicamento.nome}
                onChange={(e) =>
                  setCurrentMedicamento({
                    ...currentMedicamento,
                    nome: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Data de Registro do Medicamento:
              <input
              type="date"
              name="dataDeRegistro"
              value={currentMedicamento.dataRegistro ? currentMedicamento.dataRegistro.split("/").reverse().join("-") : "" }
              onChange={(e) => setCurrentMedicamento({
                ...currentMedicamento,
                dataRegistro: e.target.value ? e.target.value.split("-").reverse().join("/") : "",
              })}
              />
            </label>

            <label>
              Quantidade Total:
              <input
                type="text"
                value={currentMedicamento.quantidade}
                onChange={(e) =>
                  setCurrentMedicamento({
                    ...currentMedicamento,
                    quantidade: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Dosagem por Unidade:
              <input
                type="text"
                value={currentMedicamento.dosagem}
                onChange={(e) =>
                  setCurrentMedicamento({
                    ...currentMedicamento,
                    dosagem: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Horários:
              <input
                type="text"
                value={currentMedicamento.horario}
                onChange={(e) =>
                  setCurrentMedicamento({
                    ...currentMedicamento,
                    horario: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Previsão de Termino do Tratamento:
              <input
                type="text"
                value={currentMedicamento.tempoDeTratamento}
                onChange={(e) =>
                  setCurrentMedicamento({
                    ...currentMedicamento,
                    tempoDeTratamento: e.target.value,
                  })
                }
              />
            </label>

            <button onClick={saveEdit} className={styles.botaoSalvar}>
              Salvar
            </button>
            <button onClick={closeModal} className={styles.botaoCancelar}>
              Cancelar
            </button>
          </div>
        </>
      )}

      {/* Modal de PIN (controle parental) */}
      <PinGate
        aberto={pinAberto}
        titulo="Proteção por PIN"
        mensagem="Digite o PIN do responsável para continuar."
        aoFechar={fecharPin}
        aoConfirmar={confirmarPinAcao}
      />

      <Footer />
    </>
  );
}

export default GerenciarMedicamento;

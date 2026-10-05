import { useState, useEffect } from "react";
import Footer from "../../components/Footer";
import HeaderHomeUsuario from "../../components/HeaderHomeUsuario";
import styles from "./AgendarMedicamento.module.css";
import api from "../../services/api";
import { getMedicamentosFixos } from "../../services/medicamentoStore";
import { adicionarAgendamento, converterParaISO } from "../../services/agendamentoStore";

function AgendarMedicamento() {
  const [notificacao, setNotificacao] = useState("");
  const [medicamentos, setMedicamentos] = useState([]);
  const [usandoMock, setUsandoMock] = useState(false);

  const [selectedMedicamentoId, setSelectedMedicamentoId] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [frequencia, setFrequencia] = useState("");

  useEffect(() => {
    api
      .get("/medicamento?pagina=1&quantidadePorPagina=1000")
      .then((response) => setMedicamentos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
        // Backend indisponível: usa exemplos fixos para demonstração
        setMedicamentos(getMedicamentosFixos());
        setUsandoMock(true);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const medicamentoEscolhido = medicamentos.find(
      (med) => String(med.id) === String(selectedMedicamentoId)
    );

    // Salva sempre no calendário local para que apareça na tela de Calendário
    adicionarAgendamento({
      name: medicamentoEscolhido?.nome || "Medicamento",
      data: converterParaISO(data),
      scheduledTime: horario,
      frequency: frequencia,
      quantity: medicamentoEscolhido?.quantidade || 1,
      dosagem: medicamentoEscolhido?.dosagem || "",
    });

    // Modo demonstração: registra localmente e mostra o sucesso
    if (usandoMock) {
      setNotificacao("Agendamento registrado com sucesso! Ele já aparecerá no seu calendário!");
      setTimeout(() => {
        setNotificacao("");
      }, 3500);
      return;
    }

    api
      .post(`/agendamento`, {
        horario: horario,
        frequencia: frequencia,
        medicamentoId: selectedMedicamentoId,
      })
      .then((response) => {
        console.log(response.data);
        setNotificacao("Agendamento registrado com sucesso!");

        // Esconde a notificação após 3 segundos
        setTimeout(() => {
          setNotificacao("");
        }, 3000);
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  };

  return (
    <>
      <HeaderHomeUsuario />
      <div className={styles.containerAgendarMedicamento}>
        <h1 className={styles.tituloAgendarMedicamento}>Agendar Medicamento</h1>

        {/* Exibe a notificação caso haja uma mensagem */}
        {notificacao && <div className={styles.notificacao}>{notificacao}</div>}

        <div className={styles.formContainerAgendarMedicamento}>
          <form
            className={styles.formAgendarMedicamento}
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="medicamento"
                className={styles.labelAgendarMedicamento}
              >
                Nome do Medicamento:
              </label>
              <select
                id="medicamento"
                name="medicamento"
                required
                className={styles.inputAgendarMedicamento}
                value={selectedMedicamentoId}
                onChange={(e) => setSelectedMedicamentoId(e.target.value)}
              >
                <option value="">Selecione um medicamento</option>
                {medicamentos.map((medicamento) => (
                  <option key={medicamento.id} value={medicamento.id}>
                    {medicamento.nome}
                  </option>
                ))}
              </select>
            </div>

            <label htmlFor="data" className={styles.labelAgendarMedicamento}>
              Data do Agendamento:
            </label>
            <input
              type="date"
              id="data"
              name="data"
              required
              className={styles.inputAgendarMedicamento}
              value={data}
              onChange={(e) => setData(e.target.value)}
            />

            <label htmlFor="horario" className={styles.labelAgendarMedicamento}>
              Horário:
            </label>
            <input
              type="time"
              id="horario"
              name="horario"
              required
              className={styles.inputAgendarMedicamento}
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
            />

            <label
              htmlFor="frequencia"
              className={styles.labelAgendarMedicamento}
            >
              Frequência:
            </label>
            <select
              id="frequencia"
              name="frequencia"
              required
              className={styles.selectAgendarMedicamento}
              value={frequencia}
              onChange={(e) => setFrequencia(e.target.value)}
            >
              <option value="">Selecione a frequência</option>
              <option value="diario">Diário</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>

            <button
              type="submit"
              className={styles.submitButtonAgendarMedicamento}
            >
              Agendar Medicamento
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AgendarMedicamento;

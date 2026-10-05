import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import HeaderHomeUsuario from "../../components/HeaderHomeUsuario";
import styles from "./CadastrarMedicamento.module.css";
import api from "../../services/api";
import { adicionarMedicamentoFixo } from "../../services/medicamentoStore";
import { adicionarAgendamento, converterParaISO } from "../../services/agendamentoStore";

function CadastrarMedicamento() {
  const [form, setForm] = useState({
    nome: "",
    quantidadeTotal: "",
    dosagem: "",
    horarios: "",
    tempoDeTratamento: "",
    foto: null,
  });
  const [showNotification, setShowNotification] = useState(false);
  const [usandoMock, setUsandoMock] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dadosEnvio = {
      nome: form.nome,
      quantidade: form.quantidadeTotal,
      dosagem: form.dosagem,
      horario: form.horarios,
      tempoDeTratamento: form.tempoDeTratamento,
      dataRegistro: form.dataDeRegistro,
    };

    // Sempre registra no calendário local para acompanhar se tomou e quantos faltam
    adicionarAgendamento({
      name: form.nome,
      data: converterParaISO(form.dataDeRegistro),
      scheduledTime: "08:00",
      frequency: form.horarios,
      quantity: form.quantidadeTotal,
      dosagem: form.dosagem,
    });

    const concluirCadastro = () => {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      setTimeout(() => {
        navigate("/gerenciarmedicamento");
      }, 2000);
    };

    // Fallback quando o backend está indisponível: salva como dado fixo local
    if (usandoMock) {
      adicionarMedicamentoFixo({
        nome: form.nome,
        dataRegistro: form.dataDeRegistro,
        quantidade: form.quantidadeTotal,
        dosagem: form.dosagem,
        horario: form.horarios,
        tempoDeTratamento: form.tempoDeTratamento,
      });
      concluirCadastro();
      return;
    }

    api
      .post("/medicamento", dadosEnvio)
      .then((response) => {
        console.log(response.data);
        concluirCadastro();
      })
      .catch((error) => {
        console.error(error);
        // Se a API falhar, passa a usar os dados fixos localmente
        adicionarMedicamentoFixo({
          nome: form.nome,
          dataRegistro: form.dataDeRegistro,
          quantidade: form.quantidadeTotal,
          dosagem: form.dosagem,
          horario: form.horarios,
          tempoDeTratamento: form.tempoDeTratamento,
        });
        setUsandoMock(true);
        concluirCadastro();
      });
  };

  return (
    <>
      <HeaderHomeUsuario />
      <div className={styles.cadastrarMedicamento}>
        <h1 className={styles.tituloCadastrarMedicamento}>
          Cadastrar Medicamento
        </h1>

        {usandoMock && (
          <div className={styles.mockAviso}>Modo demonstração — salvando localmente</div>
        )}

        {showNotification && (
          <div className={styles.notificationCadastroMedicamento}>
            Medicamento cadastrado com sucesso!
          </div>
        )}

        <form className={styles.formMedicamento} onSubmit={handleSubmit}>
          <label>
            Nome do Medicamento:
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: Paracetamol, Ibuprofeno"
              required
            />
          </label>

          <label>
            Data de Registro do Medicamento:
            <input
              type="date"
              name="dataDeRegistro"
              value={
                form.dataDeRegistro
                  ? form.dataDeRegistro.split("/").reverse().join("-") 
                  : ""
              }
              onChange={(e) => {
                const dataFormatada = e.target.value
                  .split("-")
                  .reverse()
                  .join("/");
                setForm({ ...form, dataDeRegistro: dataFormatada }); 
              }}
              required
            />
          </label>

          <label>
            Quantidade Total:
            <input
              type="number"
              name="quantidadeTotal"
              value={form.quantidadeTotal}
              onChange={handleChange}
              placeholder="Ex: 30 comprimidos"
              required
            />
          </label>
          <label>
            Dosagem por Unidade:
            <input
              type="text"
              name="dosagem"
              value={form.dosagem}
              onChange={handleChange}
              placeholder="Ex: 500mg, 1 comprimido, 2 colheres"
              required
            />
          </label>
          <label>
            Intervalo:
            <input
              type="text"
              name="horarios"
              value={form.horarios}
              onChange={handleChange}
              placeholder="Ex: De 8h em 8h"
              required
            />
          </label>

          <label>
            Tempo de Tratamento:
            <input
              type="text"
              name="tempoDeTratamento"
              value={form.tempoDeTratamento}
              onChange={handleChange}
              placeholder="Ex: 7 dias"
              required
            />
          </label>
          <button type="submit" className={styles.botaoCadastrar}>
            Registrar
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default CadastrarMedicamento;

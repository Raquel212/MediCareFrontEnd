import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './AgendarMedicamento.module.css';
import api from '../../services/api';

function AgendarMedicamento() {
    // Estado para controlar a visibilidade da notificação
    const [notificacao, setNotificacao] = useState('');
    const [medicamentos, setMedicamentos] = useState([]);

    const [selectedMedicamentoId, setSelectedMedicamentoId] = useState("");
    const [horario, setHorario] = useState("");
    const [frequencia, setFrequencia] = useState("");

    useEffect(() => {
        api
      .get("/medicamento?pagina=1&quantidadePorPagina=1000")
      .then((response) => setMedicamentos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
        
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        api
        .post(`/agendamento`, {horario: horario, frequencia: frequencia, medicamentoId: selectedMedicamentoId})
        .then((response) => {
            console.log(response.data)
            setNotificacao('Agendamento registrado com sucesso!');

            // Esconde a notificação após 3 segundos
            setTimeout(() => {
                setNotificacao('');
            }, 3000);})
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
                {notificacao && (
                    <div className={styles.notificacao}>
                        {notificacao}
                    </div>
                )}
                
                <div className={styles.formContainerAgendarMedicamento}>
                    <form className={styles.formAgendarMedicamento} onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="medicamento" className={styles.labelAgendarMedicamento}>
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

                        <label htmlFor="frequencia" className={styles.labelAgendarMedicamento}>
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

                        <button onClick={() => handleSubmit()} type="submit" className={styles.submitButtonAgendarMedicamento}>Agendar Medicamento</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AgendarMedicamento;

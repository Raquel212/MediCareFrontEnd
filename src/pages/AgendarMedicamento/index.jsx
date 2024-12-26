import { useState } from 'react';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './AgendarMedicamento.module.css';

function AgendarMedicamento() {
    // Estado para controlar a visibilidade da notificação
    const [notificacao, setNotificacao] = useState('');

    // Função que é chamada quando o formulário é enviado
    const handleSubmit = (event) => {
        event.preventDefault();  // Impede o comportamento padrão de envio do formulário
        
        // Exibe a notificação de sucesso
        setNotificacao('Agendamento registrado com sucesso!');

        // Esconde a notificação após 3 segundos
        setTimeout(() => {
            setNotificacao('');
        }, 3000);
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
                        <label htmlFor="medicamento" className={styles.labelAgendarMedicamento}>Nome do Medicamento:</label>
                        <input type="text" id="medicamento" name="medicamento" required className={styles.inputAgendarMedicamento}/>

                        <label htmlFor="dosagem" className={styles.labelAgendarMedicamento}>Dosagem:</label>
                        <input type="text" id="dosagem" name="dosagem" required className={styles.inputAgendarMedicamento}/>

                        <label htmlFor="horario" className={styles.labelAgendarMedicamento}>Horário de Administração:</label>
                        <input type="time" id="horario" name="horario" required className={styles.inputAgendarMedicamento}/>

                        <label htmlFor="frequencia" className={styles.labelAgendarMedicamento}>Frequência:</label>
                        <select id="frequencia" name="frequencia" required className={styles.selectAgendarMedicamento}>
                            <option value="diario">Diário</option>
                            <option value="semanal">Semanal</option>
                            <option value="mensal">Mensal</option>
                        </select>

                        <button type="submit" className={styles.submitButtonAgendarMedicamento}>Agendar Medicamento</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AgendarMedicamento;

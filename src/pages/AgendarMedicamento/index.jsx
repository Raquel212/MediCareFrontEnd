import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './AgendarMedicamento.module.css';

function AgendarMedicamento() {
    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerAgendarMedicamento}>
                <h1 className={styles.tituloAgendarMedicamento}>Agendar Medicamento</h1>
                <div className={styles.formContainerAgendarMedicamento}>
                    <form className={styles.formAgendarMedicamento}>
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

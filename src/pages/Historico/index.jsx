import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './Historico.module.css';

function Historico() {
    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerHistorico}>
                <h1 className={styles.tituloHistorico}>Histórico de Medicamentos</h1>

                <table className={styles.tabelaHistorico}>
                    <thead>
                        <tr>
                            <th>Medicamento</th>
                            <th>Data de Cadastro</th>
                            <th>Quantidade Tomada</th>
                            <th>Status da Dose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Exemplo de dados, substituir com dados dinâmicos */}
                        <tr>
                            <td>Paracetamol</td>
                            <td>20/12/2024</td>
                            <td>500mg</td>
                            <td>Concluído</td>
                        </tr>
                        <tr>
                            <td>Amoxicilina</td>
                            <td>18/12/2024</td>
                            <td>1 comprimido</td>
                            <td>Pendente</td>
                        </tr>
                        <tr>
                            <td>Ibuprofeno</td>
                            <td>17/12/2024</td>
                            <td>400mg</td>
                            <td>Concluído</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Footer />
        </>
    );
}

export default Historico;

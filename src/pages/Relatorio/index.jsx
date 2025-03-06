
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './Relatorio.module.css';
import { Link } from 'react-router-dom';

function Relatorio() {
    // Exemplo de dados dos medicamentos
    const medicamentos = [
        { nome: 'Parecetamol', dosagem: '1 comprimido', horario: '08:00', frequencia: 'Diária' },
        { nome: 'Ibuprofeno', dosagem: '1 comprimido', horario: '14:00', frequencia: 'Diária' },
        { nome: 'Clonazepam', dosagem: '2mg', horario: '20:00', frequencia: 'Diária' },
    ];


    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerRelatorio}>
                <h1 className={styles.tituloRelatorio}>Relatório de Medicamentos</h1>
                <div className={styles.cardsContainerRelatorio}>
                    {medicamentos.map((medicamento, index) => (
                        <div key={index} className={styles.cardRelatorio}>
                            <div className={styles.cardHeaderRelatorio}>
                                <h3>{medicamento.nome}</h3>
                            </div>
                            <div className={styles.cardBodyRelatorio}>
                                <p><strong>Dosagem:</strong> {medicamento.dosagem}</p>
                                <p><strong>Horário:</strong> {medicamento.horario}</p>
                                <p><strong>Frequência:</strong> {medicamento.frequencia}</p>
                            </div>
                            <div className={styles.cardFooterRelatorio}>
                                <Link to="/verDetalhes" className={styles.botaoDetalhes}>Ver Detalhes</Link>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
            <Footer />
        </>
    );
}

export default Relatorio;

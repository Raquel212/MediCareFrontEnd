
import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './Relatorio.module.css';
import { Link } from 'react-router-dom';
import { hasPin, validarPin } from '../../services/pinStore';

function Relatorio() {
    const [bloqueado, setBloqueado] = useState(() => hasPin());
    const [pin, setPin] = useState('');
    const [erro, setErro] = useState('');

    const desbloquear = () => {
        if (pin.length !== 4) {
            setErro('Digite o PIN de 4 dígitos.');
            return;
        }
        if (validarPin(pin)) {
            setBloqueado(false);
            setPin('');
            setErro('');
        } else {
            setPin('');
            setErro('PIN incorreto. Tente novamente.');
        }
    };

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

                {bloqueado ? (
                    <div className={styles.lockCard}>
                        <FaLock className={styles.lockIcone} />
                        <h2 className={styles.lockTitulo}>Relatório protegido</h2>
                        <p className={styles.lockTexto}>
                            Digite o PIN do responsável para visualizar o relatório.
                        </p>
                        <input
                            type="password"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={4}
                            placeholder="• • • •"
                            className={styles.lockInput}
                            value={pin}
                            onChange={(e) => {
                                setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                                setErro('');
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && desbloquear()}
                        />
                        {erro && <p className={styles.lockErro}>{erro}</p>}
                        <button className={styles.lockBotao} onClick={desbloquear}>
                            Desbloquear
                        </button>
                    </div>
                ) : (
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
                )}
            </div>
            <Footer />
        </>
    );
}

export default Relatorio;

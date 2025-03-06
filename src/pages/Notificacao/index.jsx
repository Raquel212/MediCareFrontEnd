import { useState } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaBell } from 'react-icons/fa'; 
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './Notificacao.module.css';

function Notificacao() {
    const [notificacoes, setNotificacoes] = useState([
        { id: 1, titulo: 'Falta 10 minutos para tomar seu medicamentos.', mensagem: 'Tomar o medicamento no horário certo é essencial para sua eficácia.', lida: false },
        { id: 2, titulo: 'Lembre-se de tomar Aspirina com um copo cheio de água.', mensagem: 'Você está no caminho certo para o bem-estar. Continue assim!', lida: true },
        { id: 3, titulo: 'Você tem menos de 5 comprimidos de Amoxicilina restantes.', mensagem: 'Reabasteça Amoxicilina antes de 25/03/2025.', lida: false }
    ]);

    const marcarComoLida = (id) => {
        setNotificacoes(notificacoes.map(notificacao =>
            notificacao.id === id ? { ...notificacao, lida: true } : notificacao
        ));
    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerNotificacao}>
                <h1 className={styles.tituloNotificacao}>Notificações</h1>
                <div className={styles.listaNotificacoes}>
                    {notificacoes.map((notificacao) => (
                        <div
                            key={notificacao.id}
                            className={`${styles.notificacao} ${notificacao.lida ? styles.lidaNotificacao : ''}`}
                            onClick={() => marcarComoLida(notificacao.id)}
                        >
                            <div className={styles.iconNotificacao}>
                                {notificacao.lida ? <FaCheckCircle color="#4DA167" /> : <FaExclamationCircle color="#FF6347" />}
                            </div>
                            <div className={styles.textoNotificacao}>
                                <h2 className={styles.tituloNotificacao2}>{notificacao.titulo}</h2>
                                <p className={styles.mensagemNotificacao}>{notificacao.mensagem}</p>
                            </div>
                            {!notificacao.lida && (
                                <div className={styles.iconeAlertaNotificacao}>
                                    <FaBell color="#FF6347" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Notificacao;

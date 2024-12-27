import { useState } from 'react';
import { FaExclamationCircle, FaCheckCircle, FaBell } from 'react-icons/fa'; // Ícones importados
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './Notificacao.module.css';

function Notificacao() {
    // Exemplo de dados de notificação
    const [notificacoes, setNotificacoes] = useState([
        { id: 1, titulo: 'Novo agendamento de consulta', mensagem: 'Você tem uma nova consulta agendada para amanhã.', lida: false },
        { id: 2, titulo: 'Recomendação de exame', mensagem: 'Seu exame foi aprovado e precisa ser agendado.', lida: true },
        { id: 3, titulo: 'Atualização de plano de saúde', mensagem: 'Seu plano de saúde foi atualizado com novas coberturas.', lida: false }
    ]);

    // Função para marcar a notificação como lida
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

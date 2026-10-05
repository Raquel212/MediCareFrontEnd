import { useEffect, useRef, useState } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaUser, FaComments } from 'react-icons/fa';
import styles from './AssistenteIA.module.css';
import { responderIA, sugestoesIA } from '../../services/assistenteIa';

function AssistenteIA() {
    const [aberto, setAberto] = useState(false);
    const [jaInteragiu, setJaInteragiu] = useState(false);
    const [mensagens, setMensagens] = useState([
        {
            role: 'ia',
            texto:
                'Olá! 👋 Sou a IA do MediCare. Pergunte qualquer coisa sobre os medicamentos da minha base, por exemplo: "Como tomar Ibuprofeno?" ou "Quais os efeitos colaterais da Amoxicilina?".',
        },
    ]);
    const [inputIa, setInputIa] = useState('');
    const [digitando, setDigitando] = useState(false);
    const mensagensFimRef = useRef(null);
    const abertoRef = useRef(aberto);

    useEffect(() => {
        abertoRef.current = aberto;
    }, [aberto]);

    useEffect(() => {
        mensagensFimRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [mensagens, digitando]);

    const enviarPergunta = (pergunta) => {
        const texto = (pergunta ?? inputIa).trim();
        if (!texto || digitando) return;

        setJaInteragiu(true);
        setMensagens((prev) => [...prev, { role: 'user', texto }]);
        setInputIa('');
        setDigitando(true);

        setTimeout(() => {
            const resposta = responderIA(texto);
            setMensagens((prev) => [...prev, { role: 'ia', texto: resposta }]);
            setDigitando(false);
        }, 550);
    };

    return (
        <>
            {/* Janela do chat */}
            {aberto && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatHeader}>
                        <FaRobot className={styles.chatHeaderIcone} />
                        <div className={styles.chatHeaderTexto}>
                            <strong>Assistente IA</strong>
                            <span>Dúvidas sobre medicamentos · online</span>
                        </div>
                        <button
                            className={styles.chatFechar}
                            onClick={() => setAberto(false)}
                            aria-label="Fechar chat"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className={styles.chatMensagens}>
                        {mensagens.map((msg, index) => (
                            <div
                                key={index}
                                className={`${styles.bolha} ${
                                    msg.role === 'ia' ? styles.bolhaIA : styles.bolhaUsuario
                                }`}
                            >
                                {msg.role === 'ia' && <FaRobot className={styles.bolhaIcone} />}
                                <div className={styles.bolhaTexto}>{msg.texto}</div>
                                {msg.role === 'user' && <FaUser className={styles.bolhaIconeUsuario} />}
                            </div>
                        ))}
                        {digitando && (
                            <div className={`${styles.bolha} ${styles.bolhaIA}`}>
                                <FaRobot className={styles.bolhaIcone} />
                                <div className={styles.digitando}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={mensagensFimRef} />
                    </div>

                    <div className={styles.chatSugestoes}>
                        {sugestoesIA.map((sugestao, index) => (
                            <button
                                key={index}
                                className={styles.chipSugestao}
                                onClick={() => enviarPergunta(sugestao)}
                            >
                                {sugestao}
                            </button>
                        ))}
                    </div>

                    <div className={styles.chatInputRow}>
                        <input
                            type="text"
                            placeholder="Pergunte sobre um medicamento..."
                            className={styles.chatInput}
                            value={inputIa}
                            onChange={(e) => setInputIa(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && enviarPergunta()}
                        />
                        <button
                            className={styles.chatEnviar}
                            onClick={() => enviarPergunta()}
                            disabled={digitando}
                            aria-label="Enviar pergunta"
                        >
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            )}

            {/* Botão flutuante */}
            <button
                className={`${styles.botaoFlutuante} ${aberto ? styles.botaoFlutuanteAberto : ''}`}
                onClick={() => setAberto((prev) => !prev)}
                aria-label={aberto ? 'Fechar assistente' : 'Abrir assistente de IA'}
                aria-expanded={aberto}
            >
                {aberto ? <FaTimes /> : <FaRobot />}
                {!aberto && !jaInteragiu && (
                    <span className={styles.botaoBadge}>
                        <FaComments />
                    </span>
                )}
            </button>
        </>
    );
}

export default AssistenteIA;

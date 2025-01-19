import { useState } from 'react';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './EditarPerfil.module.css';

function EditarPerfil() {
    const [nome, setNome] = useState('Raquel');
    const [sobrenome, setSobrenome] = useState('Martins');
    const [email, setEmail] = useState('raquel@gmail.com');
    const [notificacao, setNotificacao] = useState(''); 
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false); 

    const validarEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    const salvarAlteracoes = () => {
        if (!nome.trim() || !sobrenome.trim() || !email.trim()) {
            setNotificacao('Todos os campos devem ser preenchidos.');
            return;
        }


        if (!validarEmail(email)) {
            setNotificacao('Por favor, insira um email válido.');
            return;
        }


        setNotificacao('Alterações salvas com sucesso!');
        setTimeout(() => setNotificacao(''), 3000); 
    };

    const handleExcluirConta = () => {
        setMostrarConfirmacao(true);
    };

    const confirmarExclusao = () => {
        alert('Conta excluída com sucesso.');
        window.location.href = '/login'; 
    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerEditarPerfil}>
                <h1 className={styles.tituloEditarPerfil}>Editar Perfil</h1>

                {/* Exibição da notificação */}
                {notificacao && (
                    <div className={styles.notificacaoEditarPerfil}>
                        {notificacao}
                    </div>
                )}

                <div className={styles.formularioEditarPerfil}>
                    <label className={styles.labelEditarPerfil}>
                        Nome:
                        <input
                            className={styles.inputEditarPerfil}
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <label className={styles.labelEditarPerfil}>
                        Sobrenome:
                        <input
                            className={styles.inputEditarPerfil}
                            type="text"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                        />
                    </label>
                    <label className={styles.labelEditarPerfil}>
                        Email:
                        <input
                            className={styles.inputEditarPerfil}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>

                <div className={styles.botoesEditarPerfil}>
                    <button className={styles.botaoSalvarEditarPerfil} onClick={salvarAlteracoes}>
                        Salvar Alterações
                    </button>
                    <button className={styles.botaoExcluirEditarPerfil} onClick={handleExcluirConta}>
                        Excluir Conta
                    </button>
                </div>

                {/* Confirmação para exclusão */}
                {mostrarConfirmacao && (
                    <div className={styles.confirmacaoExcluir}>
                        <p>Tem certeza de que deseja excluir sua conta?</p>
                        <button
                            onClick={confirmarExclusao}
                            className={styles.botaoConfirmarEditarPerfil}
                        >
                            Sim
                        </button>
                        <button
                            onClick={() => setMostrarConfirmacao(false)}
                            className={styles.botaoCancelarEditarPerfil}
                        >
                            Não
                        </button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default EditarPerfil;

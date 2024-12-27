import { useState } from 'react';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './EditarPerfil.module.css';

function EditarPerfil() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [notificacao, setNotificacao] = useState(false); // Estado para controle da notificação

    const handleExcluirConta = () => {
        setMostrarConfirmacao(true);
    };

    const confirmarExclusao = () => {
        // Simulando a exclusão da conta (removendo dados do localStorage ou variáveis)
        localStorage.removeItem('usuario'); // Remover dados de usuário armazenados no localStorage (se houver)
        
        // Exibindo mensagem de sucesso e redirecionando para a página de login
        alert('Conta excluída com sucesso.');
        window.location.href = '/login'; // Redirecionando para a tela de login
    };

    const salvarAlteracoes = () => {
        // Aqui, você pode simular a lógica de salvar as alterações no backend ou no estado local
        setNotificacao(true);
        setTimeout(() => {
            setNotificacao(false);
        }, 3000); // A notificação ficará visível por 3 segundos
    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerEditarPerfil}>
                <h1 className={styles.tituloEditarPerfil}>Editar Perfil</h1>

                {/* Exibição da notificação */}
                {notificacao && (
                    <div className={styles.notificacaoEditarPerfil}>
                        Alterações salvas com sucesso!
                    </div>
                )}

                <div className={styles.formularioEditarPerfil}>
                    <label className={styles.labelEditarPerfil}>
                        Nome:
                        <input className={styles.inputEditarPerfil}
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </label>
                    <label className={styles.labelEditarPerfil}>
                        Sobrenome:
                        <input className={styles.inputEditarPerfil}
                            type="text"
                            value={sobrenome}
                            onChange={(e) => setSobrenome(e.target.value)}
                        />
                    </label>
                    <label className={styles.labelEditarPerfil}>
                        Email:
                        <input className={styles.inputEditarPerfil}
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

                {mostrarConfirmacao && (
                    <div className={styles.confirmacaoExcluir}>
                        <p>Tem certeza de que deseja excluir sua conta?</p>
                        <button onClick={confirmarExclusao} className={styles.botaoConfirmarEditarPerfil}>Sim</button>
                        <button onClick={() => setMostrarConfirmacao(false)} className={styles.botaoCancelarEditarPerfil}>Não</button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default EditarPerfil;

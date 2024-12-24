import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './EsqueceuSenha.module.css';
import logo from '../../assets/Logo_Sem.png';

function EsqueceuSenha() {
    return (
        <>
            <Header />
            <div className={styles.containerEsqueceuSenha}>
                <div className={styles.formContainerEsqueceuSenha}>
                    <div className={styles.logoEsqueceuSenha}>
                        <img src={logo} alt="Logo" className={styles.esqueceuSenhaLogo} />
                    </div>
                    <h1 className={styles.tituloEsqueceuSenha}>Esqueceu sua senha?</h1>
                    <p className={styles.subtituloEsqueceuSenha}>
                        Insira seu e-mail para receber um link de recuperação de senha.
                    </p>
                    <form className={styles.formEsqueceuSenha}>
                        <label htmlFor="email" className={styles.labelEsqueceuSenha}>E-mail:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu e-mail"
                            className={styles.inputEsqueceuSenha}
                            required
                        />
                        <button type="submit" className={styles.botaoEsqueceuSenha}>
                            Enviar link de recuperação
                        </button>
                    </form>
                    <a href="/login" className={styles.voltarLoginEsqueceuSenha}>
                        Voltar para o login
                    </a>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EsqueceuSenha;

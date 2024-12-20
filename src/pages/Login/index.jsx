
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaFacebook, FaGoogle } from 'react-icons/fa';  // Importando ícones do Facebook e Google
import styles from './Login.module.css';  // Certifique-se de importar o arquivo CSS corretamente

function Login() {
    return (
        <>
            <Header />
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.formContainer}>
                        <div className={styles.formSection}>
                            <h2 className={styles.loginTitle}>User Login</h2>
                            <form className={styles.loginForm}>
                                <input type="text" placeholder="Nome do Usuário" className={styles.inputField} />
                                <input type="password" placeholder="Senha" className={styles.inputField} />
                                <button type="submit" className={styles.loginButton}>Entrar</button>
                            </form>
                            <div className={styles.loginLinks}>
                                <p>Não tem uma conta?<a href="/cadastro" className={styles.link}> Cadastre-se</a></p>
                                <a href="/esqueceusenha" className={styles.links}>Esqueceu sua senha?</a>
                            </div>
                            <div className={styles.socialLogin}>
                                <p>Ou entre com:</p>
                                <div className={styles.socialIcons}>
                                <button className={`${styles.socialButton} ${styles.facebook}`}>
                                    <FaFacebook size={45} />
                                </button>
                                <button className={`${styles.socialButton} ${styles.google}`}>
                                    <FaGoogle size={45} />
                                </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.imageSection}>
                            <img src="/Login.jpg" alt="Imagem de Login" className={styles.loginImage} />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;

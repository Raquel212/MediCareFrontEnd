import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaFacebook, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa'; // Ícones do olho
import styles from './Login.module.css';
import api from '../../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [error, setError] = useState(null);  // Estado para mensagens de erro
    const navigate = useNavigate();
    
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !senha) {
            setError('Preencha os campos de email e senha.');
            return;
        }

        try {
            const response = await api.post('/Authentication/login', { email, senha });
            localStorage.setItem('authToken', response.data.token);
            navigate('/home');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                setError('Email ou senha inválidos.');
            } else if (error.response && error.response.status === 404) {
                setError('Usuário não encontrado.');
            } else {
                setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
            }
        }
    };

    return (
        <>
            <Header />
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.formContainer}>
                        <div className={styles.formSection}>
                            <h2 className={styles.loginTitle}>Login</h2>
                            <form className={styles.loginForm} onSubmit={handleLogin}>
                                {error && <div className={styles.errorMessage}>{error}</div>} {/* Exibe mensagem de erro */}
                                <input
                                    type="text"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={styles.inputField}
                                />
                                <div className={styles.passwordField}>
                                    <input
                                        type={passwordVisible ? 'text' : 'password'}
                                        placeholder="Senha"
                                        value={senha}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={styles.inputField}
                                    />
                                    <button
                                        type="button"
                                        className={styles.togglePasswordButton}
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <button type="submit" className={styles.loginButton}>
                                    Entrar
                                </button>
                            </form>
                            <div className={styles.loginLinks}>
                                <p>
                                    Não tem uma conta?
                                    <a href="/Cadastro" className={styles.link}>
                                        Cadastre-se
                                    </a>
                                </p>
                                <a href="/esqueceusenha" className={styles.links}>
                                    Esqueceu sua senha?
                                </a>
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

import { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import styles from './Cadastro.module.css';
import api from "./../../services/api";

function Cadastro() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
    const [notificacao, setNotificacao] = useState('');


    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        api
        .post(`/authentication`, {nome: nome, sobrenome: sobrenome, email: email, senha: senha, senhaConfirmacao: senhaConfirmacao})
        .then((response) => {
            console.log(response.data)
            setNotificacao('Usuário Cadastrado com sucesso!');

            // Esconde a notificação após 3 segundos
            setTimeout(() => {
                setNotificacao('');
            }, 3000);})
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    }

    return (
        <>
            <Header />
            <div className={styles.cadastroContainer}>
                <div className={styles.cadastroCard}>
                    <div className={styles.formContainer}>
                        <div className={styles.formSection}>
                            {/* Exibe a notificação caso haja uma mensagem */}
                                {notificacao && (
                                    <div className={styles.notificacao}>
                                        {notificacao}
                                    </div>
                                )}
                            <h2 className={styles.cadastroTitle}>Cadastro</h2>
                            <form className={styles.cadastroForm}>
                                <input 
                                    type="text" 
                                    placeholder="Nome" 
                                    value={nome}
                                    className={styles.inputField}
                                    onChange={(e) => setNome(e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Sobrenome" 
                                    value={sobrenome}
                                    className={styles.inputField} 
                                    onChange={(e) => setSobrenome(e.target.value)}
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    value={email}
                                    className={styles.inputField} 
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <div className={styles.passwordField}>
                                    <input 
                                        type={passwordVisible ? "text" : "password"} 
                                        placeholder="Senha" 
                                        value={senha}
                                        className={styles.inputField} 
                                        onChange={(e) => setSenha(e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className={styles.togglePasswordButton} 
                                        onClick={togglePasswordVisibility}
                                    >
                                        {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <div className={styles.passwordField}>
                                    <input 
                                        type={confirmPasswordVisible ? "text" : "password"} 
                                        placeholder="Confirmar Senha" 
                                        value={senhaConfirmacao}
                                        className={styles.inputField} 
                                        onChange={(e) => setSenhaConfirmacao(e.target.value)}
                                    />
                                    <button 
                                        type="button" 
                                        className={styles.togglePasswordButton} 
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <button onClick={handleSubmit} type="submit" className={styles.cadastroButton}>Cadastrar</button>
                            </form>
                            <div className={styles.cadastroLinks}>
                                <p>Já tem uma conta?<a href="/login" className={styles.link}> Faça login</a></p>
                            </div>
                        </div>
                        <div className={styles.imageCadastro}>
                            <img src="/Login2.jpg" alt="Imagem de Login" className={styles.cadastroImage} />
                        </div>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Cadastro;

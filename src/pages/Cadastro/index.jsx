import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
import styles from './Cadastro.module.css';
import api from "./../../services/api";

function Cadastro() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    useEffect(() => {
        api.post('authentication',{
            nome: "string",
            sobrenome: "string",
            email: "user1@example.com",
            senha: "string",
            senhaConfirmacao: "string"
        }).then((response) => {
            console.log(response.data); 
        }).catch((error) => {
            console.log(error);
        });
    }, [passwordVisible]);

    return (
        <>
            <Header />
            <div className={styles.cadastroContainer}>
                <div className={styles.cadastroCard}>
                    <div className={styles.formContainer}>
                        <div className={styles.formSection}>
                            <h2 className={styles.cadastroTitle}>Cadastro</h2>
                            <form className={styles.cadastroForm}>
                                <input 
                                    type="text" 
                                    placeholder="Nome" 
                                    className={styles.inputField} 
                                />
                                <input 
                                    type="text" 
                                    placeholder="Sobrenome" 
                                    className={styles.inputField} 
                                />
                                <input 
                                    type="email" 
                                    placeholder="Email" 
                                    className={styles.inputField} 
                                />
                                <div className={styles.passwordField}>
                                    <input 
                                        type={passwordVisible ? "text" : "password"} 
                                        placeholder="Senha" 
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
                                <div className={styles.passwordField}>
                                    <input 
                                        type={confirmPasswordVisible ? "text" : "password"} 
                                        placeholder="Confirmar Senha" 
                                        className={styles.inputField} 
                                    />
                                    <button 
                                        type="button" 
                                        className={styles.togglePasswordButton} 
                                        onClick={toggleConfirmPasswordVisibility}
                                    >
                                        {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>
                                <button type="submit" className={styles.cadastroButton}>Cadastrar</button>
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

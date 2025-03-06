import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./Cadastro.module.css";
import api from "../../services/api";

function Cadastro() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirmacao, setSenhaConfirmacao] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleCadastro = async (event) => {
    event.preventDefault();

    if (!nome || !sobrenome || !email || !senha || !senhaConfirmacao) {
      setError("Todos os campos são obrigatórios.");
      return;
    }

    if (senha !== senhaConfirmacao) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      const response = await api.post("/Authentication", {
        nome,
        sobrenome,
        email,
        senha,
        senhaConfirmacao
      });
      console.log(response.data);
      setSuccessMessage(
        "Cadastro realizado com sucesso! Você pode fazer login agora."
      );
      setError(null);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        setError("Erro ao cadastrar. Verifique os dados fornecidos.");
      } else if (error.response && error.response.status === 404) {
        setError("Email já cadastrado.");
      } else {
        setError(
          "Ocorreu um erro ao tentar fazer o cadastro. Tente novamente."
        );
      }
    }
  };

  return (
    <>
      <Header />
      <div className={styles.cadastroContainer}>
        <div className={styles.cadastroCard}>
          <div className={styles.formContainer}>
            <div className={styles.formSection}>
              <h2 className={styles.cadastroTitle}>Cadastro</h2>
              <form className={styles.cadastroForm} onSubmit={handleCadastro}>
                {error && <div className={styles.errorMessage}>{error}</div>}
                {successMessage && (
                  <div className={styles.successMessage}>{successMessage}</div>
                )}

                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  placeholder="Sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  className={styles.inputField}
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.inputField}
                />
                <div className={styles.passwordField}>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
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
                    value={senhaConfirmacao}
                    onChange={(e) => setSenhaConfirmacao(e.target.value)}
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

                <button type="submit" className={styles.cadastroButton}>
                  Cadastrar
                </button>
              </form>

              <div className={styles.cadastroLinks}>
                <p>
                  Já tem uma conta?
                  <a href="/login" className={styles.link}>
                    {" "}
                    Faça login
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className={styles.imageCadastro}>
            <img
              src="/Login2.jpg"
              alt="Imagem de Login"
              className={styles.cadastroImage}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Cadastro;

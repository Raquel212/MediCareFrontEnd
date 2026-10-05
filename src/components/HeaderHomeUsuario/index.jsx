import { useState } from "react";
import styles from './HeaderHomeUsuario.module.css';
import { FaBars, FaTimes, FaUserCircle, FaPills, FaCalendarAlt, FaHistory, FaFileAlt, FaCog, FaSearchPlus, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from '../../assets/Logo_Sem.png';
import AssistenteIA from "../AssistenteIA";

function HeaderHomeUsuario() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [perfilAberto, setPerfilAberto] = useState(false);

    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    const togglePerfil = () => {
        setPerfilAberto(!perfilAberto);
    };

    return (
        <>
            <header className={styles.headerHomeUsuario}>
                <div onClick={toggleMenu} className={styles.iconHomeUsuario} aria-label="Abrir menu">
                    {menuAberto ? <FaTimes /> : <FaBars />}
                </div>
                <div className={styles.logoHearderHomeUsuario}>
                    <Link to="/home">
                        <img src={logo} alt="Logo" className={styles.logoHearderHomeUsuario} />
                    </Link>
                </div>
                <div onClick={togglePerfil} className={styles.iconHomeUsuario} aria-label="Menu do perfil">
                    <FaUserCircle />
                </div>
                {perfilAberto && (
                    <div className={styles.perfilDropdownHomeUsuario}>
                        <ul>
                            <li><Link to="/notificacao">Notificações</Link></li>
                            <li><Link to="/editarperfil">Editar Perfil</Link></li>
                            <li><Link to="/login">Sair</Link></li>
                        </ul>
                    </div>
                )}
            </header>
            {/* Overlay para fechar o menu ao clicar fora */}
            {menuAberto && (
                <div className={styles.overlayHomeUsuario} onClick={toggleMenu}></div>
            )}
            <nav className={`${styles.menuLateralHomeUsuario} ${menuAberto ? styles.aberto : ''}`}>
                <div className={styles.menuHeaderHomeUsuario}>
                    <img src={logo} alt="Logo" />
                    <div onClick={toggleMenu} className={styles.menuFecharHomeUsuario} aria-label="Fechar menu">
                        <FaTimes />
                    </div>
                </div>
                <ul>
                    <li><FaPills className={styles.menuIconHomeUsuario} /><a href="/cadastrarmedicamento">Cadastrar Medicamentos</a></li>
                    <li><FaClock className={styles.menuIconHomeUsuario} /><a href="/agendarmedicamento">Agendar Medicamentos</a></li>
                    <li><FaCog className={styles.menuIconHomeUsuario} /><a href="/gerenciarmedicamento">Gerenciar Medicamentos</a></li>
                    <li><FaHistory className={styles.menuIconHomeUsuario} /><a href="/historico">Histórico</a></li>
                    <li><FaCalendarAlt className={styles.menuIconHomeUsuario} /><a href="/calendario">Calendário de Medicamentos</a></li>
                    <li><FaFileAlt className={styles.menuIconHomeUsuario} /><a href="/relatorio">Relatório</a></li>
                    <li><FaSearchPlus className={styles.menuIconHomeUsuario} /><a href="/dicas">Consulta de Medicamentos</a></li>
                </ul>
            </nav>
            {/* Assistente IA flutuante */}
            <AssistenteIA />
        </>
    );
}

export default HeaderHomeUsuario;

import { useState } from "react";
import styles from './HeaderHomeUsuario.module.css';
import { FaBars, FaTimes, FaUserCircle, FaPills, FaCalendarAlt, FaHistory, FaFileAlt, FaCog } from "react-icons/fa";

function HeaderHomeUsuario() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [perfilAberto, setPerfilAberto] = useState(false);

    // Alternar o menu lateral
    const toggleMenu = () => {
        setMenuAberto(!menuAberto);
    };

    // Alternar dropdown de perfil
    const togglePerfil = () => {
        setPerfilAberto(!perfilAberto);
    };

    return (
        <>
            <header className={styles.headerHomeUsuario}>
                <div onClick={toggleMenu} className={styles.iconHomeUsuario}>
                    {menuAberto ? <FaTimes /> : <FaBars />}
                </div>
                <h1 className={styles.tituloHomeUsuario}>MediCare</h1>
                <div onClick={togglePerfil} className={styles.iconHomeUsuario}>
                    <FaUserCircle />
                </div>
                {perfilAberto && (
                    <div className={styles.perfilDropdownHomeUsuario}>
                        <ul>
                            <li><a href="/notificacao">Notificações</a></li>
                            <li><a href="/editar-perfil">Editar Perfil</a></li>
                            <li><a href="/login">Sair</a></li>
                        </ul>
                    </div>
                )}
            </header>
            <nav className={`${styles.menuLateralHomeUsuario} ${menuAberto ? styles.aberto : ''}`}>
                <ul>
                    <li><FaPills className={styles.menuIconHomeUsuario} /><a href="/cadastrar-medicamento">Cadastrar Medicamentos</a></li>
                    <li><FaCalendarAlt className={styles.menuIconHomeUsuario} /><a href="/agendar-medicamento">Agendar Medicamento</a></li>
                    <li><FaCog className={styles.menuIconHomeUsuario} /><a href="/gerenciar-medicamento">Gerenciar Medicamento</a></li>
                    <li><FaHistory className={styles.menuIconHomeUsuario} /><a href="/historico">Histórico</a></li>
                    <li><FaCalendarAlt className={styles.menuIconHomeUsuario} /><a href="/calendario">Calendário de Medicamento</a></li>
                    <li><FaFileAlt className={styles.menuIconHomeUsuario} /><a href="/relatorio">Relatório</a></li>
                </ul>
            </nav>
        </>
    );
}

export default HeaderHomeUsuario;

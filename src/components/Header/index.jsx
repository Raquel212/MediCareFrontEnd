import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from './Header.module.css';
import logo from "../../assets/Logo_Sem.png";
import { FaBars, FaTimes, FaSignInAlt } from "react-icons/fa";

function Header() {
    const [menuAberto, setMenuAberto] = useState(false);

    const fecharMenu = () => setMenuAberto(false);

    return (
        <header className={styles.header}>
            <nav className={styles.nav} aria-label="Navegação principal">
                <Link to="/" className={styles.logoLink} onClick={fecharMenu}>
                    <img src={logo} alt="Logo MediCare" className={styles.logo} />
                </Link>

                <div className={styles.menuToggle} onClick={() => setMenuAberto(!menuAberto)} aria-label="Abrir menu">
                    {menuAberto ? <FaTimes /> : <FaBars />}
                </div>

                <div className={`${styles.links} ${menuAberto ? styles.aberto : ''}`}>
                    <NavLink
                        to="/"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.ativo}` : styles.link}
                        onClick={fecharMenu}
                    >
                        Início
                    </NavLink>
                    <NavLink
                        to="/quemSomos"
                        className={({ isActive }) => isActive ? `${styles.link} ${styles.ativo}` : styles.link}
                        onClick={fecharMenu}
                    >
                        Quem Somos
                    </NavLink>
                    <Link to="/login" className={styles.botaoLogin} onClick={fecharMenu}>
                        <FaSignInAlt className={styles.iconeLogin} />
                        <span>Entrar</span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;

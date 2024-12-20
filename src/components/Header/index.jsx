// import {FaRightToBracket} from 'react-icons/fa';
import {Link} from "react-router-dom";
import styles from './Header.module.css';
import logo from "../../assets/Logo_Sem.png";


function Header() {
    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={logo} alt="Logo" className={styles.logo}/>
                    </Link>
                </div>

                <div className={styles.quemSomos}>
                    <Link to="/quemSomos">
                        <span>Quem Somos</span>
                    </Link>
                </div>

                <div className={styles.login}>
                    <Link to="/login">
                        <span>Login</span>
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header;
// import {FaRightToBracket} from 'react-icons/fa';
// import {Link} from "react-router-dom";
import styles from './Header.module.css';
import logo from "../../assets/Logo_Sem.png";


function Header() {
    return(
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.logo}>
                    {/* <Link to="/">
                        <img src="logo.png" alt="Logo"/>
                    </Link> */}
                    <a href="">
                        <img src={logo} alt="Logo" className={styles.logo}/>
                    </a>
                </div>

                <div className={styles.quemSomos}>
                    <a href="">
                        <span>Quem Somos</span>
                    </a>
                </div>

                <div className={styles.login}>
                    {/* <Link to="/login">
                        <FaRightToBracket/>
                    </Link> */}
                    <a href="">
                        <span>Login</span>
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default Header;
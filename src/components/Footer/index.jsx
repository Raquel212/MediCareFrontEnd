import styles from './Footer.module.css';

function Footer(){
    return (
        <footer className={styles.footerHome}>
            <div className={styles.footerContent}>
                <div className={styles.footerLogo}>
                    <h2>MediCare</h2>
                    <p>Cuidando da sua saúde com tecnologia.</p>
                </div>
                <div className={styles.footerLinks}>
                    <h4>Links Úteis</h4>
                    <ul>
                        <li><a href="#about">Sobre</a></li>
                        <li><a href="#services">Serviços</a></li>
                        <li><a href="#contact">Contato</a></li>
                    </ul>
                </div>
                <div className={styles.footerSocial}>
                    <h4>Siga-nos</h4>
                    <div className={styles.socialIcons}>
                        <a href="https://facebook.com" target="_blank" rel="noreferrer">
                            <i className='fab fa-facebook-f'></i>
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer">
                            <i className='fab fa-instagram'></i>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className={styles.footerBottom}>
                <p>&copy; 2025 MediCare. <br />Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer;
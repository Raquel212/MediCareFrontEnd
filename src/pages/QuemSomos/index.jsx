import styles from './QuemSomos.module.css';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { FaPills, FaBell, FaHistory } from 'react-icons/fa'; 

function QuemSomos() {
    return (
        <>
            <Header />
            <section className={styles.quemSomos}>
                <div className={styles.quemSomosHero}>
                    <div className={styles.quemSomosTexto}>
                        <h1 className={styles.tituloquemSomos}>Bem-vindo ao MediCare</h1>
                        <p className={styles.textoquemSomos}>
                            No MediCare, nossa missão vai além de ser uma plataforma de saúde digital. 
                            Somos uma solução integrada para o gerenciamento de medicamentos, 
                            conectando tecnologia e cuidado humano para garantir mais segurança, 
                            organização e qualidade de vida.
                        </p>
                        <p className={styles.textoquemSomos}>
                            Com funcionalidades que incluem lembretes de medicação, 
                            monitoramento de tratamentos e histórico de uso, 
                            proporcionamos uma experiência que prioriza o bem-estar de cada usuário.
                        </p>
                        <p className={styles.textoquemSomos}>
                            Nossa equipe está comprometida em transformar a maneira como você gerencia 
                            sua saúde, com ferramentas inovadoras e uma abordagem centrada no que 
                            realmente importa: sua tranquilidade e saúde.
                        </p>
                    </div>
                    {/* A imagem do lado do texto */}
                    <div className={styles.quemSomosImagem}>
                        <img src="/Home.png" alt="Imagem de apresentação" className={styles.imagemQuemSomos} />
                    </div>
                </div>

                {/* Cards agora ficam abaixo */}
                <div className={styles.quemSomosCards}>
                    <div className={styles.card}>
                        <FaPills size={50} className={styles.cardIcon} />
                        <h3>Cadastro de Medicamentos</h3>
                        <p>Permitir que registrem seus medicamentos, incluindo nome, dosagem, frequência e horários de uso.</p>
                    </div>
                    <div className={styles.card}>
                        <FaBell size={50} className={styles.cardIcon} />
                        <h3>Lembrentes Personalizados</h3>
                        <p>Lembrar os horários de tomar os medicamentos.</p>
                    </div>
                    <div className={styles.card}>
                        <FaHistory size={50} className={styles.cardIcon} />
                        <h3>Histórico de Uso</h3>
                        <p>Registra dados sobre os medicamentos utilizados e horários em que foram tomados.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}

export default QuemSomos;

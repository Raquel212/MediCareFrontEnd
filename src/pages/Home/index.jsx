import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './Home.module.css';


function Home(){
    return(
        <>
            <Header/>
            <section className={styles.containerHome}>
                <div className={styles.apresentacao}>
                <h1 className={styles.tituloHome}>MediCare</h1>
                <p className={styles.textoHome}>
                    Mantenha o controle dos seus medicamentos de forma simples e prática. 
                    Com MediCare, você nunca mais esquecerá horários importantes e terá tudo o que precisa para cuidar da 
                    sua saúde com tranquilidade. Experimente agora!
                </p>
                <button className={styles.saibaMais}>Read more</button>
                </div>
                <div className={styles.imagemHome}>
                {/* Placeholder para imagem de design */}
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default Home;
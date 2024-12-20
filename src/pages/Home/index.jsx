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
                    Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.
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
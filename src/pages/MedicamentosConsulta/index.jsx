import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './MedicamentosConsulta.module.css';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import { medicamentos } from '../../services/medicamentosData';

function MedicamentosConsulta() {
    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState(null);

    const pesquisarMedicamento = () => {
        const resultadosFiltrados = medicamentos.filter((med) =>
            med.nome.toLowerCase().startsWith(busca.toLowerCase())
        );
        setResultado(resultadosFiltrados.length > 0 ? resultadosFiltrados : 'Nenhum medicamento encontrado.');
    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerMedicamentosConsulta}>
                <h1 className={styles.tituloMedicamentosConsulta}>Consulta de Medicamentos</h1>

                <section className={styles.areaBusca}>
                    <div className={styles.buscaContainer}>
                        <div className={styles.buscaWrap}>
                            <FaSearch className={styles.buscaIcone} />
                            <input
                                type="text"
                                placeholder="Digite o nome do medicamento"
                                className={styles.inputBusca}
                                value={busca}
                                onChange={(e) => setBusca(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && pesquisarMedicamento()}
                            />
                        </div>
                        <button className={styles.botaoBusca} onClick={pesquisarMedicamento}>
                            Pesquisar
                        </button>
                    </div>

                    <div className={styles.dicaBar}>
                        💡 Quer tirar uma dúvida sobre um medicamento? Clique no botão azul da IA no canto da tela e converse com o assistente!
                    </div>

                    {resultado && (
                        <div className={styles.resultadoContainer}>
                            {typeof resultado === 'string' ? (
                                <p className={styles.mensagemErro}>{resultado}</p>
                            ) : (
                                resultado.map((med, index) => (
                                    <div key={index} className={styles.medicamentoInfo}>
                                        <h2>{med.nome}</h2>
                                        <p><strong>Por que este medicamento é prescrito?</strong> {med.porquePrescrito}</p>
                                        <p><strong>Como este medicamento deve ser usado?</strong> {med.comoUsar}</p>
                                        <p><strong>Outros usos:</strong> {med.outrosUsos}</p>
                                        <p><strong>Precauções especiais:</strong> {med.precaucoes}</p>
                                        <p><strong>Instruções alimentares:</strong> {med.instrucoesAlimentares}</p>
                                        <p><strong>Esquecimento de dose:</strong> {med.esquecimento}</p>
                                        <p><strong>Efeitos colaterais:</strong> {med.efeitosColaterais}</p>
                                        <p><strong>Armazenamento e descarte:</strong> {med.armazenamento}</p>
                                        <p><strong>Emergência/overdose:</strong> {med.emergencia}</p>
                                        <p><strong>Outras informações:</strong> {med.outrasInformacoes}</p>
                                        <p><strong>Marcas:</strong> {med.marcas}</p>
                                        <p><strong>Outros nomes:</strong> {med.outrosNomes}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </section>
            </div>
            <Footer />
        </>
    );
}

export default MedicamentosConsulta;

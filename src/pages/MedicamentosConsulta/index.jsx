import { useState } from 'react';
import styles from './MedicamentosConsulta.module.css';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';

function MedicamentosConsulta() {
    // Dados de medicamentos exemplo
    const medicamentos = [
        {
            nome: 'Paracetamol',
            porquePrescrito: 'Para aliviar dor e febre.',
            comoUsar: 'Tomar uma cápsula a cada 6 horas, com ou sem alimentos.',
            outrosUsos: 'Usado em casos de dor muscular leve.',
            precaucoes: 'Não tomar em excesso. Consulte um médico se estiver grávida.',
            instrucoesAlimentares: 'Evitar álcool enquanto usar este medicamento.',
            esquecimento: 'Tome assim que lembrar, mas não duplique a dose.',
            efeitosColaterais: 'Náusea, tontura, reação alérgica em casos raros.',
            armazenamento: 'Armazenar em temperatura ambiente, longe de umidade.',
            emergencia: 'Procure atendimento médico em caso de overdose.',
            outrasInformacoes: 'Evite tomar com outros medicamentos que contêm paracetamol.',
            marcas: 'Tylenol, Doliprane.',
            outrosNomes: 'Acetaminofeno.'
        },
        {
            nome: 'Ibuprofeno',
            porquePrescrito: 'Para reduzir inflamação e dor.',
            comoUsar: 'Tomar uma cápsula de 400 mg a cada 8 horas após as refeições.',
            outrosUsos: 'Utilizado em casos de dor de cabeça e cólicas menstruais.',
            precaucoes: 'Evitar se tiver problemas renais ou estomacais.',
            instrucoesAlimentares: 'Tomar com alimentos para evitar irritação gástrica.',
            esquecimento: 'Pular a dose e seguir o horário regular.',
            efeitosColaterais: 'Azia, dor estomacal, tontura.',
            armazenamento: 'Guardar em local seco e fresco.',
            emergencia: 'Procure ajuda em caso de dificuldade respiratória.',
            outrasInformacoes: 'Não combine com anticoagulantes sem orientação médica.',
            marcas: 'Advil, Motrin.',
            outrosNomes: 'Ibuprofeno sódico.'
        },
        // Adicione outros 6 medicamentos com informações similares aqui...
    ];

    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState(null);

    // Função para pesquisar medicamentos
    const pesquisarMedicamento = () => {
        const medicamentoEncontrado = medicamentos.find(med => med.nome.toLowerCase() === busca.toLowerCase());
        setResultado(medicamentoEncontrado || 'Medicamento não encontrado.');
    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerMedicamentosConsulta}>
                <h1 className={styles.tituloMedicamentosConsulta}>Consulta de Medicamentos</h1>

                <div className={styles.buscaContainer}>
                    <input
                        type="text"
                        placeholder="Digite o nome do medicamento"
                        className={styles.inputBusca}
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                    <button className={styles.botaoBusca} onClick={pesquisarMedicamento}>Pesquisar</button>
                </div>

                {resultado && (
                    <div className={styles.resultadoContainer}>
                        {typeof resultado === 'string' ? (
                            <p className={styles.mensagemErro}>{resultado}</p>
                        ) : (
                            <div className={styles.medicamentoInfo}>
                                <h2>{resultado.nome}</h2>
                                <p><strong>Por que este medicamento é prescrito?</strong> {resultado.porquePrescrito}</p>
                                <p><strong>Como este medicamento deve ser usado?</strong> {resultado.comoUsar}</p>
                                <p><strong>Outros usos:</strong> {resultado.outrosUsos}</p>
                                <p><strong>Precauções especiais:</strong> {resultado.precaucoes}</p>
                                <p><strong>Instruções alimentares:</strong> {resultado.instrucoesAlimentares}</p>
                                <p><strong>Esquecimento de dose:</strong> {resultado.esquecimento}</p>
                                <p><strong>Efeitos colaterais:</strong> {resultado.efeitosColaterais}</p>
                                <p><strong>Armazenamento e descarte:</strong> {resultado.armazenamento}</p>
                                <p><strong>Emergência/overdose:</strong> {resultado.emergencia}</p>
                                <p><strong>Outras informações:</strong> {resultado.outrasInformacoes}</p>
                                <p><strong>Marcas:</strong> {resultado.marcas}</p>
                                <p><strong>Outros nomes:</strong> {resultado.outrosNomes}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default MedicamentosConsulta;

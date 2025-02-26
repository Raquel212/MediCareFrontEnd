import { useState } from 'react';
import styles from './MedicamentosConsulta.module.css';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';

function MedicamentosConsulta() {
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
        {
            nome: 'Dipirona',
            porquePrescrito: 'Para alívio da dor e febre.',
            comoUsar: 'Tomar 1 comprimido de 500 mg a cada 6 horas, se necessário.',
            outrosUsos: 'Usado para dores musculares e cólicas menstruais.',
            precaucoes: 'Evitar em casos de alergia à dipirona ou problemas renais.',
            instrucoesAlimentares: 'Pode ser tomado com ou sem alimentos.',
            esquecimento: 'Tomar assim que lembrar, sem dobrar a dose.',
            efeitosColaterais: 'Reações alérgicas, queda da pressão arterial.',
            armazenamento: 'Conservar em local seco e fresco.',
            emergencia: 'Procurar atendimento médico em caso de reação grave.',
            outrasInformacoes: 'Pode interagir com anticoagulantes.',
            marcas: 'Novalgina, Anador.',
            outrosNomes: 'Metamizol sódico.'
        },
        {
            nome: 'Omeprazol',
            porquePrescrito: 'Para tratar refluxo gástrico e gastrite.',
            comoUsar: 'Tomar 1 cápsula de 20 mg em jejum, uma vez ao dia.',
            outrosUsos: 'Pode ser indicado para úlceras gástricas.',
            precaucoes: 'Evitar uso prolongado sem orientação médica.',
            instrucoesAlimentares: 'Tomar antes das refeições.',
            esquecimento: 'Tomar assim que lembrar, mas não dobrar a dose.',
            efeitosColaterais: 'Dor de cabeça, náusea, tontura.',
            armazenamento: 'Manter em local seco e longe da luz.',
            emergencia: 'Buscar atendimento em caso de reação alérgica grave.',
            outrasInformacoes: 'Pode reduzir a absorção de vitamina B12.',
            marcas: 'Losec, Gastrol.',
            outrosNomes: 'Omeprazol magnésico.'
        },
        {
            nome: 'Amoxicilina',
            porquePrescrito: 'Para tratar infecções bacterianas.',
            comoUsar: 'Tomar 1 cápsula de 500 mg a cada 8 horas, por 7 dias.',
            outrosUsos: 'Infecções respiratórias, urinárias e de pele.',
            precaucoes: 'Evitar se for alérgico a penicilina.',
            instrucoesAlimentares: 'Pode ser tomado com ou sem alimentos.',
            esquecimento: 'Tomar assim que lembrar, sem dobrar a dose.',
            efeitosColaterais: 'Diarreia, náusea, erupção na pele.',
            armazenamento: 'Armazenar em local fresco e seco.',
            emergencia: 'Procurar atendimento médico em caso de reação alérgica.',
            outrasInformacoes: 'Interage com contraceptivos orais.',
            marcas: 'Amoxil, Novamox.',
            outrosNomes: 'Amoxicilina tri-hidratada.'
        },
        {
            nome: 'Losartana',
            porquePrescrito: 'Para controle da pressão arterial.',
            comoUsar: 'Tomar 1 comprimido de 50 mg uma vez ao dia.',
            outrosUsos: 'Pode ser indicado para insuficiência cardíaca.',
            precaucoes: 'Evitar se houver insuficiência renal grave.',
            instrucoesAlimentares: 'Pode ser tomado com ou sem alimentos.',
            esquecimento: 'Tomar assim que lembrar, sem dobrar a dose.',
            efeitosColaterais: 'Tontura, cansaço, queda de pressão.',
            armazenamento: 'Manter em local seco e longe do calor.',
            emergencia: 'Buscar ajuda médica se houver desmaios.',
            outrasInformacoes: 'Pode causar aumento do potássio no sangue.',
            marcas: 'Cozaar, Aradois.',
            outrosNomes: 'Losartana potássica.'
        },

        {
            nome: 'Parametasona',
            porquePrescrito: 'Para tratar inflamações e reações alérgicas.',
            comoUsar: 'Tomar 1 comprimido de 2 mg a cada 12 horas, conforme prescrição médica.',
            outrosUsos: 'Usado em doenças autoimunes e condições dermatológicas.',
            precaucoes: 'Evitar uso prolongado sem supervisão médica.',
            instrucoesAlimentares: 'Tomar com alimentos para evitar irritação no estômago.',
            esquecimento: 'Tomar assim que lembrar, sem dobrar a dose.',
            efeitosColaterais: 'Aumento do apetite, retenção de líquidos, insônia.',
            armazenamento: 'Armazenar em local seco e protegido da luz.',
            emergencia: 'Procurar ajuda médica em caso de reação alérgica grave.',
            outrasInformacoes: 'Pode afetar os níveis de glicose no sangue.',
            marcas: 'Não possui marcas comerciais conhecidas.',
            outrosNomes: 'Parametasona fosfato.'
        }        
    ];

    const [busca, setBusca] = useState('');
    const [resultado, setResultado] = useState(null);
    
    const pesquisarMedicamento = () => {
        const resultadosFiltrados = medicamentos.filter(med => med.nome.toLowerCase().startsWith(busca.toLowerCase()));
        setResultado(resultadosFiltrados.length > 0 ? resultadosFiltrados : 'Nenhum medicamento encontrado.');
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
            </div>
            <Footer />
        </>
    );
}

export default MedicamentosConsulta;

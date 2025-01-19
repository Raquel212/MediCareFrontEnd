import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './DetalhesMedicamentos.module.css';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function DetalhesMedicamento() {
    const medicamento = {
        nome: 'Paracetamol',
        dosagem: '500mg',
        horario: '8h00',
        frequencia: '3x ao dia',
        instrucoesUso: 'Tomar após as refeições com um copo de água.',
        efeitosColaterais: 'Dor de cabeça, náuseas, tontura.',
        historicoUso: 'Usado por 2 semanas sem efeitos adversos. Melhorei nas dores.',
    };


    const adesaoGraficoData = [
        { data: 'Semana 1', adesao: 80 },
        { data: 'Semana 2', adesao: 90 },
        { data: 'Semana 3', adesao: 85 },
    ];


    const chartData = {
        labels: adesaoGraficoData.map(item => item.data),
        datasets: [
            {
                label: 'Adesão ao Tratamento',
                data: adesaoGraficoData.map(item => item.adesao),
                borderColor: '#00AEEF',
                backgroundColor: '#E0F7FF',
                borderWidth: 2,
                fill: true,
            },
        ],
    };


    const imprimirRelatorio = () => {
        window.print();
    };


    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerDetalhes}>
                <h1 className={styles.tituloDetalhes}>Relatório Detalhado do Medicamento</h1>

                {/* Informações Básicas */}
                <div className={styles.informacoesBasicas}>
                    <h2>{medicamento.nome}</h2>
                    <p><strong>Dosagem:</strong> {medicamento.dosagem}</p>
                    <p><strong>Horário:</strong> {medicamento.horario}</p>
                    <p><strong>Frequência:</strong> {medicamento.frequencia}</p>
                </div>

                {/* Instruções de Uso */}
                <div className={styles.instrucoesUso}>
                    <h3>Instruções de Uso</h3>
                    <p>{medicamento.instrucoesUso}</p>
                </div>

                {/* Efeitos Colaterais */}
                <div className={styles.efeitosColaterais}>
                    <h3>Efeitos Colaterais</h3>
                    <p>{medicamento.efeitosColaterais}</p>
                </div>

                {/* Histórico de Uso */}
                <div className={styles.historicoUso}>
                    <h3>Histórico de Uso</h3>
                    <p>{medicamento.historicoUso}</p>
                </div>

                {/* Gráfico de Adesão */}
                <div className={styles.graficoAdesao}>
                    <h3>Gráfico de Adesão</h3>
                    <Line data={chartData} />
                </div>

                {/* Botões de Ação */}
                <div className={styles.botaoContainer}>
                <button className={styles.botaoImprimir} onClick={imprimirRelatorio}>Imprimir Relatório</button>
                    <Link to="/relatorio" className={styles.botaoVoltar}>Voltar</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetalhesMedicamento;

import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './DetalhesMedicamentos.module.css';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'; 
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function DetalhesMedicamento() {
    const medicamento = {
        nome: 'Paracetamol',
        dosagem: '500mg',
        horario: '8h00',
        frequencia: '3x ao dia',
        dataCompra: '10/02/2025',
        quantidadeEstoque: 20,
        quantidadeTomada: 10,
        programacaoUso: '3 vezes ao dia às 8h, 14h e 20h',
        previsaoAcabar: '15/03/2025',
        informacaoAdicional: 'Antibiótico',
    };

    const usoMedicamentos = [
        { nome: 'Paracetamol', quantidade: 10 },
        { nome: 'Ibuprofeno', quantidade: 5 },
        { nome: 'Omeprazol', quantidade: 7 }
    ];

    const chartData = {
        labels: usoMedicamentos.map(item => item.nome),
        datasets: [
            {
                label: 'Uso de Medicamentos',
                data: usoMedicamentos.map(item => item.quantidade),
                backgroundColor: '#00AEEF',
                borderWidth: 1,
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
                <div className={styles.containerFundoAlterado}>
                    <h1 className={styles.tituloDetalhes}>Relatório Detalhado</h1>

                    <div className={styles.informacoesBasicas}>
                        <h2>{medicamento.nome}</h2>
                        <p><strong>Dose por Unidade:</strong> {medicamento.dosagem}</p>
                        <p><strong>Data:</strong> {medicamento.dataCompra}</p>
                        <p><strong>Estoque Disponível:</strong> {medicamento.quantidadeEstoque}</p>
                        <p><strong>Comprimidos Utilizados:</strong> {medicamento.quantidadeTomada}</p>
                        <p><strong>Frequêcia de Uso:</strong> {medicamento.programacaoUso}</p>
                        <p><strong>Previsão de Término do Estoque:</strong> {medicamento.previsaoAcabar}</p>
                        <p><strong>Informação Adicional:</strong> {medicamento.informacaoAdicional}</p>
                    </div>

                    <div className={styles.graficoUso}>
                        <h3>Uso de Medicamentos</h3>
                        <Bar data={chartData} />
                    </div>

                    <div className={styles.botaoContainer}>
                        <button className={styles.botaoImprimir} onClick={imprimirRelatorio}>Imprimir Relatório</button>
                        <Link to="/relatorio" className={styles.botaoVoltar}>Voltar</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetalhesMedicamento;

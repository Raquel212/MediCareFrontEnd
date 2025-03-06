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
        dosagem: '1 comprimido',
        horario: '8h00',
        frequencia: '1x ao dia',
        dataCompra: '20/12/2024',
        quantidadeEstoque: 0,
        quantidadeTomada: 8,
        programacaoUso: 'Diária',
        previsaoAcabar: '28/12/2024',
        informacaoAdicional: 'Antibiótico',
        // contatoEmergencia: 'Dr. João - (79) 99999-9999',
    };

    const usoMedicamentos = [
        { nome: 'Paracetamol', quantidade: 8 },
        { nome: 'Ibuprofeno', quantidade: 5 },
        { nome: 'Clonazepam', quantidade: 7 }
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
                    <h1 className={styles.tituloDetalhes}>Relatório de Uso de Medicamentos</h1>

                    <div className={styles.informacoesBasicas}>
                        <h2>{medicamento.nome}</h2>
                        <table className={styles.tabelaInformacoes}>
                            <tbody>
                                <tr><td><strong>Dose por Unidade:</strong></td><td>{medicamento.dosagem}</td></tr>
                                <tr><td><strong>Data de Registro:</strong></td><td>{medicamento.dataCompra}</td></tr>
                                <tr><td><strong>Estoque Disponível:</strong></td><td>{medicamento.quantidadeEstoque}</td></tr>
                                <tr><td><strong>Comprimidos Utilizados:</strong></td><td>{medicamento.quantidadeTomada}</td></tr>
                                <tr><td><strong>Frequência de Uso:</strong></td><td>{medicamento.programacaoUso}</td></tr>
                                <tr><td><strong>Previsão de Término do Tratamento:</strong></td><td>{medicamento.previsaoAcabar}</td></tr>
                                <tr><td><strong>Informação Adicional:</strong></td><td>{medicamento.informacaoAdicional}</td></tr>
                                {/* {medicamento.contatoEmergencia && (
                                    <tr><td><strong>Contato de Emergência:</strong></td><td>{medicamento.contatoEmergencia}</td></tr>
                                )} */}
                            </tbody>
                        </table>
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

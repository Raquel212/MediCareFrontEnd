import { useState } from 'react';
import Calendar from 'react-calendar';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './CalendarioMedicamento.module.css';

function CalendarioMedicamento() {
    const [date, setDate] = useState(new Date());
    const [medicamentosPorData, setMedicamentosPorData] = useState({
        '2025-03-25': [
            { nome: 'Paracetamol', horario: '08:00', quantidade: '500mg', tomado: false },
            { nome: 'Ibuprofeno', horario: '14:00', quantidade: '200mg', tomado: false }
        ],
        '2025-03-14': [
            { nome: 'Amoxicilina', horario: '10:00', quantidade: '1 comprimido', tomado: false }
        ]
    });

    const handleDateChange = (newDate) => {
        setDate(newDate);
    };

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    };

    const handleTomarMedicamento = (dateString, index) => {
        const updatedMedicamentos = { ...medicamentosPorData };
        updatedMedicamentos[dateString][index].tomado = true;
        setMedicamentosPorData(updatedMedicamentos);
        alert(`${updatedMedicamentos[dateString][index].nome} marcado como tomado!`);
    };

    const dateString = formatDate(date);
    const medicamentosNoDia = medicamentosPorData[dateString] || [];

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerCalendarioMedicamento}>
                <h1 className={styles.tituloCalendarioMedicamento}>Calendário de Medicamentos</h1>

                <div className={styles.calendarContainer}>
                    <Calendar
                        onChange={handleDateChange}
                        value={date}
                        className={styles.calendar}
                    />
                </div>

                <div className={styles.medicamentosContainer}>
                    <h2>Medicamentos de {date.toLocaleDateString()}</h2>
                    {medicamentosNoDia.length > 0 ? (
                        <ul className={styles.medicamentoList}>
                            {medicamentosNoDia.map((medicamento, index) => (
                                <li key={index} className={styles.medicamentoItem}>
                                    <strong>{medicamento.nome}</strong><br />
                                    Horário: {medicamento.horario}<br />
                                    Quantidade: {medicamento.quantidade}<br />
                                    Status: {medicamento.tomado ? 'Tomado ✔' : 'Pendente ❌'}<br />
                                    {!medicamento.tomado && (
                                        <button onClick={() => handleTomarMedicamento(dateString, index)} className={styles.tomarMedicamentoButton}>
                                            Confirmar Tomada
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Nenhum medicamento cadastrado para este dia.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CalendarioMedicamento;
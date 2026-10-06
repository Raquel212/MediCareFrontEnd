import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './CalendarioMedicamento.module.css';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import { getAgendamentosPorData, marcarAgendamentoTomado } from '../../services/agendamentoStore';

function CalendarioMedicamentos() {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formatDate = (date) => {
        const d = new Date(date);
        const ano = d.getFullYear();
        const mes = String(d.getMonth() + 1).padStart(2, '0');
        const dia = String(d.getDate()).padStart(2, '0');
        return `${ano}-${mes}-${dia}`;
    };

    const handleDateChange = (date) => setSelectedDate(date);

    const currentMedications = getAgendamentosPorData(formatDate(selectedDate));

    const handleMedicationTaken = (med) => {
        if (med.taken || med.quantity <= 0) return;
        marcarAgendamentoTomado(med.id);
        // Força re-render refletindo a alteração
        setSelectedDate((prev) => new Date(prev));
    };

    const isTimeToTakeMedication = (scheduledTime) => {
        const now = new Date();
        const [hour, minute] = scheduledTime.split(':').map(Number);
        const scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
        return now >= scheduledDate;
    };

    return (
        <>
        <HeaderHomeUsuario />
        <div className={styles.container}>
            <h1 className={styles.title}>Calendário de Medicamentos</h1>
            <div className={styles.calendarContainer}>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    minDate={new Date()}
                    showNeighboringMonth={false}
                    className={styles.calendar}
                />
            </div>

            <div className={styles.medicationsList}>
                <h2 className={styles.medicationTitle}>Medicamentos para {selectedDate.toLocaleDateString('pt-BR')}</h2>

                {currentMedications.length > 0 ? (
                    <ul className={styles.medicationItems}>
                        {currentMedications.map((med, index) => (
                            <li key={index} className={styles.medicationItem}>
                                <div>
                                    <strong>{med.name}</strong> - {med.quantity} restantes
                                    <br />
                                    <strong>Agendado para:</strong> {med.scheduledTime} <br />
                                    <strong>Frenquência: </strong> {med.frequency}
                                </div>
                                <button
                                    className={styles.takeButton}
                                    onClick={() => handleMedicationTaken(med)}
                                    disabled={med.taken || med.quantity === 0 || !isTimeToTakeMedication(med.scheduledTime)}
                                >
                                    {med.taken ? "Medicamento Tomado" : med.quantity > 0 ? "Tomar" : "Sem Estoque"}
                                </button>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className={styles.noMedications}>Nenhum medicamento agendado para hoje.</p>
                )}
            </div>
        </div>
        <Footer />
    </>
    );
}

export default CalendarioMedicamentos;

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './CalendarioMedicamento.module.css';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';

function CalendarioMedicamentos() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState({
        "2025-03-12": [
            { name: "Escitalopram", quantity: 1, taken: false, scheduledTime: "12:00", frequency: "Diária"},
            { name: "Levotiroxina", quantity: 8, taken: false, scheduledTime: "21:00", frequency: "Uma vez antes de dormir"},
        ],
        "2025-03-13": [
            { name: "Amoxicilina", quantity: 1, taken: false, scheduledTime: "09:00", frequency: "Diária"},
            { name: "Aspirina", quantity: 1, taken: false, scheduledTime: "18:00", frequency: "Diária"},
        ],
    });

    const formatDate = (date) => date.toISOString().split('T')[0];

    const handleDateChange = (date) => setSelectedDate(date);

    const currentMedications = medications[formatDate(selectedDate)] || [];

    const handleMedicationTaken = (medName) => {
        setMedications((prevMedications) => {
            const dateKey = formatDate(selectedDate);
            const updatedMedications = { ...prevMedications };

            if (updatedMedications[dateKey]) {
                updatedMedications[dateKey] = updatedMedications[dateKey].map((med) => {
                    if (med.name === medName && med.quantity > 0 && !med.taken) {
                        return {
                            ...med,
                            taken: true,
                            quantity: med.quantity - 1,
                        };
                    }
                    return med;
                });
            }

            return updatedMedications;
        });
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
                                    Agendado para: {med.scheduledTime} <br />
                                    <strong>Frenquência: </strong> {med.frequency}
                                </div>
                                <button
                                    className={styles.takeButton}
                                    onClick={() => handleMedicationTaken(med.name)}
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

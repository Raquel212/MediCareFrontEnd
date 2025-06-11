import styles from './HomeUsuario.module.css';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import { FaLightbulb } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

function HomeUsuario() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState({
        "2025-06-12": [
            { name: "Escitalopram", quantity: 1, taken: false, scheduledTime: "12:00" },
            { name: "Levotiroxina", quantity: 8, taken: false, scheduledTime: "21:00" },
        ],
        "2025-06-13": [
            { name: "Amoxicilina", quantity: 1, taken: false, scheduledTime: "19:00" },
            { name: "Aspirina", quantity: 1, taken: false, scheduledTime: "21:00" },
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

    const formattedDate = selectedDate.toLocaleDateString('pt-BR');

    return (
        <>
            <HeaderHomeUsuario />
            <main className={styles.containerHomeUsuario}>
                <section className={styles.welcomeSection}>
                    <div>
                        <h1 className={styles.tituloWelcome}>Bem-vindo</h1>
                        <p className={styles.subtituloWelcome}>Vamos cuidar da sua saúde juntos!</p>
                    </div>
                </section>

                <section className={styles.cardsSection}>
                    <div className={styles.card}>
                        <h3 className={styles.calendarioTitulo}>Medicamentos Agendados</h3>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            className={styles.calendar}
                        />
                        <div className={styles.dateInfo}>
                            <h3 className={styles.tituloMedicaCalendar}>Medicamentos para {formattedDate}</h3>
                            {currentMedications.length === 0 ? (
                                <p>Não há medicamentos agendados para este dia.</p>
                            ) : (
                                <ul>
                                    {currentMedications.map((med, index) => (
                                        <li key={index} style={{ color: 'black' }}>
                                            {med.name} - {med.quantity} comprimido(s) - {med.scheduledTime}
                                            <button
                                                onClick={() => handleMedicationTaken(med.name)}
                                                className={styles.takeButton}
                                                disabled={!isTimeToTakeMedication(med.scheduledTime) || med.taken}
                                            >
                                                {med.taken ? 'Tomado' : 'Tomar'}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={styles.cardEs}>
                        <h3 className={styles.estoqueTitulo}>Medicamentos em Estoque</h3>
                        <ul>
                            {Object.keys(medications).map((date) =>
                                medications[date].map((med, index) => (
                                    <li key={index}>
                                        {med.name} - {med.quantity} comprimido(s) restantes
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>

                    <div className={styles.cardDica}>
                        <FaLightbulb className={styles.cardIcon} />
                        <p className={styles.textoDica}>
                            <strong>Dica do Dia:</strong> Uma boa noite de sono pode melhorar a eficácia dos seus medicamentos.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default HomeUsuario;

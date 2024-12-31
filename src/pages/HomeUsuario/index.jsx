import styles from './HomeUsuario.module.css';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import { FaLightbulb } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';

function HomeUsuario() {

    // Estado para armazenar o dia selecionado e os medicamentos do dia
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [medications, setMedications] = useState({
        "2024-12-24": [
            { name: "Paracetamol", quantity: 8 },
            { name: "Ibuprofeno", quantity: 1 },
        ],
        "2024-12-25": [
            { name: "Amoxicilina", quantity: 1 },
            { name: "Paracetamol", quantity: 1 },
        ],
        // Adicionar mais datas conforme necessário
    });

    // Função para formatar a data selecionada
    const formatDate = (date) => {
        return date.toISOString().split('T')[0];
    };

    // Função para lidar com a mudança de data no calendário
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // Obter os medicamentos para o dia selecionado
    const currentMedications = medications[formatDate(selectedDate)] || [];

    // Função para reduzir a quantidade de um medicamento quando o usuário toma
    const handleMedicationTaken = (medName) => {
        const updatedMedications = { ...medications };
        const dateKey = formatDate(selectedDate);

        if (updatedMedications[dateKey]) {
            const medicationIndex = updatedMedications[dateKey].findIndex(
                (med) => med.name === medName
            );
            if (medicationIndex !== -1 && updatedMedications[dateKey][medicationIndex].quantity > 0) {
                updatedMedications[dateKey][medicationIndex].quantity -= 1;
                setMedications(updatedMedications);
            }
        }
    };

    return (
        <>
            <HeaderHomeUsuario />
            <main className={styles.containerHomeUsuario}>
                <section className={styles.welcomeSection}>
                    <div>
                        <h1 className={styles.tituloWelcome}>Bem-vindo</h1>
                        <p className={styles.subtituloWelcome}> Vamos cuidar da sua saúde juntos!</p>
                    </div>
                </section>

                <section className={styles.cardsSection}>
                    <div className={styles.card}>
                        <h3 className={styles.calendarioTitulo}>Medicamentos para Tomar</h3>
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            className={styles.calendar}
                        />
                        <div className={styles.dateInfo}>
                            <h3 className={styles.tituloMedicaCalendar}>Medicamentos para {formatDate(selectedDate)}</h3>
                            {currentMedications.length === 0 ? (
                                <p>Não há medicamentos agendados para este dia.</p>
                            ) : (
                                <ul>
                                    {currentMedications.map((med, index) => (
                                        <li key={index}>
                                            {med.name} - {med.quantity} comprimido(s)
                                            <button
                                                onClick={() => handleMedicationTaken(med.name)}
                                                className={styles.takeButton}
                                            >
                                                Tomar
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
                        <p className={styles.textoDica}>Dica do Dia: Uma boa noite de sono pode melhorar a eficácia dos seus medicamentos.</p>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default HomeUsuario;

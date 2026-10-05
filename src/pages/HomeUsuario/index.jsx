import styles from './HomeUsuario.module.css';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import { FaLightbulb } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { getAgendamentosPorData, marcarAgendamentoTomado, resumoEstoque } from '../../services/agendamentoStore';

function HomeUsuario() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [, setAtualizacao] = useState(0);

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
        if (med.taken) return;
        marcarAgendamentoTomado(med.id);
        setAtualizacao((n) => n + 1);
    };

    const isTimeToTakeMedication = (scheduledTime) => {
        const now = new Date();
        const [hour, minute] = scheduledTime.split(':').map(Number);
        const scheduledDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute);
        return now >= scheduledDate;
    };

    const estoque = resumoEstoque();
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
                                                onClick={() => handleMedicationTaken(med)}
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
                        {estoque.length === 0 ? (
                            <p>Sem medicamentos em estoque.</p>
                        ) : (
                            <ul>
                                {estoque.map((med, index) => (
                                    <li key={index}>
                                        {med.name} - {med.quantity} comprimido(s) restantes {med.dosagem && `(${med.dosagem})`}
                                    </li>
                                ))}
                            </ul>
                        )}
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

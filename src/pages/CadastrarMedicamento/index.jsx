import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './CadastrarMedicamento.module.css';
import api from '../../services/api';

function CadastrarMedicamento() {
    const [form, setForm] = useState({
        nome: '',
        quantidadeTotal: '',
        dosagem: '',
        horarios: '',
        foto: null,
    });
    const [showNotification, setShowNotification] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'foto') {
            setForm({ ...form, [name]: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post('/medicamento', { 
            nome: form.nome, 
            quantidade: form.quantidadeTotal,
            dosagem: form.dosagem,
            horario: form.horarios,})
            .then((response) => { 
                console.log(response.data);
                setShowNotification(true); 
                setTimeout(() => setShowNotification(false), 3000); 
                setTimeout(() => {
                    navigate('/gerenciarmedicamento');
                }, 2000); 
            }).catch((error) => {
                console.error(error);
            });


    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.cadastrarMedicamento}>
                <h1 className={styles.tituloCadastrarMedicamento}>Cadastrar Medicamento</h1>

                {/* Notificação de sucesso */}
                {showNotification && (
                    <div className={styles.notificationCadastroMedicamento}>
                        Medicamento cadastrado com sucesso!
                    </div>
                )}

                <form className={styles.formMedicamento} onSubmit={handleSubmit}>
                    <label>
                        Nome do Remédio:
                        <input
                            type="text"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Quantidade Total:
                        <input
                            type="number"
                            name="quantidadeTotal"
                            value={form.quantidadeTotal}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Dosagem:
                        <input
                            type="number"
                            name="dosagem"
                            value={form.dosagem}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Intervalo:
                        <input
                            type="text"
                            name="horarios"
                            value={form.horarios}
                            onChange={handleChange}
                            placeholder="Ex: De 8h em 8h"
                            required
                        />
                    </label>
                    <button type="submit" className={styles.botaoCadastrar}>Cadastrar</button>
                </form>
            </div>
            <Footer />
        </>
    );
}

export default CadastrarMedicamento;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './CadastrarMedicamento.module.css';

function CadastrarMedicamento() {
    const [form, setForm] = useState({
        nome: '',
        quantidadeTotal: '',
        quantidadePorDia: '',
        horarios: '',
        foto: null,
    });
    const [showNotification, setShowNotification] = useState(false); // Estado para controle da notificação
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

        // Obter medicamentos existentes do localStorage
        const medicamentosExistentes = JSON.parse(localStorage.getItem('medicamentos')) || [];

        // Adicionar o novo medicamento
        const novoMedicamento = { ...form, foto: form.foto ? URL.createObjectURL(form.foto) : null };
        const medicamentosAtualizados = [...medicamentosExistentes, novoMedicamento];

        // Salvar no localStorage
        localStorage.setItem('medicamentos', JSON.stringify(medicamentosAtualizados));

        // Exibir a notificação de sucesso
        setShowNotification(true);

        // Redefinir formulário
        setForm({ nome: '', quantidadeTotal: '', quantidadePorDia: '', horarios: '', foto: null });

        // Esconder a notificação após 3 segundos
        setTimeout(() => setShowNotification(false), 3000); // Tempo reduzido para 3 segundos

        // Redirecionar para a tela de gerenciamento após a notificação desaparecer
        setTimeout(() => {
            navigate('/gerenciarmedicamento');
        }, 2000); // Garantir que a navegação ocorra após a notificação
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
                        Quantidade Por Dia:
                        <input
                            type="number"
                            name="quantidadePorDia"
                            value={form.quantidadePorDia}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Horários (separados por vírgula):
                        <input
                            type="text"
                            name="horarios"
                            value={form.horarios}
                            onChange={handleChange}
                            placeholder="Ex: 08:00, 12:00, 18:00"
                            required
                        />
                    </label>
                    <label>
                        Foto do Remédio:
                        <input
                            type="file"
                            name="foto"
                            onChange={handleChange}
                            accept="image/*"
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

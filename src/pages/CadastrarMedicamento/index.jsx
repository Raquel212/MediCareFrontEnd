import { useState } from 'react';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './CadastrarMedicamento.module.css';

function CadastrarMedicamento() {
    const [medicamentos, setMedicamentos] = useState([]); // Estado para armazenar os medicamentos
    const [form, setForm] = useState({
        nome: '',
        quantidadeTotal: '',
        quantidadePorDia: '',
        horarios: '',
        foto: null,
    });

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
        setMedicamentos([...medicamentos, form]); // Adiciona o medicamento ao estado
        setForm({ nome: '', quantidadeTotal: '', quantidadePorDia: '', horarios: '', foto: null }); // Limpa o formulário
    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.cadastrarMedicamento}>
                <h1 className={styles.tituloCadastrarMedicamento}>Cadastrar Medicamento</h1>
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
                <div className={styles.listaMedicamentos}>
                    <h2>Medicamentos Cadastrados</h2>
                    <ul>
                        {medicamentos.map((med, index) => (
                            <li key={index} className={styles.medicamentoItem}>
                                <p><strong>Nome:</strong> {med.nome}</p>
                                <p><strong>Quantidade Total:</strong> {med.quantidadeTotal}</p>
                                <p><strong>Quantidade Por Dia:</strong> {med.quantidadePorDia}</p>
                                <p><strong>Horários:</strong> {med.horarios}</p>
                                {med.foto && (
                                    <img
                                        src={URL.createObjectURL(med.foto)}
                                        alt={`Foto de ${med.nome}`}
                                        className={styles.fotoMedicamento}
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default CadastrarMedicamento;

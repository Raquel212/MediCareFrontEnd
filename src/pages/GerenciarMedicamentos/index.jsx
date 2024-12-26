import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './GerenciarMedicamentos.module.css';

function GerenciarMedicamento() {
    const [medicamentos, setMedicamentos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMedicamento, setCurrentMedicamento] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        // Carregar medicamentos do localStorage
        const medicamentosSalvos = JSON.parse(localStorage.getItem('medicamentos')) || [];
        setMedicamentos(medicamentosSalvos);
    }, []);

    const handleDelete = (index) => {
        const medicamentosAtualizados = medicamentos.filter((_, i) => i !== index);
        setMedicamentos(medicamentosAtualizados);
        localStorage.setItem('medicamentos', JSON.stringify(medicamentosAtualizados));
    };

    const handleEdit = (index) => {
        setCurrentMedicamento(medicamentos[index]);
        setEditIndex(index);
        setIsEditing(true);
    };

    const saveEdit = () => {
        const medicamentosAtualizados = medicamentos.map((med, i) =>
            i === editIndex ? currentMedicamento : med
        );
        setMedicamentos(medicamentosAtualizados);
        localStorage.setItem('medicamentos', JSON.stringify(medicamentosAtualizados));
        setIsEditing(false);
        setCurrentMedicamento(null);
    };

    const closeModal = () => {
        setIsEditing(false);
        setCurrentMedicamento(null);
    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.gerenciarMedicamento}>
                <h1 className={styles.tituloGerenciarMedicamento}>Gerenciar Medicamentos</h1>
                {medicamentos.length === 0 ? (
                    <p className={styles.mensagem}>Nenhum medicamento cadastrado.</p>
                ) : (
                    <ul className={styles.listaMedicamentos}>
                        {medicamentos.map((medicamento, index) => (
                            <li key={index} className={styles.medicamentoItem}>
                                <div className={styles.medicamentoInfo}>
                                    <p><strong>Nome:</strong> {medicamento.nome}</p>
                                    <p><strong>Quantidade Total:</strong> {medicamento.quantidadeTotal}</p>
                                    <p><strong>Quantidade Por Dia:</strong> {medicamento.quantidadePorDia}</p>
                                    <p><strong>Horários:</strong> {medicamento.horarios}</p>
                                    {medicamento.foto && (
                                        <img
                                            src={medicamento.foto}
                                            alt={medicamento.nome}
                                            className={styles.medicamentoFoto}
                                        />
                                    )}
                                </div>
                                <div className={styles.acoes}>
                                    <button onClick={() => handleEdit(index)} className={styles.botaoEditar}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(index)} className={styles.botaoExcluir}>
                                        Excluir
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Modal de Edição */}
            {isEditing && (
                <>
                    <div className={styles.modalOverlay} onClick={closeModal}></div>
                    <div className={styles.modal}>
                        <h2>Editar Medicamento</h2>
                        <label>
                            Nome:
                            <input
                                type="text"
                                value={currentMedicamento.nome}
                                onChange={(e) => setCurrentMedicamento({ ...currentMedicamento, nome: e.target.value })}
                            />
                        </label>
                        <label>
                            Quantidade Total:
                            <input
                                type="number"
                                value={currentMedicamento.quantidadeTotal}
                                onChange={(e) => setCurrentMedicamento({ ...currentMedicamento, quantidadeTotal: e.target.value })}
                            />
                        </label>
                        <label>
                            Quantidade Por Dia:
                            <input
                                type="number"
                                value={currentMedicamento.quantidadePorDia}
                                onChange={(e) => setCurrentMedicamento({ ...currentMedicamento, quantidadePorDia: e.target.value })}
                            />
                        </label>
                        <label>
                            Horários:
                            <input
                                type="text"
                                value={currentMedicamento.horarios}
                                onChange={(e) => setCurrentMedicamento({ ...currentMedicamento, horarios: e.target.value })}
                            />
                        </label>
                        <button onClick={saveEdit} className={styles.botaoSalvar}>Salvar</button>
                        <button onClick={closeModal} className={styles.botaoCancelar}>Cancelar</button>
                    </div>
                </>
            )}

            <Footer />
        </>
    );
}

export default GerenciarMedicamento;

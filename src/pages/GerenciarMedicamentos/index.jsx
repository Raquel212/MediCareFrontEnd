import { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import styles from './GerenciarMedicamentos.module.css';
import api from '../../services/api';

function GerenciarMedicamento() {
    const [medicamentos, setMedicamentos] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentMedicamento, setCurrentMedicamento] = useState(null);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        // Dados de exemplo de medicamentos
        api
      .get("/medicamento?pagina=1&quantidadePorPagina=1000")
      .then((response) => setMedicamentos(response.data))
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
        
    }, []);


    
    const handleDelete = (index, medicamento) => {
        console.log(medicamento);
        api
        .delete(`/medicamento/${medicamento.id}`)
        .then((response) => console.log(response.data))
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
        const medicamentosAtualizados = medicamentos.filter((_, i) => i !== index);
        setMedicamentos(medicamentosAtualizados);
    };

    const handleEdit = (index, medicamento) => {
        console.log(medicamento);
        api
        .get(`/medicamento/${medicamento.id}`)
        .then((response) => {
            setCurrentMedicamento(response.data)
            setEditIndex(index);
            setIsEditing(true);
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
    };

    const saveEdit = () => {
        console.log(currentMedicamento);
        api
        .put(`/medicamento/${currentMedicamento.id}`,{
            nome: currentMedicamento.nome, 
            quantidade: currentMedicamento.quantidade, 
            dosagem: currentMedicamento.dosagem, 
            horario: currentMedicamento.horario})
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.error("ops! ocorreu um erro" + err);
        });
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
                                    <p><strong>Quantidade Total:</strong> {medicamento.quantidade}</p>
                                    <p><strong>Dosagem:</strong> {medicamento.dosagem}</p>
                                    <p><strong>Horários:</strong> {medicamento.horario}</p>
                                    {medicamento.foto && (
                                        <img
                                            src={medicamento.foto}
                                            alt={medicamento.nome}
                                            className={styles.medicamentoFoto}
                                        />
                                    )}
                                </div>
                                <div className={styles.acoes}>
                                    <button onClick={() => handleEdit(index, medicamento)} className={styles.botaoEditar}>
                                        Editar
                                    </button>
                                    <button onClick={() => handleDelete(index, medicamento)} className={styles.botaoExcluir}>
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
                                value={currentMedicamento.quantidade}
                                onChange={(e) => setCurrentMedicamento({ ...currentMedicamento, quantidade: e.target.value })}
                            />
                        </label>
                        <label>
                            Dosagem:
                            <input
                                type="number"
                                value={currentMedicamento.dosagem}
                                onChange={(e) => setCurrentMedicamento({ ...currentMedicamento, dosagem: e.target.value })}
                            />
                        </label>
                        <label>
                            Horários:
                            <input
                                type="text"
                                value={currentMedicamento.horario}
                                onChange={(e) => setCurrentMedicamento({ ...currentMedicamento, horario: e.target.value })}
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

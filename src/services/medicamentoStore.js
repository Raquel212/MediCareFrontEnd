import { medicamentosFixos } from './mockMedicamentos';

// ============================================================
// Armazenamento local dos medicamentos de demonstração.
// Permite que Cadastrar, Agendar e Gerenciar compartilhem os
// dados fixos mesmo sem o backend disponível.
// ============================================================

const CHAVE = 'medicamentosFixosMediCare';

// Retorna a lista de medicamentos de demonstração (sempre parte dos exemplos fixos)
export function getMedicamentosFixos() {
    try {
        const salvos = localStorage.getItem(CHAVE);
        if (salvos) {
            const dados = JSON.parse(salvos);
            if (Array.isArray(dados) && dados.length > 0) {
                return dados;
            }
        }
    } catch (e) {
        console.warn('Não foi possível ler os medicamentos salvos.', e);
    }
    return [...medicamentosFixos];
}

export function salvarMedicamentosFixos(lista) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(lista));
    } catch (e) {
        console.warn('Não foi possível salvar os medicamentos.', e);
    }
}

export function adicionarMedicamentoFixo(medicamento) {
    const lista = getMedicamentosFixos();
    const novo = { ...medicamento, id: Date.now() };
    lista.push(novo);
    salvarMedicamentosFixos(lista);
    return novo;
}

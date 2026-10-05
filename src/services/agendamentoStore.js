// ============================================================
// Armazenamento dos agendamentos para o Calendário.
// Compartilhado entre a Home do Usuário, a tela de Calendário,
// Cadastrar Medicamento e Agendar Medicamento.
// Quando o backend não está disponível, funciona 100% localmente
// para que seja possível ver como ficaria na tela.
// ============================================================

const CHAVE = 'agendamentosMediCare';

// Data local no formato ISO (YYYY-MM-DD)
function dataLocalISO(date = new Date()) {
    const d = new Date(date);
    const ano = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    return `${ano}-${mes}-${dia}`;
}

// Converte uma data DD/MM/AAAA (ex: do formulário) para ISO
export function converterParaISO(dataDDMMAAAA) {
    if (!dataDDMMAAAA) return dataLocalISO();
    const partes = String(dataDDMMAAAA).split('/');
    if (partes.length === 3) {
        return `${partes[2]}-${partes[1]}-${partes[0]}`;
    }
    return dataDDMMAAAA;
}

// Gera exemplos fixos relativos a hoje/tomorrow/depois
function criarSeed() {
    const hoje = dataLocalISO();
    const amanha = dataLocalISO(new Date(Date.now() + 86400000));
    const depois = dataLocalISO(new Date(Date.now() + 172800000));
    return [
        { id: 1, name: 'Paracetamol', data: hoje, scheduledTime: '08:00', frequency: 'A cada 8 horas', quantity: 30, taken: false, dosagem: '500mg' },
        { id: 2, name: 'Ibuprofeno', data: hoje, scheduledTime: '12:00', frequency: 'A cada 6 horas', quantity: 20, taken: false, dosagem: '400mg' },
        { id: 3, name: 'Amoxicilina', data: amanha, scheduledTime: '08:00', frequency: 'A cada 8 horas', quantity: 21, taken: false, dosagem: '500mg' },
        { id: 4, name: 'Dipirona', data: amanha, scheduledTime: '20:00', frequency: 'A cada 6 horas', quantity: 15, taken: false, dosagem: '500mg' },
        { id: 5, name: 'Omeprazol', data: depois, scheduledTime: '06:00', frequency: 'Em jejum, 1x ao dia', quantity: 28, taken: false, dosagem: '20mg' },
    ];
}

export function getAgendamentos() {
    try {
        const salvos = localStorage.getItem(CHAVE);
        if (salvos) {
            const dados = JSON.parse(salvos);
            if (Array.isArray(dados)) {
                return dados;
            }
        }
    } catch (e) {
        console.warn('Não foi possível ler os agendamentos.', e);
    }
    // Sem dados salvos, busca medicamentos fixos cadastrados também
    const seed = criarSeed();
    salvarAgendamentos(seed);
    return seed;
}

export function salvarAgendamentos(lista) {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(lista));
    } catch (e) {
        console.warn('Não foi possível salvar os agendamentos.', e);
    }
}

export function limparAgendamentos() {
    try {
        localStorage.removeItem(CHAVE);
    } catch (e) {
        console.warn('Não foi possível limpar os agendamentos.', e);
    }
}

// Retorna os agendamentos de uma data específica (ISO YYYY-MM-DD)
export function getAgendamentosPorData(dataISO) {
    return getAgendamentos().filter((a) => a.data === dataISO);
}

// Adiciona um novo agendamento e salva
export function adicionarAgendamento({ name, data, scheduledTime, frequency, quantity, dosagem }) {
    const lista = getAgendamentos();
    const novo = {
        id: Date.now(),
        name,
        data: data || dataLocalISO(),
        scheduledTime: scheduledTime || '08:00',
        frequency: frequency || 'Diária',
        quantity: Number(quantity) > 0 ? Number(quantity) : 1,
        taken: false,
        dosagem: dosagem || '',
    };
    lista.push(novo);
    salvarAgendamentos(lista);
    return novo;
}

// Marca um agendamento como tomado (e reduz a quantidade restante)
export function marcarAgendamentoTomado(id) {
    const lista = getAgendamentos();
    const atualizada = lista.map((ag) => {
        if (ag.id === id && !ag.taken && ag.quantity > 0) {
            return { ...ag, taken: true, quantity: ag.quantity - 1 };
        }
        return ag;
    });
    salvarAgendamentos(atualizada);
    return atualizada;
}

// Resumo de estoque: por medicamento (com a quantidade mais recente em cada nome)
export function resumoEstoque() {
    const lista = getAgendamentos();
    const ultimos = {};
    lista.forEach((ag) => {
        const atual = ultimos[ag.name];
        if (!atual || ag.data >= atual.data) {
            ultimos[ag.name] = ag;
        }
    });
    return Object.values(ultimos).map((ag) => ({
        name: ag.name,
        quantity: ag.quantity,
        dosagem: ag.dosagem,
    }));
}

import { medicamentos } from './medicamentosData.js';

// ============================================================
// Assistente IA local do MediCare
// Entende perguntas em português sobre os medicamentos da base
// e responde com as informações disponíveis, sem depender de
// nenhum serviço externo.
// ============================================================

// Remove acentos e normaliza o texto para facilitar a busca
const normalizar = (texto) =>
    texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

// Encontra o medicamento citado na pergunta (procura o nome mais longo primeiro)
function encontrarMedicamento(perguntaNorm) {
    const porTamanho = [...medicamentos].sort((a, b) => b.nome.length - a.nome.length);
    for (const med of porTamanho) {
        const nomeNorm = normalizar(med.nome);
        if (nomeNorm.length > 2 && perguntaNorm.includes(nomeNorm)) {
            return med;
        }
    }
    return null;
}

// Detecta a intenção da pergunta
function detectarIntencao(perguntaNorm) {
    const intencoes = [
        { id: 'efeitos', palavras: ['efeitos colaterais', 'efeito colateral', 'sintomas colaterais', 'reacao', 'reacoes adversas', 'efeitos'] },
        { id: 'interacoes', palavras: ['interacoes', 'interacao', 'combinar', 'combinacao', 'interfere', 'anticoagulante', 'outros medicamentos'] },
        { id: 'esquecimento', palavras: ['esquecimento', 'esquecer', 'esqueci', 'esqueceu', 'pular a dose', 'pular', 'esqueceu de tomar'] },
        { id: 'emergencia', palavras: ['emergencia', 'overdose', 'superdosagem', 'excesso de dose', 'socorro'] },
        { id: 'armazenamento', palavras: ['armazenamento', 'armazenar', 'guardar', 'conservar', 'descarte', 'geladeira', 'longe da luz'] },
        { id: 'marcas', palavras: ['marcas', 'marca comercial', 'qual a marca', 'quais marcas'] },
        { id: 'outrosnomes', palavras: ['outros nomes', 'tambem chamado', 'generico', 'nome generico'] },
        { id: 'precaucoes', palavras: ['precaucoes', 'precaução', 'cuidados', 'cuidado', 'contraindicacao', 'contraindicacoes', 'gravida', 'alergia', 'alergico', 'nao posso tomar', 'evitar'] },
        { id: 'alimentar', palavras: ['instrucoes alimentares', 'instrucao alimentar', 'comer', 'jejum', 'alimentos', 'alimentacao', 'refeicao', 'refeicoes', 'alcool', 'estomago'] },
        { id: 'comotomar', palavras: ['como tomar', 'como usar', 'como devo tomar', 'como devo usar', 'posologia', 'dosagem', 'dose', 'quantas vezes', 'quanto tomar', 'horario', 'horario certo', 'frequencia'] },
        { id: 'outrasinfos', palavras: ['outras informacoes', 'outras informacao', 'informacoes adicionais', 'outra informacao'] },
        { id: 'porque', palavras: ['para que serve', 'o que serve', 'o que e', 'indicado para', 'para que', 'indicacao', 'trata', 'prescrito', 'utilizado para'] },
    ];
    for (const { id, palavras } of intencoes) {
        if (palavras.some((palavra) => perguntaNorm.includes(palavra))) {
            return id;
        }
    }
    return 'geral';
}

// Monta uma resposta amigável segundo a intenção detectada
function respostaMedicamento(med, intencao) {
    switch (intencao) {
        case 'efeitos':
            return `Os efeitos colaterais de ${med.nome} são: ${med.efeitosColaterais}`;
        case 'interacoes':
            return `Sobre interações com ${med.nome}: ${med.outrasInformacoes}`;
        case 'esquecimento':
            return `Esqueceu de tomar ${med.nome}? Sem problemas: ${med.esquecimento}`;
        case 'emergencia':
            return `⚠️ Emergência/overdose de ${med.nome}: ${med.emergencia}`;
        case 'armazenamento':
            return `Como armazenar ${med.nome}: ${med.armazenamento}`;
        case 'marcas':
            return `As marcas comerciais de ${med.nome} são: ${med.marcas}`;
        case 'outrosnomes':
            return `${med.nome} também é conhecido como: ${med.outrosNomes}`;
        case 'precaucoes':
            return `Precauções com ${med.nome}: ${med.precaucoes}`;
        case 'alimentar':
            return `Instruções alimentares de ${med.nome}: ${med.instrucoesAlimentares}`;
        case 'comotomar':
            return `Como tomar ${med.nome}: ${med.comoUsar}`;
        case 'outrasinfos':
            return `Outras informações sobre ${med.nome}: ${med.outrasInformacoes}`;
        case 'porque':
            return `O ${med.nome} é usado ${med.porquePrescrito.toLowerCase()} ${med.outrosUsos ? 'Outros usos: ' + med.outrosUsos : ''}`.replace(/\s+/g, ' ').trim();
        default:
            return `Aqui está um resumo sobre o ${med.nome}:\n\n• **Para que serve:** ${med.porquePrescrito}\n• **Como usar:** ${med.comoUsar}\n• **Efeitos colaterais:** ${med.efeitosColaterais}\n• **Precauções:** ${med.precaucoes}`;
    }
}

const saudaVaria = [
    'saudacao', 'oi', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'eae', 'opa'
];

const agradecimentos = ['obrigado', 'obrigada', 'valeu', 'agradeco', 'grato'];

const despedidas = ['tchau', 'adeus', 'ate logo', 'falou', 'ate mais'];

// Função principal: recebe a pergunta do usuário e devolve a resposta da IA
export function responderIA(pergunta) {
    const texto = pergunta.trim();
    if (!texto) {
        return 'Pode mandar sua pergunta! Por exemplo: "Como tomar o Ibuprofeno?" ou "Quais os efeitos colaterais da Amoxicilina?"';
    }

    const norm = normalizar(texto);

    // Saudação
    if (saudaVaria.some((p) => norm === p || norm.startsWith(p + ' ') || (p === 'oi' && norm === 'oi'))) {
        return 'Olá! 👋 Sou o assistente do MediCare. Pergunte qualquer coisa sobre os medicamentos da minha base, como "O que é Paracetamol?", "Como tomar Ibuprofeno?" ou "Efeitos colaterais de Amoxicilina?".';
    }

    // Pedido de ajuda / apresentação
    if (norm.includes('quem e voce') || norm.includes('o que voce faz') || norm.includes('me ajuda') || norm.includes('como funciona') || norm === 'ajuda') {
        return 'Sou a IA do MediCare! 🤖 Tenho informações sobre medicamentos da nossa base (Paracetamol, Ibuprofeno, Dipirona, Omeprazol, Amoxicilina, Losartana e Parametasona). Pergunte sobre posologia, efeitos, precauções, armazenamento e mais.';
    }

    // Listar medicamentos
    if (norm.includes('quais medicamentos') || norm.includes('lista de medicamentos') || norm.includes('listar') || norm.includes('que medicamentos') || norm.includes('quais remedios')) {
        const nomes = medicamentos.map((m) => m.nome).join(', ');
        return `Tenho informações sobre estes medicamentos: ${nomes}. Pergunte sobre qualquer um deles!`;
    }

    // Agradecimento
    if (agradecimentos.some((p) => norm.includes(p))) {
        return 'Por nada! 😊 Estou aqui para ajudar. Se precisar de mais alguma informação, é só perguntar.';
    }

    // Despedida
    if (despedidas.some((p) => norm.includes(p))) {
        return 'Até logo! 👋 Cuide-se e não se esqueça de tomar seus medicamentos no horário certo.';
    }

    // Busca o medicamento citado
    const med = encontrarMedicamento(norm);
    if (med) {
        const intencao = detectarIntencao(norm);
        return respostaMedicamento(med, intencao) + '\n\n⚠️ *Informações de caráter educativo. Consulte sempre um profissional de saúde.*';
    }

    // Nenhum medicamento encontrado na base
    return 'Desculpe, não encontrei esse medicamento na minha base de dados. 😕\n\nPosso falar sobre: Paracetamol, Ibuprofeno, Dipirona, Omeprazol, Amoxicilina, Losartana e Parametasona.\n\nTente perguntar, por exemplo: "Como tomar o Ibuprofeno?" ou "Quais os efeitos colaterais da Amoxicilina?".';
}

// Sugestões rápidas para o usuário clicar no chat
export const sugestoesIA = [
    'O que é Paracetamol?',
    'Como tomar Ibuprofeno?',
    'Efeitos colaterais da Amoxicilina',
    'Precauções da Losartana',
    'Como armazenar Omeprazol?',
    'O que fazer se esquecer de tomar?'
];

// ============================================================
// Armazenamento do PIN do responsável (controle parental).
// O PIN protege ações sensíveis: editar/excluir medicamentos
// e visualizar o relatório.
//
// Regras:
//  - O PIN é definido UMA vez, junto com o e-mail do responsável
//    (que não pode ser o mesmo da conta).
//  - Depois de cadastrado, o usuário da conta NÃO consegue trocar
//    ou remover o PIN: é obrigatória a confirmação pelo e-mail
//    do responsável cadastrado.
// ============================================================

const CHAVE_PIN = 'pinMediCare';
const CHAVE_EMAIL = 'emailResponsavelMediCare';

// Hash simples (FNV-1a) para não guardar o PIN em texto puro no navegador
function hash(texto) {
    let h = 2166136261;
    for (let i = 0; i < String(texto).length; i++) {
        h ^= String(texto).charCodeAt(i);
        h = Math.imul(h, 16777619);
    }
    return (h >>> 0).toString(36);
}

export function hasPin() {
    try {
        return !!localStorage.getItem(CHAVE_PIN);
    } catch {
        return false;
    }
}

export function getEmailResponsavel() {
    try {
        return localStorage.getItem(CHAVE_EMAIL) || '';
    } catch {
        return '';
    }
}

// Salva o PIN e, quando informado, o e-mail do responsável
export function definirPin(pin, emailResponsavel) {
    try {
        localStorage.setItem(CHAVE_PIN, hash(pin));
        if (emailResponsavel) {
            localStorage.setItem(
                CHAVE_EMAIL,
                String(emailResponsavel).trim().toLowerCase()
            );
        }
    } catch {
        console.warn('Não foi possível salvar o PIN.');
    }
}

export function removerPin() {
    try {
        localStorage.removeItem(CHAVE_PIN);
        localStorage.removeItem(CHAVE_EMAIL);
    } catch {
        console.warn('Não foi possível remover o PIN.');
    }
}

// Valida o PIN informado. Sem PIN definido, libera (sem proteção).
export function validarPin(pin) {
    const guardado = (() => {
        try {
            return localStorage.getItem(CHAVE_PIN);
        } catch {
            return null;
        }
    })();
    if (!guardado) {
        return true;
    }
    return hash(pin) === guardado;
}

// Verifica se o e-mail informado é o e-mail do responsável cadastrado
export function validarEmailResponsavel(email) {
    const guardado = getEmailResponsavel().trim().toLowerCase();
    const informado = String(email || '').trim().toLowerCase();
    return !!guardado && guardado === informado;
}

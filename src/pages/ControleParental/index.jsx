import { useState } from 'react';
import {
    FaLock,
    FaLockOpen,
    FaShieldAlt,
    FaCheckCircle,
    FaEnvelope,
    FaKey,
} from 'react-icons/fa';
import styles from './ControleParental.module.css';
import HeaderHomeUsuario from '../../components/HeaderHomeUsuario';
import Footer from '../../components/Footer';
import {
    hasPin,
    definirPin,
    removerPin,
    validarEmailResponsavel,
    getEmailResponsavel,
} from '../../services/pinStore';

// E-mail da conta logada (o responsável não pode usar o mesmo)
function contaEmail() {
    try {
        return localStorage.getItem('medicareUsuario') || 'paciente@gmail.com';
    } catch {
        return 'paciente@gmail.com';
    }
}

function mascararEmail(email) {
    const texto = String(email || '').trim();
    if (!texto) return '';
    const [usuario, dominio] = texto.split('@');
    const parteUsuario = usuario && usuario.length > 1 ? `${usuario[0]}***` : '***';
    return `${parteUsuario}@${dominio || '...'}`;
}

function validarFormatoEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

function ControleParental() {
    const [pinDefinido, setPinDefinido] = useState(hasPin());
    const [etapa, setEtapa] = useState(hasPin() ? 'configurado' : 'setup');

    // Cadastro inicial
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [emailResponsavel, setEmailResponsavel] = useState('');

    // Verificação por e-mail
    const [acaoAposCodigo, setAcaoAposCodigo] = useState('alterar');
    const [emailVerificar, setEmailVerificar] = useState('');
    const [codigo, setCodigo] = useState('');
    const [codigoEnviado, setCodigoEnviado] = useState('');

    // Novo PIN (após confirmação)
    const [novoPin, setNovoPin] = useState('');
    const [confirmNovoPin, setConfirmNovoPin] = useState('');

    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');

    const limparErros = () => {
        setErro('');
        setSucesso('');
    };

    // ============ Cadastro do PIN (primeira vez) ============
    const pedirCadastro = (e) => {
        e.preventDefault();
        limparErros();

        if (pin.length !== 4) {
            setErro('O PIN deve ter 4 dígitos.');
            return;
        }
        if (pin !== confirmPin) {
            setErro('Os PINs digitados não coincidem.');
            return;
        }
        if (!validarFormatoEmail(emailResponsavel)) {
            setErro('Informe um e-mail de responsável válido.');
            return;
        }
        if (emailResponsavel.trim().toLowerCase() === contaEmail().trim().toLowerCase()) {
            setErro('O e-mail do responsável não pode ser o mesmo da conta.');
            return;
        }

        // Confirmação antes de cadastrar
        setMostrarConfirmacao(true);
    };

    const confirmarCadastro = () => {
        definirPin(pin, emailResponsavel);
        setPinDefinido(true);
        setEtapa('configurado');
        setMostrarConfirmacao(false);
        setPin('');
        setConfirmPin('');
        setEmailResponsavel('');
        setErro('');
        setSucesso('PIN cadastrado com sucesso! Agora ele protege as ações sensíveis.');
    };

    // ============ Alterar / Remover (exige confirmação por e-mail) ============
    const iniciarAcao = (acao) => {
        setAcaoAposCodigo(acao);
        setEtapa('verificar-email');
        setErro('');
        setSucesso('');
    };

    const enviarCodigo = () => {
        limparErros();
        if (!validarFormatoEmail(emailVerificar)) {
            setErro('Informe um e-mail válido.');
            return;
        }
        if (emailVerificar.trim().toLowerCase() === contaEmail().trim().toLowerCase()) {
            setErro('O e-mail não pode ser o mesmo da conta.');
            return;
        }
        if (!validarEmailResponsavel(emailVerificar)) {
            setErro('Este e-mail não é o e-mail do responsável cadastrado.');
            return;
        }

        const novoCodigo = String(Math.floor(100000 + Math.random() * 900000));
        setCodigoEnviado(novoCodigo);
        setCodigo('');
        setEtapa('verificar-codigo');
    };

    const confirmarCodigo = () => {
        limparErros();
        if (codigo.length !== 6) {
            setErro('Digite o código de 6 dígitos recebido por e-mail.');
            return;
        }
        if (codigo !== codigoEnviado) {
            setCodigo('');
            setErro('Código incorreto. Tente novamente.');
            return;
        }

        if (acaoAposCodigo === 'remover') {
            removerPin();
            setPinDefinido(false);
            setEtapa('setup');
            setCodigoEnviado('');
            setEmailVerificar('');
            setSucesso('Proteção por PIN removida com sucesso.');
        } else {
            setEtapa('novo-pin');
            setSucesso('Código confirmado! Agora defina o novo PIN.');
        }
    };

    const salvarNovoPin = (e) => {
        e.preventDefault();
        limparErros();

        if (novoPin.length !== 4) {
            setErro('O novo PIN deve ter 4 dígitos.');
            return;
        }
        if (novoPin !== confirmNovoPin) {
            setErro('Os novos PINs digitados não coincidem.');
            return;
        }

        // Mantém o mesmo e-mail do responsável já cadastrado
        definirPin(novoPin, getEmailResponsavel());
        setNovoPin('');
        setConfirmNovoPin('');
        setCodigoEnviado('');
        setEmailVerificar('');
        setEtapa('configurado');
        setSucesso('PIN alterado com sucesso!');
    };

    const cancelarFluxo = () => {
        setEtapa(pinDefinido ? 'configurado' : 'setup');
        setErro('');
        setSucesso('');
        setCodigo('');
        setCodigoEnviado('');
        setEmailVerificar('');
        setNovoPin('');
        setConfirmNovoPin('');
    };

    return (
        <>
            <HeaderHomeUsuario />
            <div className={styles.containerControle}>
                <h1 className={styles.tituloControle}>Controle Parental</h1>
                <p className={styles.subtituloControle}>
                    O PIN protege ações sensíveis (editar/excluir medicamentos e ver o
                    relatório). O e-mail do responsável deve ser diferente do e-mail da
                    conta e é usado para confirmar qualquer alteração do PIN.
                </p>

                {sucesso && (
                    <div className={styles.avisoSucesso}>
                        <FaCheckCircle /> {sucesso}
                    </div>
                )}

                <div className={styles.cardControle}>
                    <FaShieldAlt className={styles.cardIcone} />
                    <h2 className={styles.cardTitulo}>
                        {pinDefinido ? 'Proteção configurada' : 'Definir PIN do responsável'}
                    </h2>
                    <p className={styles.cardStatus}>
                        {pinDefinido ? (
                            <>
                                <FaLock /> Proteção ativada
                            </>
                        ) : (
                            <>
                                <FaLockOpen /> Sem proteção definida
                            </>
                        )}
                    </p>

                    {/* ---------- Etapa: cadastro inicial ---------- */}
                    {etapa === 'setup' && (
                        <form className={styles.formControle} onSubmit={pedirCadastro}>
                            <label>
                                Definir PIN (4 dígitos):
                                <input
                                    type="password"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={4}
                                    placeholder="• • • •"
                                    value={pin}
                                    onChange={(e) => {
                                        setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                                        setErro('');
                                    }}
                                    required
                                />
                            </label>
                            <label>
                                Confirmar PIN:
                                <input
                                    type="password"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={4}
                                    placeholder="• • • •"
                                    value={confirmPin}
                                    onChange={(e) => {
                                        setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                                        setErro('');
                                    }}
                                    required
                                />
                            </label>
                            <label>
                                E-mail do responsável:
                                <input
                                    type="email"
                                    placeholder="responsavel@exemplo.com"
                                    value={emailResponsavel}
                                    onChange={(e) => {
                                        setEmailResponsavel(e.target.value);
                                        setErro('');
                                    }}
                                    required
                                />
                            </label>
                            <p className={styles.dicaObs}>
                                <FaEnvelope /> O e-mail do responsável não pode ser o mesmo da
                                conta ({mascararEmail(contaEmail())}). Ele será usado para
                                confirmar alterações futuras do PIN.
                            </p>
                            {erro && <p className={styles.erroMsg}>{erro}</p>}
                            <button type="submit" className={styles.botaoSalvar}>
                                Cadastrar PIN
                            </button>
                        </form>
                    )}

                    {/* ---------- Etapa: já configurado ---------- */}
                    {etapa === 'configurado' && (
                        <div className={styles.fluxoAcao}>
                            <div className={styles.infosResponsavel}>
                                <p>
                                    <strong>E-mail do responsável:</strong>{' '}
                                    {mascararEmail(getEmailResponsavel())}
                                </p>
                                <p className={styles.dicaObs}>
                                    <FaLock /> Depois de cadastrado, o PIN só pode ser alterado ou
                                    removido com a confirmação pelo e-mail do responsável. O
                                    usuário da conta não consegue trocar sozinho.
                                </p>
                            </div>
                            <div className={styles.botoesFluxo}>
                                <button
                                    className={styles.botaoSalvar}
                                    onClick={() => iniciarAcao('alterar')}
                                >
                                    Alterar PIN
                                </button>
                                <button
                                    className={styles.botaoRemover}
                                    onClick={() => iniciarAcao('remover')}
                                >
                                    Remover proteção
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ---------- Etapa: informar e-mail do responsável ---------- */}
                    {etapa === 'verificar-email' && (
                        <div className={styles.fluxoAcao}>
                            <p className={styles.passoTitulo}>
                                Para {acaoAposCodigo === 'remover' ? 'remover' : 'alterar'} o PIN,
                                informe o e-mail do responsável cadastrado:
                            </p>
                            <input
                                type="email"
                                placeholder="e-mail do responsável"
                                className={styles.emailInput}
                                value={emailVerificar}
                                onChange={(e) => {
                                    setEmailVerificar(e.target.value);
                                    setErro('');
                                }}
                            />
                            {erro && <p className={styles.erroMsg}>{erro}</p>}
                            <div className={styles.botoesFluxo}>
                                <button className={styles.botaoSalvar} onClick={enviarCodigo}>
                                    Enviar código de confirmação
                                </button>
                                <button className={styles.botaoRemover} onClick={cancelarFluxo}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ---------- Etapa: confirmar código recebido ---------- */}
                    {etapa === 'verificar-codigo' && (
                        <div className={styles.fluxoAcao}>
                            <p className={styles.passoTitulo}>
                                Código de confirmação enviado para{' '}
                                <strong>{mascararEmail(emailVerificar)}</strong>.
                            </p>
                            <div className={styles.demoEmail}>
                                <FaEnvelope /> Simulação de e-mail — seu código é:{' '}
                                <strong>{codigoEnviado}</strong>
                            </div>
                            <input
                                type="password"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                placeholder="• • • • • •"
                                className={styles.emailInput}
                                value={codigo}
                                onChange={(e) => {
                                    setCodigo(e.target.value.replace(/\D/g, '').slice(0, 6));
                                    setErro('');
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && confirmarCodigo()}
                            />
                            {erro && <p className={styles.erroMsg}>{erro}</p>}
                            <div className={styles.botoesFluxo}>
                                <button className={styles.botaoSalvar} onClick={confirmarCodigo}>
                                    Confirmar código
                                </button>
                                <button className={styles.botaoRemover} onClick={cancelarFluxo}>
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ---------- Etapa: definir novo PIN ---------- */}
                    {etapa === 'novo-pin' && (
                        <form className={styles.formControle} onSubmit={salvarNovoPin}>
                            <p className={styles.passoTitulo}>
                                <FaKey /> Código confirmado! Defina o novo PIN:
                            </p>
                            <label>
                                Novo PIN (4 dígitos):
                                <input
                                    type="password"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={4}
                                    placeholder="• • • •"
                                    value={novoPin}
                                    onChange={(e) => {
                                        setNovoPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                                        setErro('');
                                    }}
                                    required
                                />
                            </label>
                            <label>
                                Confirmar novo PIN:
                                <input
                                    type="password"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={4}
                                    placeholder="• • • •"
                                    value={confirmNovoPin}
                                    onChange={(e) => {
                                        setConfirmNovoPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                                        setErro('');
                                    }}
                                    required
                                />
                            </label>
                            {erro && <p className={styles.erroMsg}>{erro}</p>}
                            <div className={styles.botoesFluxo}>
                                <button type="submit" className={styles.botaoSalvar}>
                                    Salvar novo PIN
                                </button>
                                <button
                                    type="button"
                                    className={styles.botaoRemover}
                                    onClick={cancelarFluxo}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            {/* Modal de confirmação antes de cadastrar o PIN */}
            {mostrarConfirmacao && (
                <>
                    <div
                        className={styles.modalOverlay}
                        onClick={() => setMostrarConfirmacao(false)}
                    ></div>
                    <div className={styles.modalConfirmacao}>
                        <FaLock className={styles.modalIcone} />
                        <h3>Tem certeza que deseja cadastrar o PIN?</h3>
                        <p>
                            Depois de cadastrado, ele protege ações sensíveis e só poderá ser
                            alterado ou removido com confirmação pelo e-mail do responsável.
                        </p>
                        <div className={styles.modalAcoes}>
                            <button
                                className={styles.modalConfirmar}
                                onClick={confirmarCadastro}
                            >
                                Sim, cadastrar
                            </button>
                            <button
                                className={styles.modalCancelar}
                                onClick={() => setMostrarConfirmacao(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </>
            )}

            <Footer />
        </>
    );
}

export default ControleParental;

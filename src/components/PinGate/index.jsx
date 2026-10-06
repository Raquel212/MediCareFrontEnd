import { useState } from 'react';
import { FaLock, FaTimes } from 'react-icons/fa';
import PropTypes from 'prop-types';
import styles from './PinGate.module.css';
import { validarPin } from '../../services/pinStore';

function PinGate({ aberto, titulo, mensagem, aoFechar, aoConfirmar }) {
    const [pin, setPin] = useState('');
    const [erro, setErro] = useState('');

    if (!aberto) return null;

    const confirmar = () => {
        if (pin.length < 4) {
            setErro('Digite o PIN de 4 dígitos.');
            return;
        }
        if (validarPin(pin)) {
            setPin('');
            setErro('');
            aoConfirmar();
        } else {
            setPin('');
            setErro('PIN incorreto. Tente novamente.');
        }
    };

    const fechar = () => {
        setPin('');
        setErro('');
        aoFechar();
    };

    return (
        <>
            <div className={styles.pinOverlay} onClick={fechar}></div>
            <div className={styles.pinModal} role="dialog" aria-modal="true" aria-label={titulo}>
                <button className={styles.pinFechar} onClick={fechar} aria-label="Fechar">
                    <FaTimes />
                </button>
                <FaLock className={styles.pinIcone} />
                <h2 className={styles.pinTitulo}>{titulo}</h2>
                {mensagem && <p className={styles.pinMensagem}>{mensagem}</p>}

                <input
                    type="password"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={4}
                    placeholder="• • • •"
                    className={styles.pinInput}
                    value={pin}
                    autoFocus
                    onChange={(e) => {
                        setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                        setErro('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && confirmar()}
                />

                {erro && <p className={styles.pinErro}>{erro}</p>}

                <div className={styles.pinAcoes}>
                    <button className={styles.pinConfirmar} onClick={confirmar}>
                        Confirmar
                    </button>
                    <button className={styles.pinCancelar} onClick={fechar}>
                        Cancelar
                    </button>
                </div>
            </div>
        </>
    );
}

PinGate.propTypes = {
    aberto: PropTypes.bool.isRequired,
    titulo: PropTypes.string,
    mensagem: PropTypes.string,
    aoFechar: PropTypes.func.isRequired,
    aoConfirmar: PropTypes.func.isRequired,
};

PinGate.defaultProps = {
    titulo: 'Proteção por PIN',
    mensagem: 'Digite o PIN do responsável para continuar.',
};

export default PinGate;

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useBankStore } from '../hooks';


export const OperacionCliente = ({ cliente, setShowModal }) => {
 
  const [valorTransaccion, setValorTransaccion] = useState(0);
  const [selectedCuenta, setSelectedCuenta] = useState('');
  const [selectedTipoTransaccion, setSelectedTipoTransaccion] = useState('');
  const [saldoDisponible, setSaldoDisponible] = useState(0);
  const tipos = useSelector((state) => state.banco.transaccionTipo);
  const { getTipeTransaction, starTransaction } = useBankStore();

  useEffect(() => {
    getTipeTransaction();
  },[cliente]);

  useEffect(() => {
    if (cliente && cliente.cuentas) {
        const cuentaSeleccionada = cliente.cuentas.find(cuenta => String(cuenta.numero_cuenta) === selectedCuenta);
      if (cuentaSeleccionada) {
        setSaldoDisponible(cuentaSeleccionada.saldo); 
      }
    }
  }, [selectedCuenta, cliente]);
  
  const handleCuentaChange = (event) => {
    setSelectedCuenta(event.target.value);
    
  };

  const handleTipoTransaccionChange = (event) => {
    setSelectedTipoTransaccion(event.target.value);
  };

  const handleValorTransaccionChange = (event) => {
    setValorTransaccion(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const tipoTransaccionNumerico = Number(selectedTipoTransaccion);
    const valorTransaccionNumerico = Number(valorTransaccion);

  if (tipoTransaccionNumerico === 2 && valorTransaccionNumerico > saldoDisponible) {
    alert('El importe de la transacción no puede ser mayor que el saldo disponible.');
    return;
  }
    
    await starTransaction(selectedCuenta, selectedTipoTransaccion, valorTransaccion);
    setShowModal(false);
  };


  return (
        <div className="container">
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="cuenta" className="form-label">
            Cuenta:
            </label>
            <select
            className="form-select"
            id="cuenta"
            value={selectedCuenta}
            onChange={handleCuentaChange}
            required
            >
            <option value="" disabled>
                Seleccionar cuenta
            </option>
            {cliente && cliente.cuentas.map((cuenta) => (
                <option key={cuenta.numero_cuenta} value={cuenta.numero_cuenta}>
                    {cuenta.nombre_cuenta}
                </option>
                ))
            }
            </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tipoTransaccion" className="form-label">
            Tipo Transacción:
          </label>
          <select
            className="form-select"
            id="tipoTransaccion"
            value={selectedTipoTransaccion}
            onChange={handleTipoTransaccionChange}
            required
          >
            <option value="" disabled>
              Seleccionar tipo de transacción
            </option>
            {tipos[0] && tipos.map((tipo) => (
              <option key={tipo.id_tipo_transaccion} value={tipo.id_tipo_transaccion}>
                {tipo.nombre_transaccion}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="saldo" className="form-label">
            Saldo:
          </label>
          <input
            type="number"
            className="form-control"
            id="saldo"
            value={saldoDisponible}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="valorTransaccion" className="form-label">
            Valor Transacción USD:
          </label>
          <input type="number" className="form-control" id="valorTransaccion"  onChange={handleValorTransaccionChange} required/>
        </div>
        <div className="mb-3 d-flex justify-content-evenly">
          <button type="button" className="btn btn-danger" aria-label="Close" onClick={() => setShowModal(false)}>
            Cancelar
          </button>
          <button type="submit" className="btn btn-success">
            Procesar
          </button>
        </div>
      </form>
    </div>
  );
};
OperacionCliente.propTypes = {
    cliente: PropTypes.object.isRequired,
    setShowModal: PropTypes.func.isRequired,
  };
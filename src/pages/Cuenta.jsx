import  { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBankStore } from '../hooks';

export const Cuenta = () => {
  const [nombre_cuenta, setNombreCuenta] = useState('');
  const [monto_apertura, setMontoApertura] = useState('');
  const [saldo, setSaldo] = useState('');
  const [estado_cuenta, setEstadoCuenta] = useState(''); 
  const { dui } = useParams();
  const {starCreateAccount} = useBankStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const cuenta = { nombre_cuenta, monto_apertura, saldo, estado_cuenta };
  
    starCreateAccount(dui, cuenta); 

    navigate("/")
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center">Formulario de Apertura de Cuenta</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombreCuenta">Nombre de la Cuenta:</label>
              <input type="text" className="form-control" id="nombreCuenta" value={nombre_cuenta} onChange={(e) => setNombreCuenta(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="montoApertura">Monto de Apertura:</label>
              <input type="number" className="form-control" id="montoApertura" value={monto_apertura} onChange={(e) => setMontoApertura(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="saldo">Saldo:</label>
              <input type="number" className="form-control" id="saldo" value={saldo} onChange={(e) => setSaldo(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="estadoCuenta">Estado de la Cuenta:</label>
              <select className="form-control" id="estadoCuenta" value={estado_cuenta} onChange={(e) => setEstadoCuenta(e.target.value)} required>
                <option value="">Selecciona un estado</option>
                <option value="A">Activa</option>
                <option value="I">Inactiva</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" >Abrir Cuenta</button>
          </form>
        </div>
      </div>
    </div>
  );
};

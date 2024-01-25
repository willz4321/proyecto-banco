import { useSelector } from 'react-redux';
import { Navigate, useNavigate  } from 'react-router-dom'; 
import { useState } from 'react';
import { useBankStore } from '../hooks';

export const App = () => {
 
  const [dui, setDui] = useState('');
  const [cliente, setCliente] = useState(null);
  const [redirect, setRedirect] = useState(false); 
  const navigate = useNavigate();
  const { getClientByDui } = useBankStore();

  const handleSearch = async () => {
    // Validar longitud del DUI entre 9 y 10 dígitos
    if (!(dui.length >= 9 && dui.length <= 10)) {
      alert('El DUI debe tener entre 9 y 10 dígitos.');
      return;
    }

    try {
      const clienteEncontrado = getClientByDui(dui);

      if (!clienteEncontrado) {
        navigate(`/cuenta/${dui}`);
      } else {
        setCliente(null);
        setRedirect(true); // Activa el redireccionamiento
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (redirect) {
    return <Navigate to="/cliente" />;
  }

  const handleClient = () => {
    navigate('/listaclientes');
  }

  return (
    <>
      <h1 className='text-center text-body-secondary pt-4'>Gestión de clientes y cuentas</h1>
      <div className="container-fluid pt-5 d-flex justify-content-center">
        <div className="row">
          <div className="col-10">
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="DUI" value={dui} onChange={(e) => setDui(e.target.value)} maxLength="10"/>
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button" onClick={handleSearch}>Buscar</button>
              </div>
            </div>
          </div>
          <div className="col-2">
            <button className="btn btn-primary" type='button' onClick={handleClient}>Clientes</button>
          </div>
        </div>
      </div>  
    </>
  );
}
import { useState } from "react";
import { useBankStore } from '../hooks';
import { useNavigate  } from 'react-router-dom'; 

export const Cliente = () => {
  const { starCreateClient } = useBankStore();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState({
    nombre: '',
    apellidos: '',
    dui: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCliente(prevCliente => ({
      ...prevCliente,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!(cliente.dui.length >= 9 && cliente.dui.length <= 10)) {
      alert('El DUI debe tener entre 9 y 10 dígitos.');
      return;
    }

    if (!cliente.nombre || !cliente.apellidos || !cliente.dui) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    console.log('Datos del nuevo cliente:', cliente);
    starCreateClient(cliente);
  };

  const onCLickCuenta = () => {
    navigate(`/cuenta/${cliente.dui}`);
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center">Formulario de Creación de Cliente</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" className="form-control" id="nombre" name="nombre" value={cliente.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="apellidos">Apellidos:</label>
              <input type="text" className="form-control" id="apellidos" name="apellidos" value={cliente.apellidos} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="dui">DUI:</label>
              <input type="text" className="form-control" id="dui" name="dui" value={cliente.dui} onChange={handleChange} maxLength="10" required />
            </div>
            <button type="submit" className="btn btn-primary" onClick={onCLickCuenta}>Crear Cliente</button>
          </form>
        </div>
      </div>
    </div>
  );
};

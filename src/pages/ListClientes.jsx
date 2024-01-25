import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useBankStore } from '../hooks';
import { OperacionCliente } from './OperacionCLiente';
import { Link } from 'react-router-dom';

export const ListClientes = () => {

  const [showModal, setShowModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const clientes = useSelector((state) => state.banco.clientes);
  const { getClients } = useBankStore();
  
  useEffect(() => {
    getClients();
  }, [])

  const toggleModal = (cliente) => {
    setSelectedClient(cliente);
    setShowModal(!showModal);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseModal = () => {
    setShowModal(!showModal);
    getClients();
  };


  return (
    <div className="container mt-4">
      <h1 className="text-center">Listado de Clientes</h1>
      
       <Link to="/" className="btn btn-primary" style={{ position: 'absolute', left: '10px', top: '10px' }}>
        Inicio
      </Link>
      
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>DUI</th>
            <th>NOMBRES</th>
            <th>APELLIDOS</th>
            <th>OPERACION</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clientes) &&
            clientes.map((cliente) => (
              <tr key={cliente.cod_cliente}>
                <td>{cliente.cod_cliente}</td>
                <td>{cliente.dui}</td>
                <td>{cliente.nombre}</td>
                <td>{cliente.apellidos}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => toggleModal(cliente)}>
                    OPERAR
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal para la operación del cliente */}
      {showModal && (
        <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} onClick={toggleModal}>
          <div className="modal-dialog" onClick={handleModalClick}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Operación Cliente</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                {/* Renderiza el componente OperacionCliente y pasa el cliente seleccionado como prop */}
                <OperacionCliente cliente={selectedClient}  setShowModal={handleCloseModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import { useState } from "react";

function Hoja({ id, titulo, descripcion, estado, onEditarEstado, onBorrar }) {
  const [nuevoEstado, setNuevoEstado] = useState(estado);


  const estadoClases = {
    'pendiente': 'bg-red-500 text-white',
    'en proceso': 'bg-yellow-500 text-gray-800',
    'completada': 'bg-green-500 text-white',
  };

  const handleEditarEstado = () => {
    if (nuevoEstado !== estado) {
      onEditarEstado(id, nuevoEstado);
    }
  };

  const handleBorrar = () => {
    
    if (window.confirm(`¿Estás seguro de que quieres borrar la tarea "${titulo}"?`)) {
      onBorrar(id);
    }
  };

  return (
    
    <div className={`
        relative border-l-4 p-4 rounded-md shadow-md
        transition-colors duration-300 ease-in-out
        ${estado === 'completada' ? 'border-green-500 bg-green-50' : 
          estado === 'en proceso' ? 'border-yellow-500 bg-yellow-50' : 
          'border-red-500 bg-red-50'}
    `}>
      
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">{titulo}</h3>
      
        <span className={`
            px-2 py-1 rounded-full text-xs font-semibold
            ${estadoClases[estado]}
        `}>
          {estado}
        </span>
      </div>

      <p className="text-gray-600 text-base mb-4">{descripcion}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          
          <label htmlFor={`estado-${id}`} className="text-gray-700">Cambiar estado:</label>
          <select
            id={`estado-${id}`}
            value={nuevoEstado}
            onChange={e => setNuevoEstado(e.target.value)}
            onBlur={handleEditarEstado}
            className="px-2 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pendiente">Pendiente</option>
            <option value="en proceso">En Proceso</option>
            <option value="completada">Completada</option>
          </select>
        </div>
        
       
        <button
          onClick={handleBorrar}
          className="bg-red-500 text-white text-sm p-2 rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Borrar
        </button>
      </div>
    </div>
  );
}

export default Hoja;
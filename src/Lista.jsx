import React, { useState } from 'react';
import Hoja from './Hoja';

function Lista({ tareas, editarTarea, borrarTarea }) {
  const [busqueda, setBusqueda] = useState('');

  const tareasFiltradas = tareas.filter(tar =>
    tar.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar tarea..."
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      {tareasFiltradas.length > 0 ? (
        <div className="flex flex-wrap justify-center m-4">
          {tareasFiltradas.map(tar => (
            <Hoja
              key={tar.id}
              titulo={tar.titulo}
              descripcion={tar.descripcion}
              estado={tar.estado}
              onEditarEstado={(nuevoEstado) => editarTarea(tar.id, nuevoEstado)}
              onBorrar={() => borrarTarea(tar.id)}
            />
          ))}
        </div>
      ) : (
        <p>No se encontraron tareas.</p>
      )}
    </div>
  );
}

export default Lista;

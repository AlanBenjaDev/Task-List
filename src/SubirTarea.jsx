import React, { useState } from 'react';

function SubirTarea({ agregarTarea }) {

  const [titulo, setTitulo] = useState(''); 
   const [descripcion, setDescripcion] = useState('');
 const [estado, setEstado] = useState('pendiente');


 const subirTarea = async (e) => {
  e.preventDefault();

  if (!titulo || !descripcion || !estado) {
  alert('Por favor completa todos los campos');
 return;
 }

 const token = localStorage.getItem('token');
 
 if (!token) {
 alert('Debes iniciar sesión para subir una tarea.');
 return;
 }

 const data = { titulo, descripcion, estado };

   try {
 const res = await fetch('https://task-list-trk9.onrender.com/api/tareas/subir', {
 method: 'POST',
 
 headers: { 
 'Content-Type': 'application/json',
 'Authorization': `Bearer ${token}` 
 }, 
 body: JSON.stringify(data),

 });

 if (res.ok) {
 const nuevaTarea = await res.json();
 
 setTitulo('');
 setDescripcion('');
 setEstado('pendiente');
 } else {
 const error = await res.json();
 alert('❌ Error al subir la tarea: ' + (error?.error || ''));
}
 } catch (error) {
 console.error('❌ Error de conexión:', error);
 alert('Error de conexión con el servidor');
 }
 };


  return (
 <div className="p-4 max-w-md mx-auto">
 <h2 className="text-2xl mb-4 font-bold">Cuaderno de Tareas</h2>



  <form onSubmit={subirTarea} className="flex flex-col gap-3">
   <input
          type="text"
             placeholder="Título"
                   value={titulo}
 onChange={e => setTitulo(e.target.value)}
 className="border p-2 rounded"
    required
 />

 <textarea
       placeholder="Descripción"
      value={descripcion}
     onChange={e => setDescripcion(e.target.value)}
     className="border p-2 rounded"
    required
 />

 <select
 value={estado}
 onChange={e => setEstado(e.target.value)}
 className="border p-2 rounded"
   required
   >
   <option value="pendiente">Pendiente</option>
   <option value="en proceso">En Proceso</option>
   <option value="completada">Completada</option>
    </select>

   <button
  type="submit"
   className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
 >
 Subir Tarea
      </button>
   </form>
 
 </div>
   );
}

export default SubirTarea;
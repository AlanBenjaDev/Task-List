const router = express.Router();
import express from 'express';
import autenticarToken from './autenticacion.js'
import db from './db.js';
let wss;

export function setWebSocketServer(wsServer) {

 wss = wsServer;

}



router.post('/subir', autenticarToken, async (req, res) => {
 try {

    const usuarioId = req.user.id;
 const { titulo, descripcion, estado } = req.body;

  if (!titulo || !descripcion) {
   return res.status(400).json({ error: 'Faltan campos para subir una tarea' });
   }

   const [result] = await db.query(
   `INSERT INTO tareas (usuario_id, titulo, descripcion, estado) VALUES (?, ?, ?, ?)`,
   [usuarioId, titulo, descripcion, estado || 'pendiente']
   );

   const [nuevaTarea] = await db.query(
   'SELECT * FROM tareas WHERE id = ?',
   [result.insertId]
 );

 if (wss) {
 wss.clients.forEach(client => {
 if (client.readyState === 1) { 
 client.send(JSON.stringify({
       tipo: 'nuevaTarea',
   data: nuevaTarea[0]
  }));
  }
  });
 }

 res.status(201).json(nuevaTarea[0]);

  } catch (error) {
  console.error('Error al subir tarea:', error);
   res.status(500).json({ error: 'Error del servidor' });
   }
  });


router.get('/ver', autenticarToken, async (req, res) => {

  try {

   const [tareas] = await db.query('SELECT * FROM tareas');

   console.log("📋 Tareas recibidas:", tareas);

   res.status(200).json(tareas);


 } catch (err) {

 console.error('❌ Error al obtener las tareas:', err);

 res.status(500).json({ error: 'Error al obtener las tareas' });

 }

});





router.put('/editar/:id/estado', autenticarToken, async (req, res) => {

  const { estado } = req.body;
 
const { id } = req.params;


 try {

 await db.query(

  'UPDATE tareas SET estado = ? WHERE id = ?',

[estado, id]

 );

 res.status(200).json({ message: 'Estado de la tarea actualizado' });

} catch (err) {

 console.error('❌ Error al actualizar el estado:', err);

 res.status(500).json({ error: 'Error al actualizar el estado' });

}

});





router.delete('/borrar/:id', autenticarToken,async (req, res) => {

const { id } = req.params;


 try {

 await db.query('DELETE FROM tareas WHERE id = ?', [id]);

 res.status(200).json({ message: 'Tarea eliminada' });

 } catch (err) {

 console.error('❌ Error al eliminar la tarea:', err);

 res.status(500).json({ error: 'Error al eliminar la tarea' });
 }

});



export default router
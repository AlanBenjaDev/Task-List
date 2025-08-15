import React, { useEffect, useState } from 'react';
import SubirTarea from './SubirTarea';
import Lista from './Lista';

function Home() {
    const [usuario, setUsuario] = useState(null);
    const [tareas, setTareas] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

 
    useEffect(() => {
        if (!token) return;

        fetch('http://localhost:3000/api/usuarios/perfil', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.ok ? res.json() : Promise.reject('No autorizado'))
            .then(data => setUsuario(data.usuario))
            .catch(err => {
                console.error('Error al cargar perfil:', err);
                setUsuario(null);
            });
    }, [token]);

    useEffect(() => {
        if (!usuario || !token) return;

        const cargarTareas = async () => {
            setCargando(true);
            setError('');
            try {
                const res = await fetch('http://localhost:3000/api/tareas/ver', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (!res.ok) throw new Error('Error al cargar');
                const data = await res.json();
                setTareas(data);
            } catch (err) {
                setError('No se pudieron cargar las tareas');
            } finally {
                setCargando(false);
            }
        };

        cargarTareas();

        const socket = new WebSocket(process.env.APP_WS_URL);

        socket.onopen = () => {
            console.log('WebSocket conectado');
           
            socket.send(JSON.stringify({ type: 'register', token: token }));
        };

        socket.onmessage = (event) => {
            try {
                const mensaje = JSON.parse(event.data);
                if (mensaje.tipo === 'nuevaTarea' && mensaje.data) {
                    setTareas((prev) => {
                       
                        if (prev.some(t => t.id === mensaje.data.id)) return prev;
                        const nuevoEstado = [...prev, mensaje.data];
                        console.log('Tareas actualizadas:', nuevoEstado);
                        return nuevoEstado;
                    });
                }
            } catch (e) {
                console.error('Error parsing WS message:', e);
            }
        };

        socket.onerror = (err) => console.error('WebSocket error:', err);
        socket.onclose = () => console.log('WebSocket desconectado');

        return () => {
            if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
                socket.close();
            }
        };
    }, [usuario, token]);



    const agregarTarea = (nuevaTarea) => {
        setTareas((prev) => [...prev, nuevaTarea]);
    };

    const editarTarea = async (id, nuevoEstado) => {
        try {
            const res = await fetch(`http://localhost:3000/api/tareas/editar/${id}/estado`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ estado: nuevoEstado }),
            });
            if (!res.ok) throw new Error('Error al actualizar tarea');
            const tareaEditada = await res.json();
            
            
            setTareas(prev => prev.map(t => (t.id === tareaEditada.id ? tareaEditada : t)));
        } catch (error) {
            console.error(error);
            alert('❌ No se pudo actualizar la tarea');
        }
    };

    const borrarTarea = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/tareas/borrar/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (!res.ok) throw new Error('Error al borrar tarea');
            setTareas(prev => prev.filter(t => t.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
       
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-tr from-slate-100 to-white p-4">
            {usuario && (
                <div className="p-4 bg-blue-200 rounded mb-4 max-w-sm mx-auto text-center">
                    <h3 className="text-3xl font-semibold">Hola, {usuario.username || usuario.user}!</h3>
                  
                    <p className='text-2xl font-extralight'>Aqui vas a poder poner tus tareas y organizarte mejor.</p>
                </div>
            )}
            
            <div className="container mx-auto p-4">
                <SubirTarea agregarTarea={agregarTarea} token={token} />

                {cargando && <p>Cargando tareas...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {!cargando && !error && (
                    <Lista
                        tareas={tareas}
                        editarTarea={editarTarea}
                        borrarTarea={borrarTarea}
                    />
                )}
            </div>
        </div>
    );
}

export default Home;
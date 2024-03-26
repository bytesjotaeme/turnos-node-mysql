import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditarTurno from './EditarTurno';
import './Turnos.css';

function Turnos() {
    const [turnos, setTurnos] = useState([]);
    const [cliente, setCliente] = useState('');
    const [apellido, setApellido] = useState('');
    const [celular, setCelular] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [servicio, setServicio] = useState('');
    const [editando, setEditando] = useState(false);
    const [turnoToEdit, setTurnoToEdit] = useState(null);

    useEffect(() => {
        fetchTurnos();
    }, []);

    const fetchTurnos = () => {
        axios.get('http://localhost:3001/turnos')
            .then(response => {
                setTurnos(response.data);
            })
            .catch(error => {
                console.error("Error al recuperar los turnos", error);
            });
    };

    const agregarTurno = () => {
        axios.post('http://localhost:3001/turnos', {
            cliente,
            apellido,
            celular,
            mensaje,
            fecha,
            hora,
            servicio
        })
        .then(() => {
            fetchTurnos();
            setCliente('');
            setApellido('');
            setCelular('');
            setMensaje('');
            setFecha('');
            setHora('');
            setServicio('');
        })
        .catch(error => {
            console.error("Error al agregar el turno:", error);
        });
    };

    const editar = (turno) => {
        setTurnoToEdit(turno);
        setEditando(true);
    };

    const eliminarTurno = (id) => {
        axios.delete(`http://localhost:3001/turnos/${id}`)
            .then(() => {
                fetchTurnos();
            })
            .catch(error => {
                console.error("Error al eliminar el turno:", error);
            });
    };

    return (
        <div className="Turnos-container">
            {editando ? (
                <EditarTurno turno={turnoToEdit} onFinish={() => {
                    setEditando(false);
                    fetchTurnos();
                }} />
            ) : (
                <>
                    <div className="Turnos-formContainer">
                        <h2>Agendar Turno</h2>
                        <input className="Turnos-input" placeholder="Nombre" value={cliente} onChange={e => setCliente(e.target.value)} />
                        <input className="Turnos-input" placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
                        <input className="Turnos-input" placeholder="Celular" value={celular} onChange={e => setCelular(e.target.value)} />
                        <textarea className="Turnos-textarea" placeholder="Mensaje (Opcional)" value={mensaje} onChange={e => setMensaje(e.target.value)} />
                        <input className="Turnos-input" type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
                        <input className="Turnos-input" type="time" value={hora} onChange={e => setHora(e.target.value)} />
                        <input className="Turnos-input" placeholder="Servicio" value={servicio} onChange={e => setServicio(e.target.value)} />
                        <button className="Turnos-addButton" onClick={agregarTurno}>Agendar Turno</button>
                    </div>
                    <div className="Turnos-list">
                        <h2>Turnos Agendados</h2>
                        {turnos.map(turno => (
                            <div key={turno.id} className="Turnos-listItem">
                                {turno.cliente} {turno.apellido} - {turno.celular} - {turno.mensaje ? `${turno.mensaje} - ` : ""} {turno.fecha} - {turno.hora} - {turno.servicio}
                            </div>
                        ))}
                    </div>
                </>
            )}
            <Footer />
        </div>
    );
}

function Footer() {
    return (
        <div className="Turnos-footer">
            <p>© 2023 La Escabioneta. Todos los derechos reservados.</p>
        </div>
    );
}

export default Turnos;

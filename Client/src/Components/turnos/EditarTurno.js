import React, { useState } from 'react';
import axios from 'axios';
import './EditarTurno.css';

function EditarTurno({ turno, onFinish }) {
  const [cliente, setCliente] = useState(turno.cliente);
  const [apellido, setApellido] = useState(turno.apellido);
  const [celular, setCelular] = useState(turno.celular);
  const [mensaje, setMensaje] = useState(turno.mensaje || '');
  const [fecha, setFecha] = useState(turno.fecha);
  const [hora, setHora] = useState(turno.hora);
  const [servicio, setServicio] = useState(turno.servicio);

  const actualizarTurno = () => {
    axios.put(`http://localhost:3001/turnos/${turno.id}`, {
      cliente,
      apellido,
      celular,
      mensaje,
      fecha,
      hora,
      servicio
    })
    .then(() => {
      onFinish();
    })
    .catch(error => {
      console.error("Error al editar el turno:", error);
    });
  };

  return (
    <div className="EditarTurno">
      <h2>Editar Turno</h2>
      <input placeholder="Nombre" value={cliente} onChange={e => setCliente(e.target.value)} />
      <input placeholder="Apellido" value={apellido} onChange={e => setApellido(e.target.value)} />
      <input placeholder="Celular" value={celular} onChange={e => setCelular(e.target.value)} />
      <textarea placeholder="Mensaje (Opcional)" value={mensaje} onChange={e => setMensaje(e.target.value)} />
      <input type="date" value={fecha} onChange={e => setFecha(e.target.value)} />
      <input type="time" value={hora} onChange={e => setHora(e.target.value)} />
      <input placeholder="Servicio" value={servicio} onChange={e => setServicio(e.target.value)} />
      <button onClick={actualizarTurno}>Actualizar Turno</button>
    </div>
  );
}

export default EditarTurno;

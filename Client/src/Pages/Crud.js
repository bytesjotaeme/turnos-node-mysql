import React from 'react';

// Importar componentes para ser usados en este archivo.
import HomeCrud from '../Components/homeCrud';
import Turnos from '../Components/turnos/Turnos';

// Definir y exportar un componente de React llamado Crud.
export default function Crud(){

    // Lo que se retorna aquí es lo que se renderizará cuando este componente sea utilizado.
    return(
        <div>
            <HomeCrud/>
            <Turnos/>
        </div>
        
    );
}

import React from 'react';

const CorteOrden = ({ orden }) => {

    const fecha = new Date(Number(orden.creado));
    const dd = fecha.getDate();
    const mm = fecha.getMonth() + 1;
    const yyyy = fecha.getFullYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes();
    const fechaOrden = `${dd}/${mm}/${yyyy} - ${hora === 0 ? 12 : hora > 12 ? hora - 12 : hora}:${minutos} ${hora >= 12 ? 'pm' : 'am'}`;

    return (
        <div className="sm:w-1/3 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <div className="text-yellow-600 text-lg font-bold">Cliente: {orden.cliente}</div>
                {orden.bebidas.map(bebida => (
                    <p key={bebida.bebida} className="text-gray-600">{bebida.cantidad} {bebida.nombre} {bebida.tipoServicio}</p>
                ))}
                <p className="text-gray font-bold">Fecha de la orden: {fechaOrden}</p>
                <p className="text-gray font-bold">Total a pagar: ${orden.total}</p>

                {/* <div className="mb-4">

                </div> */}
            </div>
        </div>
    );
}

export default CorteOrden;
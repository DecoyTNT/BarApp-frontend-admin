import React, { useContext, useEffect } from 'react';
import CorteOrden from './../ui/CorteOrden';
import CortesContext from './../../context/cortes/CortesContext';
import { useNavigate } from 'react-router';

const CorteOrdenes = () => {

    const { corte } = useContext(CortesContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!corte) {
            navigate('/cortes');
        }
        // eslint-disable-next-line
    }, []);

    if (!corte) {
        return null;
    }


    const fecha = new Date(Number(corte.creado));
    const dd = fecha.getDate();
    const mm = fecha.getMonth() + 1;
    const yyyy = fecha.getFullYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes();
    const fechaOrden = `${dd}/${mm}/${yyyy} - ${hora === 0 ? 12 : hora > 12 ? hora - 12 : hora}:${minutos} ${hora >= 12 ? 'pm' : 'am'}`;

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Corte con fecha: {fechaOrden}</h1>

            <div className="sm:flex sm:flex-wrap -mx-3">
                {corte.ordenes.map(orden => (
                    <CorteOrden
                        key={orden.orden}
                        orden={orden}
                    />
                ))}
            </div>

            <div className="w-full mb-4">
                <div className="p-5 shadow-md bg-white">
                    <div className="flex justify-center">
                        <div className="text-gray-900 text-2xl font-bold text-center">Total del corte: {corte.total}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CorteOrdenes;
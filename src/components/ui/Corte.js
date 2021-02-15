import React, { useContext } from 'react';
import { useNavigate } from 'react-router';
import CortesContext from './../../context/cortes/CortesContext';

const Corte = ({ corte }) => {

    const navigate = useNavigate();

    const { seleccionarCorte } = useContext(CortesContext);

    const fecha = new Date(Number(corte.creado));
    const dd = fecha.getDate();
    const mm = fecha.getMonth() + 1;
    const yyyy = fecha.getFullYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes();
    const fechaOrden = `${dd}/${mm}/${yyyy} - ${hora === 0 ? 12 : hora > 12 ? hora - 12 : hora}:${minutos} ${hora >= 12 ? 'pm' : 'am'}`;

    const { total, ordenes } = corte

    const verCorte = () => {
        seleccionarCorte(corte);
        navigate('/ver-corte');
    }

    return (
        <tr>
            {/* <td className="border px-4 py-2 text-center">{id}</td> */}
            <td className="border px-4 py-2 text-center">{fechaOrden}</td>
            <td className="border px-4 py-2 text-center">${total}</td>
            <td className="border px-4 py-2 text-center">{ordenes.length}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="flex justify-center items-center bg-gray-800 px-4 py-2 rounded text-white w-full font-bold hover:bg-gray-900"
                    onClick={verCorte}
                >
                    Ver corte
                </button>
            </td>
        </tr>
    );
}

export default Corte;
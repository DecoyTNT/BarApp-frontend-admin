import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Bebida from '../ui/Bebida';
import { useQuery, gql } from '@apollo/client';
import BebidasContext from './../../context/bebidas/BebidasContext';

const OBTENER_BEBIDAS = gql`
    query obtenerBebidas{
        obtenerBebidas{
            id
            nombre
            tipoAlcohol
            tipoServicio
            precio
            descripcion
            disponible
            imagen
        }
    }
`;

const Menu = () => {

    const { data, loading } = useQuery(OBTENER_BEBIDAS);

    const { bebidas, obtenerBebidas } = useContext(BebidasContext);

    useEffect(() => {
        if (bebidas.length === 0) {
            if (!loading) {
                obtenerBebidas(data.obtenerBebidas);
            }
        }
        // return obtenerBebidas([]);
        // eslint-disable-next-line
    }, [loading]);

    if (loading) {
        return (
            <div>
                <h1 className="text-2xl text-gray-800 font-light text-center justify-center">Cargando...</h1>
            </div>
        );
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Menú</h1>

            <Link to="/nueva-bebida" className="bg-blue-800 hover:bg-blue-900 inline-block mb-5 p-2 text-white uppercase font-bold rounded">
                Nueva Bebida
            </Link>

            {bebidas.map(bebida => (
                <Bebida
                    key={bebida.id}
                    bebida={bebida}
                />
            ))}
        </>
    );
}

export default Menu;
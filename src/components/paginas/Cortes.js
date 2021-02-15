import React, { useContext, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import CortesContext from './../../context/cortes/CortesContext';
import Corte from './../ui/Corte';

const OBTENER_CORTES = gql`
    query obtenerCortes {
        obtenerCortes {
            id
            ordenes {
                orden
                bebidas {
                    bebida
                    tipoAlcohol
                    tipoServicio
                    cantidad
                    nombre
                    precio
                    totalBebida
                }
                total
                completada
                proceso
                cliente
                corte
                creado
            }
            creado
            total
        }
    }
`;

const Cortes = () => {

    const { data, loading } = useQuery(OBTENER_CORTES);

    const { cortes, obtenerCortes } = useContext(CortesContext);

    useEffect(() => {
        if (cortes.length === 0) {
            if (!loading) {
                obtenerCortes(data.obtenerCortes);
            }
        }
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
            <h1 className="text-3xl font-light mb-4">Cortes</h1>

            <div className="overflow-x-scroll">
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            {/* <th className="w-1/5 py-2">ID</th> */}
                            <th className="w-1/5 py-2">Fecha</th>
                            <th className="w-1/5 py-2">Total</th>
                            <th className="w-1/5 py-2">Ordenes</th>
                            <th className="w-1/5 py-2">Ver</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {cortes.map(corte => (
                            <Corte
                                key={corte.id}
                                corte={corte}
                            />
                        ))}
                    </tbody>
                </table>
            </div>


        </>
    );
}

export default Cortes;
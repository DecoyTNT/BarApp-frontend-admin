import React, { useContext, useEffect } from 'react';
import Orden from '../ui/Orden';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router';
// import OrdenesContext from './../../context/ordenes/OrdenesContext';
import CortesContext from './../../context/cortes/CortesContext';

const OBTENER_ORDENES = gql`
    query obtenerOrdenes {
        obtenerOrdenes {
            id
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
    }
`;

const NUEVO_CORTE = gql`
    mutation nuevoCorte($input: CorteInput) {
        nuevoCorte(input: $input) {
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

const Ordenes = () => {

    const { data, loading, startPolling, stopPolling } = useQuery(OBTENER_ORDENES);

    // const { ordenes, obtenerOrdenes } = useContext(OrdenesContext);

    const [nuevoCorte] = useMutation(NUEVO_CORTE, {
        update(cache) {
            if (cache.data.data.ROOT_QUERY.obtenerOrdenes) {
                // Obtener el cache de los productos
                const { obtenerOrdenes } = cache.readQuery({
                    query: OBTENER_ORDENES
                });

                // Reescribir el cache
                cache.writeQuery({
                    query: OBTENER_ORDENES,
                    data: {
                        obtenerOrdenes: obtenerOrdenes.filter(orden => !orden.completada)
                    }
                });
            }
        }
    });

    const { seleccionarCorte } = useContext(CortesContext);

    const navigate = useNavigate();

    useEffect(() => {
        startPolling(1000);
        return () => {
            stopPolling();
        }
        // eslint-disable-next-line
    }, [startPolling, stopPolling]);

    if (loading) {
        return (
            <div>
                <h1 className="text-2xl text-gray-800 font-light text-center justify-center">Cargando...</h1>
            </div>
        );
    }

    const crearCorte = async () => {
        let ordenesCorte = data.obtenerOrdenes.filter(orden => orden.proceso && orden.completada && !orden.corte && orden);


        if (ordenesCorte.length > 0) {
            try {
                // Remover de ordenesCorte lo que no se ocupa
                ordenesCorte = ordenesCorte.map(({ id, __typename, ...ord }) => {

                    ord.bebidas = ord.bebidas.map(({ __typename, ...beb }) => {

                        return beb
                    });
                    let nuevaOrden = { ...ord, orden: id }
                    return nuevaOrden
                });

                const corteNuevo = await nuevoCorte({
                    variables: {
                        input: {
                            creado: Date.now().toString(),
                            ordenes: ordenesCorte
                        }
                    }
                });
                seleccionarCorte(corteNuevo.data.nuevoCorte);
                navigate('/ver-corte');
            } catch (error) {
                console.log({ error });
            }
        }
    }

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Ordenes</h1>

            <div className="sm:flex sm:flex-wrap -mx-3">
                {data.obtenerOrdenes.map(orden => (
                    <Orden
                        key={orden.id}
                        orden={orden}
                    />
                ))}
            </div>
            <button
                type="button"
                className="bg-blue-800 hover:bg-blue-900 rounded mt-5 p-2 text-white uppercase font-bold"
                onClick={crearCorte}
            >
                Realizar corte de caja
            </button>
        </>
    );
}

export default Ordenes;
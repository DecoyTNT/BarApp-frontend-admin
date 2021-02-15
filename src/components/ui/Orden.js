import React from 'react';
import { useMutation, gql } from '@apollo/client';

const ACTUALIZAR_ORDEN = gql`
    mutation actualizarOrden($input: OrdenInput, $id: ID) {
        actualizarOrden(input: $input, id: $id) {
            id
            bebidas {
                bebida
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
        }
    }
`;

const ACTUALIZAR_ORDEN_COMPLETADA = gql`
    mutation actualizarOrdenCompletada($input: OrdenInput, $id: ID) {
        actualizarOrdenCompletada(input: $input, id: $id) {
            id
            bebidas {
                bebida
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
        }
    }
`;

const Orden = ({ orden }) => {

    const [actualizarOrden] = useMutation(ACTUALIZAR_ORDEN);
    const [actualizarOrdenCompletada] = useMutation(ACTUALIZAR_ORDEN_COMPLETADA);

    const fecha = new Date(Number(orden.creado));
    const dd = fecha.getDate();
    const mm = fecha.getMonth() + 1;
    const yyyy = fecha.getFullYear();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes() < 10 ? '0' + fecha.getMinutes() : fecha.getMinutes();
    const fechaOrden = `${dd}/${mm}/${yyyy} - ${hora === 0 ? 12 : hora > 12 ? hora - 12 : hora}:${minutos} ${hora >= 12 ? 'pm' : 'am'}`;

    const cambiarProceso = async id => {
        try {
            await actualizarOrden({
                variables: {
                    id,
                    input: {
                        proceso: true
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    const completarOrden = async id => {
        try {
            await actualizarOrdenCompletada({
                variables: {
                    id,
                    input: {
                        completada: true
                    }
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sm:w-1/3 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <div className="text-yellow-600 text-lg font-bold">Cliente: {orden.cliente}</div>
                {orden.bebidas.map(bebida => (
                    <p key={bebida.bebida} className="text-gray-600">{bebida.cantidad} {bebida.nombre} {bebida.tipoServicio}</p>
                ))}
                <p className="text-gray font-bold">Fecha de la orden: {fechaOrden}</p>
                <p className="text-gray font-bold">Total a pagar: ${orden.total}</p>

                <div className="mb-4">
                    {/* <label htmlFor="tiempoEntrega" className="block text-gray-700 text-sm font-bold mb-4">
                        Proceso de la orden
                    </label> */}

                    {!orden.proceso && (
                        <>
                            <p className="text-gray font-bold">La orden aún no esta en proceso</p>
                            <button
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold rounded"
                                onClick={() => cambiarProceso(orden.id)}
                            >
                                Poner en proceso
                            </button>
                        </>
                    )}
                </div>

                {!orden.completada && orden.proceso && (
                    <>
                        <p className="text-gray font-bold">La orden esta en proceso</p>
                        <button
                            type="button"
                            className="bg-blue-800 hover:bg-blue-900 w-full rounded mt-5 p-2 text-white uppercase font-bold"
                            onClick={() => completarOrden(orden.id)}
                        >
                            Marcar como lista
                        </button>
                    </>
                )}
                {orden.completada && (
                    <p className="text-gray font-bold">La orden ya esta lista</p>
                )}
            </div>
        </div>
    );
}

export default Orden;
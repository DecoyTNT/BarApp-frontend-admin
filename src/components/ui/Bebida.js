import React, { useContext, useRef } from 'react';
// import { Link } from 'react-router-dom';
import BebidasContext from './../../context/bebidas/BebidasContext';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const ACTUALIZAR_BEBIDA = gql`
    mutation actualizarBebida($input: BebidaInput, $id: ID) {
        actualizarBebida(input: $input, id: $id) {
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

const ELIMINAR_BEBIDA = gql`
    mutation eliminarBebida($id: ID) {
        eliminarBebida(id: $id)
    }
`;

const Bebida = ({ bebida }) => {

    // Disponible ref para acceder al valor directamente
    const disponibleRef = useRef(bebida.disponible);

    const { modificarBebida, eliminarBebidaSeleccionada } = useContext(BebidasContext);

    // eslint-disable-next-line
    const { id, nombre, precio, tipoAlcohol, tipoServicio, descripcion, imagen, disponible } = bebida;

    const [actualizarBebida] = useMutation(ACTUALIZAR_BEBIDA);
    const [eliminarBebida] = useMutation(ELIMINAR_BEBIDA);

    const actualizarDisponibilidad = async () => {
        const disponibleBool = (disponibleRef.current.value === "true");

        try {
            const { data } = await actualizarBebida({
                variables: {
                    id,
                    input: {
                        disponible: disponibleBool
                    }
                }
            });
            modificarBebida(data.actualizarBebida);
        } catch (error) {
            console.log(error);
        }
    }

    const borrarBebida = async () => {
        try {
            Swal.fire({
                title: 'Estás seguro?',
                text: "Una vez que se elimine, no se podra recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, eliminar!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await eliminarBebida({
                        variables: {
                            id
                        }
                    });

                    eliminarBebidaSeleccionada(id);
                    Swal.fire(
                        'Eliminado!',
                        data.eliminarBebida,
                        'success'
                    );
                }
            });
            // modificarBebida(data.eliminarBebida);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                        {/* <img src={imagen} alt="imagen platillo" /> */}
                        <div className="sm:flex sm:-mx-2 pl-2">
                            <label className="block mt-5 sm:w-2/4" htmlFor="disponible">
                                <span className="block text-gray-800 mb-2">Disponible</span>
                                <select
                                    className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    name="disponible"
                                    id="disponible"
                                    value={disponible}
                                    ref={disponibleRef}
                                    onChange={actualizarDisponibilidad}
                                >
                                    <option value="true">Disponible</option>
                                    <option value="false">No Disponible</option>
                                </select>
                            </label>
                        </div>
                        <div className="sm:flex sm:-mx-2 pl-2">

                            <button
                                className="mt-2 bg-red-800 hover:bg-red-900 inline-block mb-5 p-2 text-white uppercase font-bold rounded"
                                onClick={borrarBebida}
                            >
                                Eliminar
                            </button>
                            {/* <label className="block mt-5 sm:w-2/4" htmlFor="disponible">
                                <select
                                    className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    name="disponible"
                                    id="disponible"
                                    value={disponible}
                                    ref={disponibleRef}
                                    onChange={actualizarDisponibilidad}
                                >
                                    <option value="true">Disponible</option>
                                    <option value="false">No Disponible</option>
                                </select>
                            </label> */}
                        </div>
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">
                            {nombre}
                        </p>
                        <p className="text-gray-600 mb-4">
                            Tipo de alcohol: <span className="text-gray-700 font-bold">{tipoAlcohol === 'sinAlcohol' ? 'SIN ALCOHOL' : tipoAlcohol === 'clamato' ? 'CON CLAMATO' : tipoAlcohol.toUpperCase()}</span>
                        </p>
                        {tipoAlcohol !== '' && tipoAlcohol !== 'cocktail' && tipoAlcohol !== 'cerveza' && tipoAlcohol !== 'clamato' && tipoAlcohol !== 'sinAlcohol' && (
                            <p className="text-gray-600 mb-4">
                                Tipo de servicio: <span className="text-gray-700 font-bold">{tipoServicio.toUpperCase()}</span>
                            </p>
                        )}
                        <p className="text-gray-600 mb-4">{descripcion}</p>
                        <p className="text-gray-600 mb-4">
                            Precio: <span className="text-gray-700 font-bold">${precio}</span>
                        </p>
                        {/* <Link
                            to="/editar-bebida" className="bg-blue-800 hover:bg-blue-900 inline-block mb-5 p-2 text-white uppercase font-bold rounded"
                            onClick={() => seleccionarBebida(bebida)}
                        >
                            Editar Bebida
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bebida;
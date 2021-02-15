import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router';
import BebidasContext from './../../context/bebidas/BebidasContext';
import Swal from 'sweetalert2';

const NUEVA_BEBIDA = gql`
    mutation nuevaBebida($input: BebidaInput) {
        nuevaBebida(input: $input) {
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

const NuevaBebida = () => {

    const [nuevaBebida] = useMutation(NUEVA_BEBIDA);

    const navigate = useNavigate();

    const { agregarBebida } = useContext(BebidasContext);

    const [tipoAlcohol, setTipoAlcohol] = useState('');

    let schemaValidation = Yup.object().shape({
        nombre: Yup.string()
            .required('El nombre del producto es obligatorio'),
        tipoAlcohol: Yup.string()
            .required('Selecciona un tipo de alcohol'),
        precio: Yup.number()
            .positive('El precio de la bebida debe ser un número positivo')
            .required('El precio de la bebida es obligatorio'),
    });

    if (tipoAlcohol !== '' && tipoAlcohol !== 'cocktail' && tipoAlcohol !== 'cerveza' && tipoAlcohol !== 'clamato' && tipoAlcohol !== 'sinAlcohol') {
        schemaValidation = Yup.object().shape({
            nombre: Yup.string()
                .required('El nombre del producto es obligatorio'),
            tipoAlcohol: Yup.string()
                .required('Selecciona un tipo de alcohol'),
            tipoServicio: Yup.string()
                .required('Selecciona un tipo de servicio'),
            precio: Yup.number()
                .positive('El precio de la bebida debe ser un número positivo')
                .required('El precio de la bebida es obligatorio'),
        });
    }

    const formik = useFormik({
        initialValues: {
            nombre: '',
            tipoAlcohol: '',
            tipoServicio: '',
            precio: '',
            descripcion: ''
        },
        validationSchema: schemaValidation,
        validateOnChange: false,
        onSubmit: async valores => {
            const { nombre, tipoAlcohol, tipoServicio, precio, descripcion } = valores;
            try {

                const { data } = await nuevaBebida({
                    variables: {
                        input: {
                            nombre,
                            tipoAlcohol,
                            tipoServicio,
                            precio,
                            descripcion
                        }
                    }
                });

                Swal.fire(
                    'Registrado!',
                    `El producto ${data.nuevaBebida.nombre} se registro correctamente`,
                    'success'
                );
                agregarBebida(data.nuevaBebida);
                navigate('/menu');
            } catch (error) {
                console.log({ error });
            }
        }
    });

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Nueva Bebida</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        {formik.errors.nombre || formik.errors.precio || formik.errors.tipoAlcohol || formik.errors.tipoServicio ?
                            <div className="bg-red-100 border-4 border-red-700 text-red-900 p-4 mb-5" role="alert">
                                <p className="font-bold">Hubo un error:</p>
                                <p>{formik.errors.nombre}</p>
                                <p>{formik.errors.precio}</p>
                                <p>{formik.errors.tipoAlcohol}</p>
                                <p>{formik.errors.tipoServicio}</p>
                            </div>
                            : null
                        }
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                autoComplete="off"
                                placeholder="Nombre de la bebida"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="precio"
                                type="number"
                                placeholder="Precio de la bebida"
                                min="0"
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipoAlcohol">Tipo de Alcohol</label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="tipoAlcohol"
                                name="tipoAlcohol"
                                value={formik.values.tipoAlcohol}
                                onChange={e => {
                                    formik.handleChange(e);
                                    setTipoAlcohol(e.target.value)
                                }}
                            >
                                <option value="">-- Selecciona el tipo de alcohol --</option>
                                <option value="tequila">Tequila</option>
                                <option value="mezcal">Mezcal</option>
                                <option value="whisky">Whisky</option>
                                <option value="brandy">Brandy</option>
                                <option value="vodka">Vodka</option>
                                <option value="ron">Ron</option>
                                <option value="licor">Licor</option>
                                <option value="cocktail">Cocktail</option>
                                <option value="cerveza">Cerveza</option>
                                <option value="clamato">Con Clamato</option>
                                <option value="sinAlcohol">Sin Alcohol</option>
                            </select>
                        </div>

                        {tipoAlcohol !== '' && tipoAlcohol !== 'cocktail' && tipoAlcohol !== 'cerveza' && tipoAlcohol !== 'clamato' && tipoAlcohol !== 'sinAlcohol' && (
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipoServicio">Tipo de Servicio</label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="tipoServicio"
                                    name="tipoServicio"
                                    value={formik.values.tipoServicio}
                                    onChange={formik.handleChange}
                                >
                                    <option value="">-- Selecciona el tipo de servicio --</option>
                                    <option value="shot">Shot</option>
                                    <option value="cuba">Cuba</option>
                                    <option value="servicio">Servicio</option>
                                </select>
                            </div>
                        )}


                        {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen</label>
                            <FileUploader
                                accept="image/*"
                                id="imagen"
                                name="imagen"
                                randomizeFilename
                                storageRef={firebase.storage.ref("platillos")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </div> */}
                        {/* {subiendo && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center rounded" style={{ width: `${progreso}%` }}>
                                    {progreso} %
                                </div>
                            </div>
                        )
                        } */}

                        {/* {urlImagen && (
                            <p className="bg-green-500 text-white p-3 text-center my-5 rounded">
                                Se subio correctamente la imagen
                            </p>
                        )
                        } */}

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripcion</label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="descripcion"
                                placeholder="Descripción de la bebida"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                            ></textarea>
                        </div>
                        <input
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold rounded cursor-pointer"
                            value="Agregar bebida"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default NuevaBebida;
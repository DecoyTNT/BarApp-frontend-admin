import React, { useReducer } from 'react';
import BebidasContext from './BebidasContext';
import BebidasReducer from './BebidasReducer';
import {
    OBTENER_BEBIDAS,
    NUEVA_BEBIDA,
    ACTUALIZAR_BEBIDA,
    SELECCIONAR_BEBIDA,
    ELIMINAR_BEBIDA
} from '../../types/index';

const BebidasState = ({ children }) => {

    const initialState = {
        bebidas: [],
        bebida: null
    }

    const [state, dispatch] = useReducer(BebidasReducer, initialState);

    const obtenerBebidas = bebidas => {
        dispatch({
            type: OBTENER_BEBIDAS,
            payload: bebidas
        });
    }

    const agregarBebida = bebida => {
        dispatch({
            type: NUEVA_BEBIDA,
            payload: bebida
        });
    }

    const modificarBebida = bebida => {
        dispatch({
            type: ACTUALIZAR_BEBIDA,
            payload: bebida
        });
    }

    const seleccionarBebida = bebida => {
        dispatch({
            type: SELECCIONAR_BEBIDA,
            payload: bebida
        });
    }

    const eliminarBebidaSeleccionada = id => {
        dispatch({
            type: ELIMINAR_BEBIDA,
            payload: id
        })
    }

    return (
        <BebidasContext.Provider
            value={{
                bebidas: state.bebidas,
                bebida: state.bebida,
                obtenerBebidas,
                agregarBebida,
                modificarBebida,
                seleccionarBebida,
                eliminarBebidaSeleccionada
            }}
        >
            {children}
        </BebidasContext.Provider>
    );
}

export default BebidasState;
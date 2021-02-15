import React, { useReducer } from 'react';
import OrdenesContext from './OrdenesContext';
import OrdenesReducer from './OrdenesReducer';
import {
    OBTENER_ORDENES
} from '../../types/index';

const OrdenesState = ({ children }) => {

    const initialState = {
        ordenes: []
    }

    const [state, dispatch] = useReducer(OrdenesReducer, initialState);

    const obtenerOrdenes = ordenes => {
        dispatch({
            type: OBTENER_ORDENES,
            payload: ordenes
        })
    }

    return (
        <OrdenesContext.Provider
            value={{
                ordenes: state.ordenes,
                obtenerOrdenes
            }}
        >
            {children}
        </OrdenesContext.Provider>
    );
}

export default OrdenesState;
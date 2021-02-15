import React, { useReducer } from 'react';
import CortesContext from './CortesContext';
import CortesReducer from './CortesReducer';
import {
    OBTENER_CORTES,
    SELECCIONAR_CORTE
} from './../../types/index';

const CortesState = ({ children }) => {

    const initialState = {
        cortes: [],
        corte: null
    }

    const [state, dispatch] = useReducer(CortesReducer, initialState);

    const obtenerCortes = cortes => {
        dispatch({
            type: OBTENER_CORTES,
            payload: cortes
        })
    }

    const seleccionarCorte = corte => {
        dispatch({
            type: SELECCIONAR_CORTE,
            payload: corte
        })
    }

    return (
        <CortesContext.Provider
            value={{
                cortes: state.cortes,
                corte: state.corte,
                obtenerCortes,
                seleccionarCorte
            }}
        >
            {children}
        </CortesContext.Provider>
    );
}

export default CortesState;
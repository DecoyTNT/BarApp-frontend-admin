import {
    OBTENER_CORTES,
    SELECCIONAR_CORTE
} from './../../types/index';

const CortesReducer = (state, action) => {
    switch (action.type) {
        case OBTENER_CORTES:
            return {
                ...state,
                cortes: action.payload,
                corte: null
            }

        case SELECCIONAR_CORTE:
            return {
                ...state,
                corte: action.payload
            }

        default:
            return state;
    }
}

export default CortesReducer;
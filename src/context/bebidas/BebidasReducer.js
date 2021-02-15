import {
    OBTENER_BEBIDAS,
    NUEVA_BEBIDA,
    ACTUALIZAR_BEBIDA,
    SELECCIONAR_BEBIDA,
    ELIMINAR_BEBIDA
} from '../../types'

const BebidasReducer = (state, action) => {
    switch (action.type) {

        case OBTENER_BEBIDAS:
            return {
                ...state,
                bebidas: action.payload,
                bebida: null
            }

        case NUEVA_BEBIDA:
            // console.log('Nueva bebida: ', action.payload);
            return {
                ...state,
                bebidas: [
                    ...state.bebidas,
                    action.payload
                ],
                bebida: null
            }

        case ACTUALIZAR_BEBIDA:
            return {
                ...state,
                bebidas: state.bebidas.map(bebida => bebida.id !== action.payload.id ? bebida : action.payload),
                bebida: null
            }

        case SELECCIONAR_BEBIDA:
            return {
                ...state,
                bebida: action.payload
            }

        case ELIMINAR_BEBIDA:
            return {
                ...state,
                bebidas: state.bebidas.filter(bebida => bebida.id !== action.payload)
            }

        default:
            return state;
    }
}

export default BebidasReducer;
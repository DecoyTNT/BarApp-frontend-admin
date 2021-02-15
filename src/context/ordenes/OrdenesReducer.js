import {
    OBTENER_ORDENES
} from '../../types/index';

const OrdenesReducer = (state, action) => {
    switch (action.type) {

        case OBTENER_ORDENES:
            return {
                ...state,
                ordenes: action.payload
            }

        default:
            return state;
    }
}

export default OrdenesReducer;
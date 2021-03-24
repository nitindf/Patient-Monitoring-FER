import { SET_LOADING, GET_PATIENTS, GET_PATIENT } from '../actions/types';

const initialState = {
    patient: null,
    patients: null,
    loading: false
}

const patientReducer = (state = initialState, action) => {

    switch(action.type) {

        case GET_PATIENTS:
            return {
                ...state,
                patients: action.payload,
                loading: false
            }

        case GET_PATIENT:
            return {
                ...state,
                patient: action.payload,
                loading: false
            }

        case SET_LOADING:
            return {
                ...state,
                loading: true
            }

        default:
            return state;
    }

}

export default patientReducer;
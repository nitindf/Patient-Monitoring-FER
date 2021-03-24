import axios from 'axios';
import {
    SET_LOADING,
    GET_PATIENTS,
    GET_PATIENT,
    GET_ERRORS,
    SET_MESSAGE
} from './types';

export const getPatients = (searchData) => (dispatch) => {
    dispatch(setLoading());
    axios
        .post('/api/patients/search', searchData)
        .then((res) => {
            dispatch({
                type: GET_PATIENTS,
                payload: res.data
            });
        })
        .catch(() => {
            dispatch({
                type: GET_PATIENTS,
                payload: null
            });
        });
};

export const getPatient = (patient_id) => (dispatch) => {
    dispatch(setLoading());
    axios
        .get(`/api/patients/${patient_id}`)
        .then((res) => {
            dispatch({
                type: GET_PATIENT,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const createPatient = (patientData, history) => (dispatch) => {
    axios
        .post('/api/patients/create', patientData)
        .then(() => {
            const msg = {
                content: 'Patient Created Successfully',
                type: 'success'
            };
            dispatch(setMessage(msg));
            history.push('/patients');
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const updatePatient = (patientData, history, patient_id) => dispatch => {

    axios.put(`/api/patients/${patient_id}`, patientData)
        .then(() => {
            const msg = {
                content: 'Patient Updated Successfully',
                type: 'success'
            };
            dispatch(setMessage(msg));
            history.push('/patients');
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
}

export const deletePatient = (patient_id, patient_stage) => (dispatch) => {
    axios
        .delete(`/api/patients/${patient_id}`)
        .then(() => {
            dispatch(getPatients({ stage: patient_stage }));
        })
        .catch((err) => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};

export const setMessage = (msg) => {
    return {
        type: SET_MESSAGE,
        payload: msg
    };
};

export const clearErrors = () => {
    return {
        type: GET_ERRORS,
        payload: {}
    };
}
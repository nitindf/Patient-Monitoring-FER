import React, { Component } from 'react'
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients, setMessage, deletePatient } from '../../actions/patientActions';

class Patients extends Component {

    state = {
        feedback_msg: null
    }

    static getDerivedStateFromProps(props, state) {
        if (props.message.msg) {
            return {
                feedback_msg: props.message.msg
            }
        }
        return null;
    }

    componentDidMount() {
        const searchData = {
            stage: 'primary'
        }
        this.props.getPatients(searchData);
    }

    componentWillUnmount() {
        this.props.setMessage(null);
    }

    searchPatient = (stage) => {
        const searchData = {
            stage: stage
        }
        this.props.getPatients(searchData);
    }

    addPatient = () => {
        this.props.history.push('/add-patient');
    }

    onUpdatePatient = (patient_id) => {
        this.props.history.push(`update-patient/${patient_id}`);
    }

    onReport = (patient_id) => {
        this.props.history.push(`report/${patient_id}`);
    }


    onDeletePatient = (patient_id, patient_stage) => {
        if (window.confirm('Are You Sure ?')) {
            this.props.deletePatient(patient_id, patient_stage);
            // this.props.getPatients({stage: patient_stage});
        }
    }

    render() {

        const { patients, loading } = this.props.patient;

        let tableContent;
        if (loading === true && patients === null) {
            tableContent = <div className='text-center'><Spinner /></div>;
        }
        else if (loading === false && patients === null) {
            tableContent = <h1 className="display-4 text-danger">No Patients Found :(</h1>
        }
        else {
            let patientsTable = patients.map(patient => {
                return (
                    <tr key={patient._id}>
                        <td>{patient.full_name}</td>
                        <td>{patient.stage}</td>
                        <td>{patient.level}</td>
                        <td>
                            <button className='btn btn-success btn-sm mr-1' onClick={() => this.onUpdatePatient(patient._id)}>Update</button>
                            <button className='btn btn-danger btn-sm' onClick={() => this.onDeletePatient(patient._id, patient.stage)}>Delete</button>
                        </td>
                        <td>
                            <a className='btn btn-success btn-sm mr-1' href={`/monitor-patient/${patient._id}`} target="__blank">
                                Go
                            </a>
                            
                            <button className='btn btn-success btn-sm mr-1' onClick={() => this.onReport(patient._id)}>View Report</button>
                        </td>
                    </tr>
                );
            });

            tableContent = (
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">Full Name</th>
                            <th scope="col">Stage</th>
                            <th scope="col">Critical Level</th>
                            <th scope="col">Manage</th>
                            <th scope="col">Monitor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patientsTable}
                    </tbody>
                </table>
            );
        }

        return (
            <SidebarTemplate>
                <div>
                    {/* Start Success Message */}
                    {(this.state.feedback_msg) ?
                        <div className={`alert alert-${this.state.feedback_msg.type} alert-dismissible fade show mt-3`} role="alert">
                            <strong>{this.state.feedback_msg.content}</strong>
                            <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        : null}
                    {/* End Success Message */}
                    <br></br>
                    <button className='btn btn-primary float-right mt-2' onClick={this.addPatient}><i className='fas fa-plus'></i> Add New Patient</button> <br /> <br />
                    <div className='text-center mt-3'>

                    </div>
                    <div className='mt-5'>
                        {tableContent}
                    </div>
                </div>
            </SidebarTemplate>
        );
    }
}

Patients.propTypes = {
    patient: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
    getPatients: PropTypes.func.isRequired,
    setMessage: PropTypes.func.isRequired,
    deletePatient: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    patient: state.patient,
    message: state.message
})

export default connect(mapStateToProps, { getPatients, setMessage, deletePatient })(Patients);
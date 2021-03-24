import React, { Component } from 'react'
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPatients, setMessage, deletePatient } from '../../actions/patientActions';

class Report extends Component {

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

    render() {

        const { patients, loading } = this.props.patient;

        let tableContent;
        if (loading === true && patients === null) {
            tableContent = <div className='text-center'><Spinner /></div>;
        }
        else if (loading === false && patients === null) {
            tableContent = <h1 className="display-4 text-danger">No Data Found :(</h1>
        }
        else {
            let patientsTable = patients.map(patient => {
                return (
                    <tr key={patient._id}>
                        <td>{patient.full_name}</td>
                        <td>  </td>
                        <td>               </td>
                        <td>
                           
                        </td>
                    </tr>
                );
            });

            tableContent = (
                <table className="table table-striped table-md">
                    <thead>
                        <tr>
                            <th scope="col">Full Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Time</th>
                            <th scope="col">Emotion Data</th>
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
                <h5 className='text-center display-4'>Patient Report</h5>
                   <br></br>
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

Report.propTypes = {
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

export default connect(mapStateToProps, { getPatients, setMessage, deletePatient })(Report);

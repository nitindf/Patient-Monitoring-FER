import React, { Component } from 'react'
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudent, updateStudent, clearErrors } from '../../actions/studentActions'; 
import IsEmpty from '../../validation/IsEmpty';

class UpdateStudent extends Component {

    state = {
        full_name: '',
        national_id: '',
        phone: '',
        email: '',
        birth_date: '',
        location: '',
        stage: '',
        level: '',
       
        errors: {}
    };

    componentDidMount() {
        this.props.getStudent(this.props.match.params.student_id);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.student.student) {
            const { student } = nextProps.student;
            student.location = IsEmpty(student.location)? '' : student.location; 
            student.email = IsEmpty(student.email)? '' : student.email;
        
            this.setState({
                full_name: student.full_name,
                national_id: student.national_id,
                phone: student.phone,
                email: student.email,
                birth_date: student.birth_date,
                location: student.location,
                stage: student.stage,
                level: student.level,
            });
        }

        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    } 

    submitStudent = (e) => {
        e.preventDefault();
        
        const studentData = {
            full_name: this.state.full_name,
            national_id: this.state.national_id,
            phone: this.state.phone,
            email: this.state.email,
            birth_date: this.state.birth_date,
            location: this.state.location,
            stage: this.state.stage,
            level: this.state.level
        }
        
        this.props.updateStudent(studentData, this.props.history, this.props.match.params.student_id);
    };

    onChangeHandler = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        const { errors } = this.state;

        return (
                <SidebarTemplate>
                <div>
                <h1 className='text-center display-4'>Update Patient Data</h1>
                
                <form className='mb-4' onSubmit={this.submitStudent}>
                    <div className='form-group'>
                        <label htmlFor='full_name'>
                            <span className='text-danger'>*</span> Full Name
                        </label>
                        <input
                            type='text'
                            name='full_name'
                            value={this.state.full_name}
                            className={classnames('form-control', {'is-invalid':errors.full_name})} 
                            id='full_name'
                            placeholder='Enter Student Full Name'
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.full_name}</strong>
                        </div>
                    </div>
                    
                    <div className='form-group'>
                        <label htmlFor='national_id'>
                            <span className='text-danger'>*</span> Patient ID
                        </label>
                        <input
                            type='text'
                            name='national_id'
                            value={this.state.national_id}
                            className={classnames('form-control', {'is-invalid':errors.parent_info_national_id})}
                            id='national_id'
                            placeholder="Enter Patient ID"
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.parent_info_national_id}</strong>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='phone'>
                            <span className='text-danger'>*</span> Phone Number
                        </label>
                        <input
                            type='text'
                            name='phone'
                            value={this.state.phone}
                            className={classnames('form-control', {'is-invalid':errors.parent_info_phone})}
                            id='phone'
                            placeholder="Enter Patient's Phone number"
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.parent_info_phone}</strong>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='email'>
                            <span className='text-danger'>*</span> Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            value={this.state.email}
                            className={classnames('form-control', {'is-invalid':errors.email})}
                            id='email'
                            placeholder='Enter Email ID'
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.email}</strong>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='birth_date'> Date Of Birth</label>
                        <input
                            type='date'
                            name='birth_date'
                            value={this.state.birth_date}
                            className={classnames('form-control', {'is-invalid':errors.birth_date})}
                            id='birth_date'
                            placeholder='Enter Patient Birth Date'
                            onChange={this.onChangeHandler}
                        />
                        <div className="invalid-feedback">
                            <strong>{errors.birth_date}</strong>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='location'>Location</label>
                        <input
                            type='text'
                            name='location'
                            value={this.state.location}
                            className='form-control'
                            id='location'
                            placeholder='Enter current Address'
                            onChange={this.onChangeHandler}
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='stage'>
                            <span className='text-danger'>*</span> Stage
                        </label>
                        <select
                            className={classnames('custom-select', {'is-invalid':errors.stage})}
                            name='stage'
                            id='stage'
                            onChange={this.onChangeHandler}
                            value={this.state.stage}
                        >
                            <option value={0}>Select Stage</option>
                            <option value='Pre-Treatment'>Pre-Treatment</option>
                            <option value='Undergoing Treatment'>Undergoing Treatment</option>
                            <option value='Post-Treatment'>Post-Treatment</option>
                        </select>
                        <div className="invalid-feedback">
                            <strong>{errors.stage}</strong>
                        </div>
                    </div>

                    <div className='form-group'>
                        <label htmlFor='level'>
                            <span className='text-danger'>*</span> Critical Level
                        </label>
                        <select 
                            className={classnames('custom-select', {'is-invalid':errors.level})}
                            name='level' 
                            id='level' 
                            onChange={this.onChangeHandler}
                            value={this.state.level}
                        >
                            <option value={0}>Select Critical Level</option>
                            <option value='Very High'>Very High</option>
                            <option value='High'>High</option>
                            <option value='Normal'>Normal</option>
                            <option value='Low'>Low</option>
                            <option value='Very Low'>Very Low</option>
                        </select>
                        <div className="invalid-feedback">
                            <strong>{errors.level}</strong>
                        </div>
                    </div>
                
                    <hr />

                    <div className='text-center'>
                        <button
                            type='submit'
                            className='btn btn-success btn-block'
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
            </SidebarTemplate>
        );
    }
}


UpdateStudent.propTypes = {
    errors: PropTypes.object.isRequired,
    student: PropTypes.object.isRequired,
    getStudent: PropTypes.func.isRequired,
    updateStudent: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors,
    student: state.student
});

export default connect(mapStateToProps, { getStudent, updateStudent, clearErrors })(UpdateStudent);
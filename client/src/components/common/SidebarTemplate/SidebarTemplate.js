import React, { Component } from 'react'
import './SidebarTemplate.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Avatar from '../../../images/avatar.jpg';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from "../../../actions/authActions";

class SidebarTemplate extends Component {
    
    state = {
        toggled: false
    }

    minimizeSidebar = (e) => {
        e.preventDefault();
        let prevState = this.state.toggled;
        this.setState({toggled: !prevState});
    }

    onLogoutHandler = () => {
        this.props.logoutUser();
    }

    render() {

        const { user } = this.props.auth;

        return (
            <div className={classnames('d-flex', {'toggled': this.state.toggled})} id="wrapper">

                {/*  Sidebar */}
                <div className="bg-dark border-right" id="sidebar-wrapper">
                    <div className="sidebar-heading text-center text-light bg-info"> 
                        <img src={Avatar} alt="avatar" className='rounded-circle' style={{width:'100px', height:'100px'}} />
                        <h3>{user.name}</h3> 
                    </div>
                    <div className="list-group list-group-flush">
                        <Link to='/students' className='list-group-item list-group-item-action bg-dark text-light'><i className="fas fa-users"></i> My Patients</Link>
                    </div>
                </div>
                {/*  /#sidebar-wrapper */}

                {/* Page Content */}
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        <button className="btn btn-light" onClick={this.minimizeSidebar}> {this.state.toggled ? <i className='fas fa-arrow-right fa-lg'></i> : <i className='fas fa-arrow-left fa-lg'></i>} </button>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                                <li className="nav-item">
                                    <div className='btn btn-medium waves-effect waves-light hoverable black accent-3' onClick={this.onLogoutHandler}>Logout</div>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="container-fluid sidebar-template">
                        {this.props.children}
                    </div>
                </div>
                {/* page-content-wrapper */}

            </div>
        );
    }
}

SidebarTemplate.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(SidebarTemplate);
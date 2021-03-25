import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div style={{  }} className="">
        <div className="">
          <div className="dashboard-row-in-app">
            <h4>
              <p className="flow-text grey-text text-darken-2">
                <span style={{ fontFamily: "monospace",fontSize: "20pt" }}>PATIENT MONITORING USING FACIAL EXPRESSION RECOGNITION</span> 
              </p>
            </h4>
          </div>
          <div>
            <SidebarTemplate>
              <div className="landing-copy col s12 left-align">
                <br></br>
                <span style={{ fontFamily: "monospace",fontSize: "20pt" }}>Welcome <b>{user.name.split(" ")[0]}!</b></span> 
              </div>
            </SidebarTemplate>
          </div>
        </div>
      </div>
    
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);

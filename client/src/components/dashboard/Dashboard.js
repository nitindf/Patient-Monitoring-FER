import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

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

            <button
              style={{
                width: "150px",
                borderRadius: "2px",
                letterSpacing: "1.5px",
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Logout
            </button>
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

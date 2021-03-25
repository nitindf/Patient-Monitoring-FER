import React, { Component } from 'react'
import SidebarTemplate from '../common/SidebarTemplate/SidebarTemplate';
import Spinner from '../common/Spinner';
import axios from 'axios';
import Date from "../../utils/dateUtil";
class Report extends Component {

    state = {
        recordings: [],
    }

    componentDidMount() {
        // set interval is used to fetch live data for every 1 minute
        setInterval(() => {
            axios.get(`/api/patients/${this.props.match.params.patient_id}`)
                .then((res) => {
                    console.log(res)
                    this.setState({
                        ...this.state,
                        ...res.data,
                    })
                })
        }, 60000); // 1 minute = 60000 milliseconds
    }

    render() {
        return (
            <SidebarTemplate>
                <div>
                    <h5 className='text-center display-4'>Patient Report</h5>
                    <br></br>
                    <div className='text-center mt-3'>{this.state.full_name} Recordings
                    </div>
                    <table className="table table-striped table-md">
                        <thead>
                            <tr>
                                <th scope="col">Felt</th>
                                <th scope="col">At Time</th>
                            </tr>
                        </thead>
                        {this.state.recordings.length === 0 ?
                            <center>
                                <Spinner />
                            </center>
                             :
                                <tbody>
                                    {this.state.recordings.map((instance, index) => {
                                        // console.log(instance)
                                        return(
                                            <tr key={index}>
                                                <td>{instance.expression}</td>
                                                <td>{Date(instance.time)}</td>
                                            </tr>
                                    )})}
                                </tbody>
                           
                        }
                    </table>
                    Display overall emotion
                </div>
            </SidebarTemplate>
        );
    }
}



export default Report;

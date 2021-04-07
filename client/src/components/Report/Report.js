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
        }, 2000); // 1 minute = 60000 milliseconds
    }

    render() {
        return (
            <SidebarTemplate>
                <div>
                    <h6 className='text-center display-4'>Patient Report</h6>
                    <br></br>
                    <h5 className='text-left mt-5'> Name : <b>{this.state.full_name} </b></h5>
                    <br></br>
                    <table className="table table-striped table-md">
                        <thead>
                            <tr>
                                <th scope="col">Emotion Data</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
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
                                        var timestamp = (Date(instance.time)).split(',');
                                        var date = timestamp[0];
                                        
                                        var time = timestamp[1];
                                        return(
                                            <tr key={index}>
                                                <td>{(instance.expression).toUpperCase()}</td>
                                                <td>{date}</td>
                                                <td>{time}</td>
                                            </tr>
                                    )})}
                                </tbody>
                           
                        }
                    </table>
                   {/*Overall Emotion : */}
                </div>
            </SidebarTemplate>
        );
    }
}


export default Report;

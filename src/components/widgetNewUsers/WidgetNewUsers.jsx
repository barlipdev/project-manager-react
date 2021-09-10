import "./widgetNewUsers.css"
import {Visibility} from '@material-ui/icons';
import axios from "axios";
import React from 'react';


export class WidgetNewUsers extends React.Component {

    constructor(){
        super()
        this.state = {
            users: [],
        }
    }
    
    componentDidMount(){
        axios.get("http://51.68.139.166:8091/stats/latestUsers",{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
        })
        .then(response => {
            this.setState({ users: response.data})
        })
        .catch(error => {
            console.log(error);
        })
        
    }

    render(){
        console.log(this.state.users);

        let datas = this.state.users.map(data => {
            return (
                <li className="widgetNewUsersListItem" key= {data.id}>
                        <img src={data.avatarUrl} alt="" className="widgetNewUsersImg" />
                        <div className="widgetNewUsersUser">
                            <span className="widgetNewUsersUsername">{data.username}</span>
                            <span className="widgetNewUsersUserEmail">{data.email}</span>
                        </div>
                        <button className="widgetNewUsersButton">
                            <Visibility className="widgetNewUsersIcon"/>
                            Show Details
                        </button>
                </li>
            )
        })

        return (
            <div className="widgetNewUsers">
                <span className="widgetNewUsersTitle">New Join Members</span>
                <ul className="widgetNewUsersList">
                    {datas}
                </ul>
            </div>
        );
    }
}

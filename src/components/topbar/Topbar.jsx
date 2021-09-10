import React from 'react'
import "./topbar.css"
import {NotificationsNone, Language, Settings} from '@material-ui/icons';

export default function Topbar() {

    var user = JSON.parse(sessionStorage.getItem("user"));

    return (
        <div className="topbarWrapper">
            <div className="topLeft">
                <span className="logo">DevBart Projects Manager</span>
            </div>
            <div className="topRight">
                <div className="topBarIconContainer">
                    <NotificationsNone/>
                    <span className="topIconBag">2</span>
                </div>
                <div className="topBarIconContainer">
                    <Language/>
                </div>
                <div className="topBarIconContainer">
                    <Settings/>
                </div>
                <img src={user.avatarUrl} alt="" className="topAvatar"/>
            </div>
        </div>
    )
}

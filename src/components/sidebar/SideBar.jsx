import React from 'react'
import {LineStyle,Timeline,Person,Equalizer,Book,Grain,ListAlt,Today,Report} from "@material-ui/icons"
import "./sidebar.css"
import { Link } from 'react-router-dom'

export default function SideBar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sideBarList">
                        <Link to="/home" className="link">
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon"/>
                            Home
                        </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Analytics
                        </li>
                        <li className="sidebarListItem">
                            <Equalizer className="sidebarIcon"/>
                            Statistics
                        </li>
                    </ul>
                    </div>
                    <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Database Manager</h3>
                    <ul className="sideBarList">
                        <Link to="/recipe" className="link">
                        <li className="sidebarListItem">
                            <Book className="sidebarIcon"/>
                            Recipes
                        </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Grain className="sidebarIcon"/>
                            Products
                        </li>
                        <Link to="/users" className="link">
                        <li className="sidebarListItem">
                            <Person className="sidebarIcon"/>
                            Users
                        </li>
                        </Link>
                        <li className="sidebarListItem">
                            <Equalizer className="sidebarIcon"/>
                            Statistics
                        </li>
                    </ul>
                    </div>

                    <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Project Management</h3>
                    <ul className="sideBarList">
                        <li className="sidebarListItem">
                            <ListAlt className="sidebarIcon"/>
                            Tasks
                        </li>
                        <li className="sidebarListItem">
                            <Today className="sidebarIcon"/>
                            Calendar
                        </li>
                    </ul>
                    </div>

                    <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Support</h3>
                    <ul className="sideBarList">
                        <li className="sidebarListItem">
                            <Report className="sidebarIcon"/>
                            Report
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

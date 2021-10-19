import React from 'react'
import "./topbar.css"
import {NotificationsNone, Language, Settings} from '@material-ui/icons';
import { Component } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

export class Topbar extends Component{

    constructor(props) {
        super(props);

        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-fw pi-home',
                command:()=>{ window.location="/home";}
            },
            {
                label: 'Database',
                icon: 'pi pi-fw pi-file',
                items: [
                    {
                        label: 'Dwyf',
                        icon: 'pi pi-fw pi-cloud',
                        items: [
                            {
                                label: 'Recipes',
                                icon: 'pi pi-fw pi-book',
                                command:()=>{ window.location="/recipe";}
                            },
                            {
                                label: 'Products',
                                icon: 'pi pi-fw pi-tags',
                                command:()=>{ window.location="/products";}
                            },
                            {
                                label: 'Users',
                                icon: 'pi pi-fw pi-users',
                                command:()=>{ window.location="/users";}
                            },
                            {
                                label: 'Black matchers',
                                icon: 'pi pi-fw pi-times'
                            },

                        ]
                    }
                ]
            },
            {
                label: 'Project',
                icon: 'pi pi-fw pi-th-large',
                items: [
                    {
                        label: 'Dwyf',
                        icon: 'pi pi-fw pi-briefcase',
                        items: [
                            {
                                label: 'Dashboard',
                                icon: 'pi pi-fw pi-home'
                            },
                            {
                                label: 'Information',
                                icon: 'pi pi-fw pi-info-circle'
                            },
                            {
                                label: 'Calendar',
                                icon: 'pi pi-fw pi-calendar'
                            },
                            {
                                label: 'Tasks',
                                icon: 'pi pi-fw pi-bookmark'
                            },
                            {
                                label: 'Members',
                                icon: 'pi pi-fw pi-users'
                            },
                        ]
                    }
                ]
            },
            {
                label: 'Analytics',
                icon: 'pi pi-fw pi-chart-bar',
                items: [
                    {
                        label: 'Dwyf',
                        icon: 'pi pi-fw pi-user-plus',
                        items: []
                    }
                ]
            },
            {
                label: 'Support',
                icon: 'pi pi-fw pi-question-circle',
                items: [
                    {
                        label: 'Dwyf',
                        icon: 'pi pi-fw pi-forward'
                    }
                ]
            },
            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Account',
                        icon: 'pi pi-fw pi-user',
                        
                    }
                ]
            },
            {
                label: 'Logout',
                icon: 'pi pi-fw pi-power-off'
            }
        ];
    }

    render(){
        var user = JSON.parse(sessionStorage.getItem("user"));
        const start = <div><img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src='http://51.68.139.166/img/logo.png'} height="40" className="p-mr-2"></img></div>;
        const end = <div><img src={user.avatarUrl} alt="" className="topAvatar"/></div>;

        return (
            <div className="topbarWrapper">
                <Menubar model={this.items} start={start} end={end} />
            </div>
        )
    }

    
}

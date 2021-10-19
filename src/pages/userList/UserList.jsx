import React, { Component } from 'react';
import "./userList.css"
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import {userRows} from  "../../data"
import { Link } from "react-router-dom";
import { CalendarToday, MailOutline, PermIdentity, Publish } from "@material-ui/icons";
import 'react-toastify/dist/ReactToastify.css';
import Toastr from '../../utils/Toastr';
import axios from "axios";
import { TextField, MenuItem, OutlinedInput, InputAdornment} from '@material-ui/core';

const roles = [
    {
        value: 'ADMIN',
        label: 'Administrator',
    },
    {
        value: 'USER',
        label: 'User',
    },
]

const notifySuccess = (message) => Toastr.success(message);
const notifyError = (message) => Toastr.error(message);

export class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = 
        { 
            users: [],
            username: "",
            email: "",
            password: "",
            role: "",
            editedId: "",
            editedUsername: "",
            editedEmail: "",
            editedPassword: "",
            editedRole: "",
            editedAvatarUrl: "http://51.68.139.166/img/default.png",
            editedDate: "",
            editedProducts: []
        };
        this.handleUpdateUser= this.handleUpdateUser.bind(this);
        this.handleCreateUser= this.handleCreateUser.bind(this);
      }

    componentDidMount(){
        axios.get("http://51.68.139.166:8091/users",{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
            })
            .then(response => {
                this.setState({ users: response.data});
            })
            .catch(error => {
                console.log(error);
        })
    }

    selectUser(userId){
        axios.get("http://51.68.139.166:8091/users/"+userId,{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
            })
            .then(response => {
                this.setState({ editedId: response.data.id});
                this.setState({ editedUsername: response.data.username});
                this.setState({ editedEmail: response.data.email});
                this.setState({ editedPassword: response.data.password});
                this.setState({ editedRole: response.data.userRole});
                this.setState({ editedAvatarUrl: response.data.avatarUrl});
                this.setState({ editedDate: response.data.createdIn});
                this.setState({ editedProducts: response.data.productList});
            })
            .catch(error => {
                console.log(error);
            })
    }

    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    handleUpdateUser(event){
        event.preventDefault();
        if (this.state.editedUsername !== "" && this.state.editedEmail !== "" && this.state.editedPassword !== ""){
                let user = {
                    id: this.state.editedId,
                    avatarUrl: this.state.editedAvatarUrl,
                    username: this.state.editedUsername,
                    email: this.state.editedEmail,
                    password: this.state.editedPassword,
                    createdIn: this.state.editedDate,
                    userRole: this.state.editedRole,
                    productList: this.state.editedProducts
                }
                axios.post("http://51.68.139.166:8091/users/update",user,{
                    headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
                })
                .then(response => {
                    this.setState({users: response.data});
                    notifySuccess("You have successfully updated user "+this.state.editedUsername);
                })
                .catch(error => {
                    console.log(error);
                })
            }else{
                notifyError("All fields must be filled");
            }
            
    }
    handleCreateUser(event){
        event.preventDefault();
        if (this.state.username !== "" && this.state.password !== "" && this.state.email !== "" && this.state.role !== ""){
                let user = {
                    username: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    userRole: this.state.role,
                    productList: []
                }
                axios.post("http://51.68.139.166:8091/users",user,{
                    headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
                })
                .then(response => {
                    this.setState({users: response.data});
                    notifySuccess("You have successfully added new user "+this.state.username);
                })
                .catch(error => {
                    console.log(error);
                })
            }else{
                notifyError("All fields must be filled");
            }
            
    }
    

    
    render(){

        const handleDelete = (id)=>{
            this.setState({users: this.state.users.filter((item) => item.id !== id)})
            notifySuccess("User with ID: " + id + " removed succesfully!");
        }

        const columns = [
            { field: 'id', headerName: 'ID', width: 100 },
            {
              field: 'user',
              headerName: 'User',
              width: 180,
              renderCell: (params) => {
                  return (
                      <div className="userListUser">
                          <img className="userListImg" src={params.row.avatarUrl} alt=""/>
                          {params.row.username}
                      </div>
                  )
              }
            },
            {
              field: 'email',
              headerName: 'Email',
              width: 190,
            },
            {
                field: 'action',
                headerName: 'Action',
                width: 120,
                renderCell: (params) => {
                    return (
                        <>
                        <button className="userListEdit" onClick={()=>this.selectUser(params.row.id)}>Edit</button>
                        <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
                        </>
                    )
                }
              },
          ]

        return (
            <div className="usersContainer">
            <div className="userListContainer"> 
                <div className="userList">
                <div className="userListTitleContainer">
                <h1 className="userListTitle">User List</h1>
                </div>
                <div className="userTable">
                    <DataGrid 
                        autoHeight
                        rows={this.state.users}
                        columns={columns}
                        pageSize={12}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
                </div>
                <div className="user">
                <div className="userTitleContainer">
                    <h1 className="userTitle">Edit User</h1>
                </div>
                <div className="userContainer">
                    <div className="userShow">
                        <div className="userShowTop">
                            <img src={this.state.editedAvatarUrl} alt="" className="userShowImg" />
                            <div className="userShowTopTitle">
                                <span className="userShowUsername">{this.state.editedUsername}</span>
                                <span className="userShowUserRole">{this.state.editedRole}</span>
                            </div>
                        </div>
                        <div className="userShowBottom">
                            <span className="userShowTitle">Account Details</span>
                            <div className="userShowInfo">
                                <PermIdentity className="userShowIcon"/>
                                <span className="userShowInfoTitle">{this.state.editedUsername}</span>
                            </div>
                            <div className="userShowInfo">
                                <MailOutline className="userShowIcon"/>
                                <span className="userShowInfoTitle">{this.state.editedEmail}</span>
                            </div>
                            <div className="userShowInfo">
                                <CalendarToday className="userShowIcon"/>
                                <span className="userShowInfoTitle">{this.state.editedDate}</span>
                            </div>
                        </div>
                    </div>
                    <div className="userUpdate">
                        <span className="userUpdateTitle">Edit</span>
                        <form className="userUpdateForm" onSubmit={this.handleUpdateUser}>
                            <div className="userUpdateLeft">
                                    <div className="userInput">
                                        <TextField className="nameEditedInput" value={this.state.editedUsername} variant="outlined" label="Username" name="editedUsername" onChange={this.changeHandler}/>
                                    </div>
                                    <div className="userInput">
                                        <TextField className="emailEditedInput" value={this.state.editedEmail} variant="outlined" label="Email" name="editedEmail" onChange={this.changeHandler}/>
                                    </div>
                                    <div className="userInput">
                                        <TextField className="passwordEditedInput" value={this.state.editedPassword} variant="outlined" label="Password" name="editedPassword" type="password" onChange={this.changeHandler}/>
                                    </div>
                            </div>
                            <div className="userUpdateRight">
                                <div className="userUpdateUpload">
                                    <img src={this.state.editedAvatarUrl} alt="" className="userUpdateImg" />
                                    <label htmlFor="file"><Publish className="userUpdateIcon"/></label>
                                    <input type="file" id="file" style={{display: "none"}}/>
                                </div>
                                <button className="userUpdateButton" type="submit" >Update user</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="userCreateTitleContainer">
                    <h1 className="userTitle">Create User</h1>
                </div>
                <div className="userCreateContainer">
                    <div className="userCreateForm">
                    <form onSubmit={this.handleCreateUser}>
                        <div className="userInput">
                            <TextField className="nameInput" value={this.state.username} variant="outlined" label="Username" name="username" onChange={this.changeHandler}/>
                        </div>
    
                        <div className="userInput">
                            <TextField className="emailInput" value={this.state.email} variant="outlined" label="Email" name="email" onChange={this.changeHandler}/>
                        </div>
    
                        <div className="userInput">
                            <TextField className="passwordInput" value={this.state.password} variant="outlined" label="Password" name="password" type="password" onChange={this.changeHandler}/>
                        </div>
    
                        <div className="userInput">
                            <TextField className="roleInput"
                                select
                                label="Role"
                                value={this.state.role}
                                name="role"
                                onChange={this.changeHandler}
                                helperText="Please select user role"
                                variant="outlined"
                            >
                            {roles.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                        </div>
                        <button className="userPhotoUpdateButton" type="submit">Create user</button>
                        </form>
                    </div>
                    <div className="userCreatePhoto">
                     <div className="userUpdateUpload">
                    <img src="https://image.flaticon.com/icons/png/512/147/147140.png" alt="" className="userCreateImg" />
                    <label htmlFor="file"><Publish className="userUpdateIcon"/></label>
                    <input type="file" id="file" style={{display: "none"}}/>
                    </div>
                    
                </div>
                </div>
                
            </div>
    
            </div>
            </div>
            
        )
    }
    
}

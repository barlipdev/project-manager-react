import "./userList.css"
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import {userRows} from  "../../data"
import { Link } from "react-router-dom";
import { useState } from "react";

export default function UserList() {
    const [data, setData] = useState(userRows);

    const handleDelete = (id)=>{
        setData(data.filter((item) => item.id !== id));
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 150 },
        {
          field: 'user',
          headerName: 'User',
          width: 200,
          renderCell: (params) => {
              return (
                  <div className="userListUser">
                      <img className="userListImg" src={params.row.avatar} alt=""/>
                      {params.row.userName}
                  </div>
              )
          }
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
          },
        {
          field: 'role',
          headerName: 'Role',
          width: 150,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                    <Link to={"/user/"+params.row.id}>
                        <button className="userListEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
                    </>
                )
            }
          },
      ];
      

    return (
        <div className="userList">
            <h1 className="userListTitle">User List</h1>
            <DataGrid 
                autoHeight
                rows={data}
                columns={columns}
                pageSize={10}
                checkboxSelection
                disableSelectionOnClick
            />
        </div>
    )
}

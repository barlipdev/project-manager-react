import React, { Component } from 'react';
import "./products.css"
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import 'react-toastify/dist/ReactToastify.css';
import Toastr from '../../utils/Toastr';
import axios from "axios";
import SearchBar from "material-ui-search-bar";
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

const notifySuccess = (message) => Toastr.success(message);
const notifyError = (message) => Toastr.error(message);
var Barcode = require('react-barcode');

export class Products extends Component {

    constructor(props) {
        super(props);
        this.state = 
        { 
            products: [],
            loading: false,
            page: 2,
            rows: 11,
            totalPages: 100,
            productName: "",
            productBrand: "",
            productQuantity: "",
            productBarcode: "",
            searched: "",
            expirationDate: "",
            searchedUser: "",
            findedUsername: "",
            findedUserImg: "",
            findedUserId: ""
        };
        
      }

    componentDidMount(){
        this.setState({ loading: true});
        axios.get("http://51.68.139.166:8091/products?page=0&size=12",{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
            })
            .then(response => {
                this.setState({ products: response.data.content});
                this.setState({ totalPages: response.data.totalPages});
                this.setState({ loading: false});
            })
            .catch(error => {
                console.log(error);
        })
    }

    getData(page,rows,value){
        this.setState({ loading: true});
        if (value === ""){
            axios.get("http://51.68.139.166:8091/products?page="+page+"&size="+rows,{
                headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
                })
                .then(response => {
                    this.setState({ products: response.data.content});
                    this.setState({ totalPages: response.data.totalPages});
                    this.setState({ loading: false});
                    return page;
                })
                .catch(error => {
                    console.log(error);
            })
        }else{
            axios.get("http://51.68.139.166:8091/products/byName?page="+page+"&size="+rows+"&name="+value,{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
            })
            .then(response => {
                this.setState({ products: response.data.content});
                this.setState({ totalPages: response.data.totalPages});
                this.setState({ loading: false});
                return page;
            })
            .catch(error => {
                console.log(error);
        })
        }
        
    }



    selectproduct(productId){
        axios.get("http://51.68.139.166:8091/products/"+productId,{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
            })
            .then(response => {
                this.setState({ productName: response.data.productName});
                this.setState({ productBrand: response.data.brands});
                this.setState({ productQuantity: response.data.quantity});
                this.setState({ productBarcode: response.data.id});
            })
            .catch(error => {
                console.log(error);
            })
    }

    findUser(userEmail){
        axios.get("http://51.68.139.166:8091/users/email?email="+userEmail,{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
            })
            .then(response => {
                this.setState({ findedUsername: response.data.username});
                this.setState({ findedUserImg: response.data.avatarUrl});
                this.setState({ findedUserId: response.data.id});
            })
            .catch(error => {
                console.log(error);
            })
    }

    addProductToUser(productId,userId,expirationDate){
        let date = new Date(expirationDate).toISOString();
        date = date.substr(0,10);
        let product = {
            id: productId
        }
        console.log(date);
        axios.post("http://51.68.139.166:8091/users/product/barcode?date="+date,product,{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
        })
        .then(response => {
                axios.post("http://51.68.139.166:8091/users/product?userId="+userId,response.data,{
                headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
            })
            .then(response => {
                notifySuccess("Product with ID: " + response.data.id + " successfully added to user with ID "+ userId +"!");
            })
            .catch(error => {
                console.log(error);
            })
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


    
    render(){
          const cancelSearch = () => {
            this.setState({searched: ""})
            this.getData(0,this.state.rows,"");
          };

        const handleDelete = (id)=>{
            this.setState({products: this.state.products.filter((item) => item.id !== id)})
            notifySuccess("Product with ID: " + id + " removed succesfully!");
        }

        const columns = [
            { field: 'id', headerName: 'Barcode', width: 180 },
            {
              field: 'productName',
              headerName: 'Product name',
              width: 300,
            },
            {
              field: 'brands',
              headerName: 'Brand',
              width: 300,
            },
            {
                field: 'action',
                headerName: 'Action',
                width: 120,
                renderCell: (params) => {
                    return (
                        <>
                        <button className="productListEdit" onClick={()=>this.selectproduct(params.row.id)}>Edit</button>
                        <DeleteOutline className="productListDelete" onClick={()=>handleDelete(params.row.id)}/>
                        </>
                    )
                }
              },
          ]

        return (
            <div className="productsContainer">
            <div className="productListContainer"> 
                <div className="productList">
                <div className="productListTitleContainer">
                <h1 className="productListTitle">Products list</h1>
                </div>
                <div className="productTable">
                    <div className="searchBar">
                    <SearchBar
                            value={this.state.searched}
                            onChange={(searchVal) => this.setState({searched: searchVal})}
                            onCancelSearch={() => cancelSearch()}
                            onRequestSearch={() => this.getData(0,this.state.rows,this.state.searched)}
                        />
                    </div>
                    <div className="datagrid">
                    <DataGrid
                        autoHeight
                        rows={this.state.products}
                        columns={columns}
                        pagination
                        pageSize={this.state.rows}
                        rowsPerPageOptions={[5]}
                        rowCount={this.state.totalPages}
                        paginationMode="server"
                        onPageChange={(newPage) => this.getData(newPage,this.state.rows,this.state.searched)}
                        loading={this.state.loading}
                    />
                    </div>
                    
                </div>
                </div>
                <div className="product">
                <div className="productTitleContainer">
                    <h1 className="productTitle">Product Info</h1>
                </div>
                <div className="productContainer">
                    <div className="productShow">
                        <div className="productShowTop">
                            <div className="productShowTopTitle">
                                <span className="productShowproductname">{this.state.editedproductname}</span>
                                <span className="productShowproductRole">{this.state.editedRole}</span>
                            </div>
                        </div>
                        <div className="productShowBottom">
                            <div className="productShowInfo">
                                <span className="productShowTitle">Product name: </span>
                                <span className="productShowInfoTitle">{this.state.productName}</span>
                            </div>
                            <div className="productShowInfo">
                            <span className="productShowTitle">Brand: </span>
                                <span className="productShowInfoTitle">{this.state.productBrand}</span>
                            </div>
                            <div className="productShowInfo">
                            <span className="productShowTitle">Quantity: </span>
                                <span className="productShowInfoTitle">{this.state.productQuantity}</span>
                            </div>
                            <div className="productShowInfo">
                                <Barcode value={this.state.productBarcode} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="productCreateTitleContainer">
                    <h1 className="productTitle">Add product to user</h1>
                </div>
                <div className="productCreateContainer">
                    <div className="productCreateForm">
                        <div className="productInput">
                            <span className="productShowTitle">Product name: </span>
                            <span className="productShowInfoTitle">{this.state.productName}</span>
                        </div>
    
                        <div className="productInput">
                            <span className="productShowTitle">Expiration date: </span>
                            <p></p>
                            <div className="expirationCalendar">
                                <Calendar id="icon" value={this.state.expirationDate} onChange={(e) => this.setState({ expirationDate: e.value })} showIcon dateFormat='dd/mm/yy' />
                            </div>
                        </div>
    
                        <div className="productInput">
                            <span className="productShowTitle">To user: </span>
                            <div className="userSearch">
                                <SearchBar
                                value={this.state.searchedUser}
                                onChange={(searchVal) => this.setState({searchedUser: searchVal})}
                                onRequestSearch={() => this.findUser(this.state.searchedUser)}
                                />
                            </div>
                        </div>

                        <div className="userDisplay">
                            <Chip label={this.state.findedUsername} image={this.state.findedUserImg} removable />
                        </div>
                        <div className="addUserProductButton">
                            <Button label="Add product" loadingOptions={{ position: 'right' }} onClick={()=> this.addProductToUser(this.state.productBarcode,
                                this.state.findedUserId,
                                this.state.expirationDate)} />
                        </div>
                    </div>
                </div>
                
            </div>
    
            </div>
            </div>
            
        )
    }
    
}

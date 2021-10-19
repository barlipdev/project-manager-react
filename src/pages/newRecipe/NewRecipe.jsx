import React from 'react'
import "./newRecipe.css"
import { TextField, MenuItem, OutlinedInput, InputAdornment} from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Toastr from '../../utils/Toastr';
import uuid from 'react-uuid'

const foodTypes = [
    {
      value: 'Sniadanie',
      label: 'Śniadanie',
    },
    {
      value: 'Obiad',
      label: 'Obiad',
    },
    {
      value: 'Deser',
      label: 'Deser',
    },
    {
      value: 'Kolacja',
      label: 'Kolacja',
    },
    {
      value: 'Inne',
      label: 'Inne',
    },
  ];
const productTypes = [
    {
      value: 'KG',
      label: 'Kg',
    },
    {
      value: 'L',
      label: 'L',
    },
    {
      value: 'SZT',
      label: 'Szt',
    },
  ];

const notifySuccess = (message) => Toastr.success(message);
const notifyError = (message) => Toastr.error(message);

export class NewRecipe extends React.Component{

    constructor(props) {
        super(props);
        this.state = 
        { 
            name: '',
            description: '',
            foodType: '',
            productName: "",
            tags: "",
            productType: "",
            count: 0,
            products: [],
        };
        this.handleAddProduct= this.handleAddProduct.bind(this);
        this.handleAddRecipe = this.handleAddRecipe.bind(this);
      }

    
      changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        }

    handleAddProduct(event){
        event.preventDefault();
        if (this.state.productName !== "" && this.state.productType !== "" && this.state.count !== 0 && this.state.tags !== ""){
            let product = {
                id: uuid(),
                name: this.state.productName,
                productType: this.state.productType,
                count: this.state.count,
                productTag: this.state.tags
            };
            this.setState({products: [...this.state.products, product]});
            notifySuccess("You added "+this.state.productName+" with count "+ this.state.count +" "+ this.state.productType);
        }else{
            notifyError("All fields must be filled!");
        }
        
    }
    handleAddRecipe(){
        if (this.state.products.length > 0){
            if (this.state.name !== "" && this.state.foodType !== "" && this.state.description !== ""){
                let recipe = {
                    name: this.state.name,
                    productList: this.state.products,
                    description: this.state.description,
                    foodType: this.state.foodType
                }
                axios.post("http://51.68.139.166:8091/recipe/add",recipe,{
                    headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
                })
                .then(response => {
                    notifySuccess("You added recipe "+this.state.name+" with count of products  "+ this.state.products.length);
                })
                .catch(error => {
                    console.log(error);
                })
            }else{
                notifyError("All fields must be filled");
            }
            
        }else{
            notifyError("The products list not be empty!");
        }
        
    }

    

    render(){
        const handleDelete = (id)=>{
            this.setState({products: this.state.products.filter((item) => item.id !== id)})
            notifySuccess("Product with ID: " + id + " removed succesfully!");
        }
        const columns = [
            {
                field: 'id',
                headerName: 'ID',
                width: 100,
            },
            {
              field: 'name',
              headerName: 'Product name',
              width: 250,
            },
            {
              field: 'productTag',
              headerName: 'Product tags',
              width: 250,
            },
            {
                field: 'count',
                headerName: 'Count',
                width: 250,
              },
            {
                field: 'productType',
                headerName: 'Product type',
                width: 200,
              },
              
            {
                field: 'action',
                headerName: 'Action',
                width: 200,
                renderCell: (params) => {
                    return (
                        <>
                        <DeleteOutline className="productDelete" onClick={()=>handleDelete(params.row.id)}/>
                        </>
                    )
                }
              },
          ];

          

        return (
            <div className="newRecipe">
                <div className="recipeTitleContainer">
                    <h1 className="recipeTitle">Recipe creator</h1>
                    <button onClick={this.handleAddRecipe} className="recipeAddButton">Add recipe</button>
                 </div>
                <div className="recipeContainers">
                    <div className="recipeInfoContainer">
                        <form>
                            <h2>Recipe info</h2>
                            <div className="recipeInput">
                                <TextField className="nameInput" value={this.state.name} variant="outlined" label="Recipe name" name="name" onChange={this.changeHandler}/>
                            </div>
                            <div className="recipeInput">
                                <TextField className="foodTypeInput"
                                    select
                                    label="Food type"
                                    value={this.state.foodType}
                                    name="foodType"
                                    onChange={this.changeHandler}
                                    helperText="Please select recipe type"
                                    variant="outlined"
                                >
                                {foodTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </div>
                            
                            <div className="recipeInput">
                                <TextField multiline  rows={8} className="descriptionInput" value={this.state.description} variant="outlined" label="Recipe description" name="description" onChange={this.changeHandler}/>
                            </div>
                        </form>
                    </div>
                    <div className="recipeProductsContainer">
                        <div className="recipeProductsContainerLeft">
                        <form onSubmit={this.handleAddProduct} >
                            <h2>Recipe products</h2>
                            <div className="recipeInput">
                                <TextField className="nameInput" variant="outlined" value={this.state.productName} label="Product name" name="productName" onChange={this.changeHandler}/>
                            </div>
                            <div className="recipeInput">
                                <TextField className="nameInput" variant="outlined" value={this.state.tags} label="Product tags" name="tags" onChange={this.changeHandler}/>
                            </div>
                            <div className="recipeInput">
                                <TextField className="productTypeInput"
                                    select
                                    label="Product type"
                                    value={this.state.productType}
                                    name="productType"
                                    onChange={this.changeHandler}
                                    helperText="Please select product type"
                                    variant="outlined"
                                >
                                {productTypes.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            </div>
                            
                            <div className="recipeInput">
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    value={this.state.count}
                                    name="count"
                                    onChange={this.changeHandler}
                                    endAdornment={<InputAdornment position="end">{this.state.productType}</InputAdornment>}
                                    aria-describedby="outlined-weight-helper-text"
                                    labelWidth={0}
                                />
                            </div>
                            <button type="submit" className="addRecipeButton">Add Product</button>
                        </form>
                        </div>
                        <div className="recipeProductsContainerRight">
                            <h4 class="infoTitle">Remember about this: </h4>
                            <div className="infoBody">
                                <ul>
                                    <li>Remember to add products before adding any recipes.</li>
                                    <li>Remember to write the numbers with the dot in the quantity of the product.
                                        <br></br>
                                        Good example: 0.20
                                        Bad example:
                                        0,20</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="recipeProductsTableContainer">
                <h2>Products list</h2>
                <div className="productTable">
                    <DataGrid 
                                autoHeight
                                rows={this.state.products}
                                columns={columns}
                                pageSize={3}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                </div>
                </div>
            </div>
        )
    }
    
}

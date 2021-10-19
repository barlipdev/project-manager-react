import "./recipeList.css"
import {RecipesRadarChart} from "../../components/radarChart/RecipesRadarChart";
import RecipesPieChart from "../../components/pieChart/RecipesPieChart";
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from "@material-ui/icons";
import React from "react";
import SearchBar from "material-ui-search-bar";
import axios from "axios";
import { Link } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Toastr from '../../utils/Toastr';

const notifySuccess = (message) => Toastr.success(message);
const notifyError = (message) => Toastr.error(message);

export class RecipeList extends React.Component {

    constructor(){
        super()
        this.state = {
            recipes: [],
            allData: [],
            searched: "",
        }
    }

    componentDidMount(){
        axios.get("http://51.68.139.166:8091/recipe/all",{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
        })
        .then(response => {
            this.setState({ recipes: response.data});
            this.setState({ allData: response.data});
        })
        .catch(error => {
            console.log(error);
        })
        
    }

    render(){


    const handleDelete = (id)=>{
        this.setState({recipes: this.state.recipes.filter((item) => item.id !== id)})
        axios.delete('http://51.68.139.166:8091/recipe/'+id,{
            headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
        })
        .then(() => {
            notifySuccess("Recipe with ID: " + id + " removed succesfully!");
        });
    }

    const requestSearch = (searchedVal) => {
        if (searchedVal !== ""){
            const filteredRows = this.state.allData.filter((row) => {
                return row.name.toLowerCase().includes(searchedVal.toLowerCase());
              });
              this.setState({recipes: filteredRows})
        }else{
            this.setState({recipes: this.state.allData})
        }
        
      };
    
      const cancelSearch = () => {
        this.setState({searched: ""})
        requestSearch(this.state.searched);
      };

    const columns = [
        { field: 'id', headerName: 'ID', width: 250 },
        {
          field: 'name',
          headerName: 'Recipe',
          width: 500,
        },
        {
          field: 'foodType',
          headerName: 'Type',
          width: 500,
        },
        {
            field: 'action',
            headerName: 'Action',
            width: 300,
            renderCell: (params) => {
                return (
                    <>
                    <Link to={{pathname:"/editRecipe", state: { recipeId: params.row.id }}} >
                        <button className="recipeEdit">Edit</button>
                    </Link>
                    <DeleteOutline className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
                    </>
                )
            }
          },
      ];

        return (
            <div className="recipeList">
                <div className="recipeTitleContainer">
                <h1 className="recipeTitle">Recipes list</h1>
                <Link to="/newRecipe">
                    <button className="recipeAddButton">Create Recipe</button>
                </Link>
            </div>
                <div className="recipeListTop">
                    <div className="recipeListCharts">
                        <div className="recipeListChart">
                            <RecipesRadarChart/>
                        </div>
                        <div className="recipeListChart">
                            <RecipesPieChart/>
                        </div>
                    </div>
                </div>
                <div className="recipeListBottom">
                    <div className="recipeListSearch">
                        <SearchBar
                            value={this.state.searched}
                            onChange={(searchVal) => requestSearch(searchVal)}
                            onCancelSearch={() => cancelSearch()}
                        />
                    </div>
                    <div className="recipeListDataTable">
                        <DataGrid 
                            autoHeight
                            rows={this.state.recipes}
                            columns={columns}
                            pageSize={5}
                            checkboxSelection
                            disableSelectionOnClick
                            searching={true}
                        />
                    </div>
                </div>
            </div>
        )
    }

    

    
}

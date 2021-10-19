import SideBar from "./components/sidebar/SideBar";
import {Topbar} from "./components/topbar/Topbar";
import Home from "./pages/home/Home"
import "./app.css"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {UserList} from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import {RecipeList} from "./pages/recipeList/RecipeList";
import Login from "./pages/auth/login/Login";
import {NewRecipe} from "./pages/newRecipe/NewRecipe";
import "primereact/resources/themes/saga-blue/theme.css";

import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import EditRecipe from "./pages/editRecipe/EditRecipe";
import { Products } from "./pages/products/Products";

function App() {

  if (sessionStorage.getItem("token") == null){
    return (
      <Router>
        <Route exact path="/">
          <Login/>
        </Route>
      </Router>
    )
  }else{
    return (
      <Router>
        <Topbar/>
        <div className="container">
          
          <Switch>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/users">
              <UserList/>
            </Route>
            <Route path="/products">
              <Products/>
            </Route>
            <Route path="/user/:userId">
              <User/>
            </Route>
            <Route path="/newUser">
              <NewUser/>
            </Route>
            <Route path="/recipe">
              <RecipeList/>
            </Route>
            <Route path="/newRecipe">
              <NewRecipe/>
            </Route>
            <Route path="/:handle" component={EditRecipe}/>
          </Switch>
          
        </div>
      </Router>
    );
  }

  
}

export default App;

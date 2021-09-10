import "./widgetMatchedRecipes.css"

export default function WidgetMatchedRecipes() {

    const Button = ({type}) => {
        return <button className={"widgetTdButton " + type}>{type}</button>
    }

    return (
        <div className="widgetMatchedRecipes">
            <h3 className="widgetMatchedRecipesTitle">Latest matched recipes</h3>
            <table className="widgetMatchedRecipesTable">
                <tr className="widgetMatchedRecipesTableTr">
                    <th className="widgetMatchedRecipesTableTh">User</th>
                    <th className="widgetMatchedRecipesTableTh">Date</th>
                    <th className="widgetMatchedRecipesTableTh">Recipe</th>
                    <th className="widgetMatchedRecipesTableTh">Food type</th>
                </tr>
                <tr className="widgetMatchedRecipesTableTr">
                    <td className="widgetTdUser">
                        <img src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/dribble_pic.png?compress=1&resize=400x300" alt="" className="widgetUserImg" />
                        <span className="widgetTdUserUsername">Jan Kowalski</span>
                    </td>
                    <td className="widgetTdDate">2 Jun 2021</td>
                    <td className="widgetTdRecipe">Pancakes</td>
                    <td className="widgetTdFoodType"><Button type="Breakfast"/></td>
                </tr>
                <tr className="widgetMatchedRecipesTableTr">
                    <td className="widgetTdUser">
                        <img src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/dribble_pic.png?compress=1&resize=400x300" alt="" className="widgetUserImg" />
                        <span className="widgetTdUserUsername">Jan Kowalski</span>
                    </td>
                    <td className="widgetTdDate">18 Jun 2021</td>
                    <td className="widgetTdRecipe">Chicken and Rice</td>
                    <td className="widgetTdFoodType"><Button type="Dinner"/></td>
                </tr>
                <tr className="widgetMatchedRecipesTableTr">
                    <td className="widgetTdUser">
                        <img src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/dribble_pic.png?compress=1&resize=400x300" alt="" className="widgetUserImg" />
                        <span className="widgetTdUserUsername">Jan Kowalski</span>
                    </td>
                    <td className="widgetTdDate">1 Jun 2021</td>
                    <td className="widgetTdRecipe">Ice creams</td>
                    <td className="widgetTdFoodType"><Button type="Dessert"/></td>
                </tr>
                <tr className="widgetMatchedRecipesTableTr">
                    <td className="widgetTdUser">
                        <img src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/dribble_pic.png?compress=1&resize=400x300" alt="" className="widgetUserImg" />
                        <span className="widgetTdUserUsername">Jan Kowalski</span>
                    </td>
                    <td className="widgetTdDate">15 Jun 2021</td>
                    <td className="widgetTdRecipe">Fish</td>
                    <td className="widgetTdFoodType"><Button type="Supper"/></td>
                </tr>
                <tr className="widgetMatchedRecipesTableTr"> 
                    <td className="widgetTdUser">
                        <img src="https://cdn.dribbble.com/users/1577045/screenshots/4914645/dribble_pic.png?compress=1&resize=400x300" alt="" className="widgetUserImg" />
                        <span className="widgetTdUserUsername">Jan Kowalski</span>
                    </td>
                    <td className="widgetTdDate">2 Jun 2021</td>
                    <td className="widgetTdRecipe">Twix Mars</td>
                    <td className="widgetTdFoodType"><Button type="Others"/></td>
                </tr>
            </table>
        </div>
    )
}

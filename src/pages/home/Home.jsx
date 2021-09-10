import Chart from "../../components/chart/Chart"
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo"
import "./home.css"
import {userActivityData} from "../../data"
import {WidgetNewUsers} from "../../components/widgetNewUsers/WidgetNewUsers"
import WidgetMatchedRecipes from "../../components/widgetMatchedRecipes/WidgetMatchedRecipes"

export default function Home() {
    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={userActivityData} title="Users Activity Analytics" dataKey="Active Users"/>
            <div className="homeWidgets">
                <WidgetNewUsers/>
                <WidgetMatchedRecipes/>
            </div>
        </div>
    )
}

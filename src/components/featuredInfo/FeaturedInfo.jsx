import "./featuredInfo.css"
import {TrendingUp,TrendingDown} from "@material-ui/icons"

export default function FeaturedInfo() {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Users</span>
                <div className="featuredStatsContainer">
                    <span className="featuredCount">180</span>
                    <span className="featuredRate">-15<TrendingDown className="featuredIcon negative"/></span>
                </div>
                <div className="featuredSub">Last Week</div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Products</span>
                <div className="featuredStatsContainer">
                    <span className="featuredCount">281</span>
                    <span className="featuredRate">+176<TrendingUp className="featuredIcon"/></span>
                </div>
                <div className="featuredSub">Last Week</div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Recipes</span>
                <div className="featuredStatsContainer">
                    <span className="featuredCount">220</span>
                    <span className="featuredRate">+175<TrendingUp className="featuredIcon"/></span>
                </div>
                <div className="featuredSub">Last Week</div>
            </div>
        </div>
    )
}

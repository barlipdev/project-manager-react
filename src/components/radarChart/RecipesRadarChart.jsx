import React from 'react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis} from 'recharts';
import axios from "axios";


export class RecipesRadarChart extends React.Component {

    constructor(){
      super();
      this.state = {
        data: [],
    }
    }

    componentDidMount(){
      axios.get("http://51.68.139.166:8091/stats/radar",{
          headers: {"Authorization": "Bearer "+ sessionStorage.getItem("token")}
      })
      .then(response => {
          this.setState({ data: response.data});
      })
      .catch(error => {
          console.log(error);
      })
      
  }

    render(){
      return (
        <div className="radarChart">
            <RadarChart
                width={750}
                height={300}
                data={this.state.data}
                >
            <PolarGrid />
            <PolarAngleAxis dataKey="foodType" />
            <PolarRadiusAxis />
            <Radar
                name="Recipes"
                dataKey="count"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
                />
            </RadarChart>
        </div>
    )
  }
    
}

import Chart from "../Chart";
import React, { Component } from "react";
import PropTypes from "prop-types";

class ShowMoviesChar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      chartData: {},
      seanceList: this.props.seanceList,
    };
  }

  componentDidMount() {
    this.getDataViews(this.props.id);
  }
  getDataViews(id) {
    const { seanceList } = this.state;
    var views = [0, 0, 0, 0, 0, 0, 0];
    if (seanceList === undefined) {
      return;
    }
    var seanceQ = seanceList.filter((tmp) => tmp.movie.id === id);

    seanceQ.forEach((element) => {
      if (new Date(element.date).getDay() === 1) {
        views[0] += element.ticketsSold;
      } else if (new Date(element.date).getDay() === 2) {
        views[1] += element.ticketsSold;
      } else if (new Date(element.date).getDay() === 3) {
        views[2] += element.ticketsSold;
      } else if (new Date(element.date).getDay() === 4) {
        views[3] += element.ticketsSold;
      } else if (new Date(element.date).getDay() === 5) {
        views[4] += element.ticketsSold;
      } else if (new Date(element.date).getDay() === 6) {
        views[5] += element.ticketsSold;
      } else if (new Date(element.date).getDay() === 0) {
        views[6] += element.ticketsSold;
      }
    });
    this.setState({
      chartData: {
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        datasets: [
          {
            labal: "Movie",
            data: views,
            backgroundColor: [
              "rgba(255,99,132,0.6)",
              "rgba(54,162,235,0.6)",
              "rgba(255,206,86,0.6)",
              "rgba(75,192,192,0.6)",
            ],
          },
        ],
      },
    });
  }

  render() {
    return (
      <div>
        <Chart
          chartData={this.state.chartData}
          legendPosition="bottom"
          displayTitle={true}
          displayLegend={false}
        />
        ;
      </div>
    );
  }
}

ShowMoviesChar.propTypes = {
  id: PropTypes.number.isRequired,
  seanceList: PropTypes.array.isRequired,
};
export default ShowMoviesChar;

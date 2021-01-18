import React, { Component } from "react";

import { Bar } from "react-chartjs-2";

import PropTypes from "prop-types";

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData,
    };
  }
  componentDidMound() {}
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: "right",
    movie: "Unknown",
  };
  render() {
    return (
      <div className="chart">
        <Bar
          data={this.props.chartData}
          height={500}
          options={{
            maintainAspectRatio: false,
            title: {
              display: this.props.displayTitle,
              text: "Popularity Of The Movie In The Week ",
              fontSize: 25,
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition,
            },
          }}
        />
      </div>
    );
  }
}
Chart.propTypes = {
  chartData: PropTypes.instanceOf(Object).isRequired,
  displayTitle: PropTypes.bool.isRequired,
  displayLegend: PropTypes.bool.isRequired,
};
export default Chart;

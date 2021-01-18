import React, { Component } from "react";
import PropTypes from "prop-types";

class Hall extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: this.props.number,
      capacity: this.props.capacity,
    };
  }

  render() {
    const { number, capacity } = this.props;

    return (
      <div>
        {number} {capacity}
        {/*console.log("Hall: " + number + " " + capacity)*/}
      </div>
    );
  }
}

Hall.propTypes = {
  number: PropTypes.number.isRequired,
  //capacity: PropTypes.number.isRequired,

  capacity: function (props, propName, component) {
    if (props[propName] < 50) {
      return new Error(propName + " is less than 50");
    }
  },
};

export default Hall;

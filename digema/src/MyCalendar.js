import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import PropTypes from "prop-types";

class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  onChange = (newDate) => {
    this.setState({
      date: newDate,
    });
    this.props.changeDate(newDate);
  };
  render() {
    return <Calendar onChange={this.onChange} value={this.state.date} />;
  }
}
MyCalendar.propTypes = {
  changeDate: PropTypes.func.isRequired,
};
export default MyCalendar;

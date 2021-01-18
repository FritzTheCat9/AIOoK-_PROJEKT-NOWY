import React, { Component } from "react";
import PropTypes from "prop-types";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      duration: this.props.duration,
    };
  }

  render() {
    const { id, title, duration } = this.props;

    return (
      <div>
        {id} {title} {duration}
        {/*console.log("Movie: " + id + " " + title + " " + duration)*/}
      </div>
    );
  }
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default Movie;

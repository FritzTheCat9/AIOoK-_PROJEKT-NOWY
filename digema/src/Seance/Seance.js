import React, { Component } from 'react'
import PropTypes from "prop-types";
import Movie from "../Movie/Movie";
import Hall from "../Hall/Hall";

class Seance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            date: this.props.date,
            movie: this.props.movie,
            hall: this.props.hall,
            ticketsSold: this.props.ticketsSold,
            ticketsAvaliable: this.props.ticketsAvaliable,
            occupiedSeats: this.props.occupiedSeats,
        };
    }

    render() {
        const { id, date, movie, hall, ticketsSold, ticketsAvaliable, occupiedSeats } = this.state;

        return (
            <div>
                {id} {date} {movie} {hall} {ticketsSold} {ticketsAvaliable} {occupiedSeats}
                {/*console.log("Seance: " + id + " " + date + " " + movie + " " + hall + " " + ticketsSold + " " + ticketsAvaliable + " " + occupiedSeats)*/}
            </div>
        );
    }
}

Seance.propTypes = { 
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    movie: PropTypes.instanceOf(Movie),
    hall: PropTypes.instanceOf(Hall),
    ticketsSold: PropTypes.number.isRequired,
    ticketsAvaliable: PropTypes.number.isRequired,
    occupiedSeats: PropTypes.array,
  }

export default Seance;
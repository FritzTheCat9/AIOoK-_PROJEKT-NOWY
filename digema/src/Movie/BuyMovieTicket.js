import React, { Component } from "react";
import * as CinemaAPI from "../CinemaAPI";
import "./BuyMovieTicket.css";
import PropTypes from "prop-types";

class BuyMovieTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      seance: undefined,
    };
  }

  componentDidMount() {
    const { id, seance } = this.state;
    if (seance === undefined) {
      CinemaAPI.getSeanceById(id).then((response) => {
        this.setState({
          seance: response,
        });
      });
    }
  }

  /*componentDidMount() {
    const { id, seance } = this.state;
    const { getSeanceById } = this.props;
    if (seance === undefined) {
        this.setState({
          seance: getSeanceById(id),
        });
    }
  }*/

  FreeSeatClick(seat) {
    //console.log("FreeSeatClick" + seat);
    const { seance } = this.state;
    const { editSeance } = this.props;

    seance.occupiedSeats[seat] = 1;

    editSeance(
      seance.id,
      seance.date,
      seance.movie,
      seance.hall,
      ++seance.ticketsSold,
      --seance.ticketsAvaliable,
      seance.occupiedSeats
    );
  }

  NoFreeSeatClick(seat) {
    //console.log("NoFreeSeatClick" + seat);
    const { seance } = this.state;
    const { editSeance } = this.props;

    seance.occupiedSeats[seat] = 0;

    editSeance(
      seance.id,
      seance.date,
      seance.movie,
      seance.hall,
      --seance.ticketsSold,
      ++seance.ticketsAvaliable,
      seance.occupiedSeats
    );
  }

  createTable = () => {
    const { seance } = this.state;

    //console.log(seance);

    let table = [];

    if (seance !== undefined) {
      // Outer loop to create parent
      for (let i = 0; i < seance.occupiedSeats.length / 10; i++) {
        let children = [];
        //Inner loop to create children
        for (let j = 0; j < 10; j++) {
          if (j + i * 10 < seance.occupiedSeats.length)
            children.push(
              seance.occupiedSeats[j + i * 10] === 0 ? (
                <button key={10 * i + j}
                  className="FreeSeat"
                  onClick={() => {
                    this.FreeSeatClick(10 * i + j);
                  }}
                >{`Seat${10 * i + j + 1}`}</button>
              ) : (
                <button key={10 * i + j}
                  className="NoFreeSeat"
                  onClick={() => {
                    this.NoFreeSeatClick(10 * i + j);
                  }}
                >{`Seat${10 * i + j + 1}`}</button>
              )
            );
        }
        //Create the parent and add the children
        table.push(<div key={i}>{children}</div>);
      }
      return table;
    }
  };

  render() {
    //const { seance } = this.state;
    //console.log(this.props);
    //console.log(seance);

    return <div>{this.createTable()}</div>;
  }
}
BuyMovieTicket.propTypes = {
  id: PropTypes.number.isRequired,
  // seance: PropTypes.instanceOf(Object),
  getSeanceById: PropTypes.func.isRequired,
  editSeance: PropTypes.func.isRequired,
};
export default BuyMovieTicket;

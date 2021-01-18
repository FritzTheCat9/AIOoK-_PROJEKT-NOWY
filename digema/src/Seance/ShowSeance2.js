import React, { Component } from "react";
import MyCalendar from "../MyCalendar";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import ShowDate from "../ShowDate";
import Movie from "../Movie/Movie";
import Hall from "../Hall/Hall";
class ShowSeance2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      seanceList: this.props.seanceList,
      list: [],
      date: new Date(),
    };
  }

  componentDidMount() {
    console.log("ID: " + this.state.id);
    if (this.state.id === undefined) {
      this.getCurrentSeances(new Date());
      console.log("sea: " + this.state.list);
    } else {
      this.getSeanceById(this.props.id);
    }
  }
  getCurrentSeances = (date) => {
    const { seanceList } = this.state;
    var seances = seanceList.filter(
      (seanceTmp) =>
        new Date(
          new Date(seanceTmp.date).getTime() + seanceTmp.movie.duration * 60000
        ).getTime() > new Date(date).getTime()
    );
    this.setState({
      list: seances,
    });
  };
  getSeanceById = (id) => {
    const { seanceList } = this.state;
    var seances = seanceList.filter((seanceTmp) => seanceTmp.movie.id == id);
    this.setState({ list: seances });
  };
  getSeansesByDate = (date) => {
    const { seanceList } = this.state;
    var seances = seanceList.filter(
      (seanceTmp) =>
        new Date(seanceTmp.date).getDate() == new Date(date).getDate() &&
        new Date(seanceTmp.date).getMonth() == new Date(date).getMonth() &&
        new Date(seanceTmp.date).getFullYear() == new Date(date).getFullYear()
    );
    this.setState({ list: seances });
  };

  getSeansesByDateAndMovieID(date, id) {
    const { seanceList } = this.state;
    var seances = seanceList.filter(
      (seanceTmp) =>
        seanceTmp.movie.id === parseInt(id) &&
        new Date(seanceTmp.date).getDate() == new Date(date).getDate() &&
        new Date(seanceTmp.date).getMonth() == new Date(date).getMonth() &&
        new Date(seanceTmp.date).getFullYear() == new Date(date).getFullYear()
    );
    this.setState({ list: seances });
  }
  getSeances() {
    this.setState({
      list: this.seanceList,
    });
  }
  changeDate = (newDate) => {
    this.setState({ date: newDate });
    if (this.state.id === undefined) {
      this.getSeansesByDate(newDate);
    } else {
      this.getSeansesByDateAndMovieID(newDate, this.props.id);
    }
  };
  render() {
    const { list, date } = this.state;

    return (
      <div className="mx-3 mt-3">
        <div className="d-flex justify-content-center">
          <MyCalendar changeDate={this.changeDate} />
        </div>

        <div>
          <h1 className="display-3">Seance List:</h1>
          <h5 className="text-muted text-capitalize">
            This is all current seances. Pick date to show seances in picked
            day.
          </h5>
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Date</th>
                <th scope="col">Movie</th>
                <th scope="col">Hall</th>
                <th scope="col">TicketsSold</th>
                <th scope="col">TicketsAvaliable</th>
                <th scope="col">Buy ticket</th>
              </tr>
            </thead>
            <tbody>
              {console.log(this.state.list)}
              {((this.state.list === undefined) || (typeof this.state.list === 'string')) ? (
                <tr> </tr>
              ) : (
                  this.state.list.map((seance, key) => {
                    //console.log(seance.id + " " + seance.date + " " + seance.movie + " " + seance.hall + " " + seance.ticketsSold + " " + seance.ticketsAvaliable + " " + seance.occupiedSeats);
                    return (
                      <tr key={seance.id}>
                        <td>{seance.id}</td>
                        <td>
                          <ShowDate date={new Date(seance.date)} />
                        </td>
                        <td>
                          <Movie
                            id={seance.movie.id}
                            title={seance.movie.title}
                            duration={parseInt(seance.movie.duration)}
                          />
                        </td>
                        <td>
                          <Hall
                            number={seance.hall.number}
                            capacity={seance.hall.capacity}
                          />
                        </td>
                        <td>{seance.ticketsSold}</td>
                        <td>{seance.ticketsAvaliable}</td>

                        <td>
                          {/*console.log("eeeee" + JSON.stringify(seance.id))*/}
                          <Link
                            type="button"
                            className="btn btn-warning"
                            to={{ pathname: `/ticket/${seance.id}` }}
                          >
                            Buy ticket
                        </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

ShowSeance2.propTypes = {
  id: PropTypes.number,
  seanceList: PropTypes.array.isRequired,
  editSeance: PropTypes.func.isRequired,
  addSeance: PropTypes.func.isRequired,
  deleteSeance: PropTypes.func.isRequired,
};
export default ShowSeance2;

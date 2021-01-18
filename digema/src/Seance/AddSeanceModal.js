import React, { Component } from "react";
import Select from "react-select";
import * as CinemaAPI from "../CinemaAPI";
import PropTypes from "prop-types";

import Error from "../Error";
class AddSeanceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      date: "",
      time: "",
      occupiedSeats: [],

      movieId: -1,
      movieTitle: "",
      movieDuration: 0,

      hallNumber: -1,
      hallCapacity: 0,

      movieList: [],
      hallList: [],

      isBadDate: true,
      isBadHour: true,
      isBadMovie: true,
      isBadHall: true,
    };
  }

  componentDidMount() {
    const { movieList, hallList } = this.state;
    if (movieList.length === 0) {
      CinemaAPI.getAllMovies().then((response) => {
        response.forEach((movie) => {
          movie.value = movie.id;
          movie.label = movie.title;
        });
        this.setState({
          movieList: response,
        });
      });
    }
    if (hallList.length === 0) {
      CinemaAPI.getAllHalls().then((response) => {
        response.forEach((movie) => {
          movie.value = movie.number;
          movie.label = movie.number;
        });
        this.setState({
          hallList: response,
        });
      });
    }
  }

  dateHandler(e) {
    var eDate = e.target.value;
    if (new Date(eDate).getTime() + 60000 * 24 * 60 >= new Date().getTime()) {
      this.setState({ date: eDate, isBadDate: false });
    } else {
      this.setState({ date: eDate, isBadDate: true });
    }
  }

  timeHandler(e) {
    var eDate = e.target.value;
    if (
      eDate === "" ||
      (new Date(this.state.date).getFullYear() === new Date().getFullYear() &&
        new Date(this.state.date).getMonth() === new Date().getMonth() &&
        new Date(this.state.date).getDate() === new Date().getDate() &&
        new Date(
          this.state.date.split("-")[0],
          this.state.date.split("-")[1] - 1,
          this.state.date.split("-")[2],
          eDate.split(":")[0],
          eDate.split(":")[1]
        ).getTime() < new Date().getTime())
    ) {
      this.setState({ time: eDate, isBadHour: true });
    } else {
      this.setState({ time: eDate, isBadHour: false });
    }
  }

  makeDate() {
    const { date, time } = this.state;
    var hours = time.split(":")[0];
    var minutes = time.split(":")[1];
    var year = date.split("-")[0];
    var month = date.split("-")[1] - 1;
    var day = date.split("-")[2];

    var newDate = new Date(year, month, day, hours, minutes);
    return newDate;
  }

  movieHandler(selectedOption) {
    this.setState({
      movieId: selectedOption.id,
      movieTitle: selectedOption.title,
      movieDuration: selectedOption.duration,
      isBadMovie: false,
    });
  }

  hallHandler(selectedOption) {
    this.setState({
      hallNumber: selectedOption.number,
      hallCapacity: selectedOption.capacity,
      isBadHall: false,
    });
  }

  add = () => {
    if (
      !this.state.isBadDate &&
      !this.state.isBadHour &&
      !this.state.isBadMovie &&
      !this.state.isBadHall
    ) {
      const { addSeance, updateLists } = this.props;
      const {
        occupiedSeats,
        movieId,
        movieTitle,
        movieDuration,
        hallNumber,
        hallCapacity,
      } = this.state;
      var newMovie = {
        id: movieId,
        title: movieTitle,
        duration: movieDuration,
      };
      var newHall = {
        number: hallNumber,
        capacity: hallCapacity,
      };

      occupiedSeats.length = 0;

      for (let i = 0; i < newHall.capacity; i++) {
        occupiedSeats.push(0);
      }

      addSeance(
        this.makeDate(),
        newMovie,
        newHall,
        0,
        newHall.capacity,
        occupiedSeats
      );
      
      updateLists();
      this.handleClose();

      this.setState({ 
        isBadDate: true,
        isBadHour: true,
        isBadMovie: true,
        isBadHall: true,
      });
    }
  };

  handleClose() {
    /*this.setState({ 
          isBadDate: true,
          isBadHour: true,
          isBadMovie: true,
          isBadHall: true,
        });*/
  }

  render() {
    const { date, time, movieList, hallList } = this.state;
    console.log("time: ", this.state.time);
    return (
      <div
        className="modal fade"
        id="addSeanceModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addSeanceModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addSeanceModal">
                Add Seance
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.handleClose();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <span className="modal-lable">Date:</span>
              <input
                type="date"
                value={date}
                onChange={(e) => this.dateHandler(e)}
              />
              <Error
                status={this.state.isBadDate}
                info="Chose correct date!!!"
              />
              <span className="modal-lable">Time:</span>
              <input
                type="time"
                value={time}
                onChange={(e) => this.timeHandler(e)}
              />
              <Error
                status={this.state.isBadHour}
                info="Chose correct time!!!"
              />
              <span className="modal-lable">Movie:</span>
              <Select
                options={movieList}
                onChange={(e) => this.movieHandler(e)}
              />
              <Error
                status={this.state.isBadMovie}
                info="You must chose movie!!!"
              />
              <span className="modal-lable">Hall:</span>
              <Select
                options={hallList}
                onChange={(e) => this.hallHandler(e)}
              />
              <Error
                status={this.state.isBadHall}
                info="You must chose room!!!"
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => {
                  this.handleClose();
                }}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-success"
                data-dismiss={
                  !this.state.isBadDate &&
                  !this.state.isBadHour &&
                  !this.state.isBadMovie &&
                  !this.state.isBadHall
                    ? "modal"
                    : ""
                }
                onClick={() => {
                  this.add();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddSeanceModal.propTypes = {
  addSeance: PropTypes.func.isRequired,
};

export default AddSeanceModal;

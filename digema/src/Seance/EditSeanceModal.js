import React, { Component } from "react";
import Select from "react-select";
import * as CinemaAPI from "../CinemaAPI";
import PropTypes from "prop-types";
//import Hall from '../Hall/Hall';
//import Movie from '../Movie/Movie';
import Error from "../Error";

class EditSeanceModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      movie: this.props.movie,
      hall: this.props.hall,
      date: this.props.date,
      ticketsSold: this.props.ticketsSold,
      occupiedSeats: this.props.occupiedSeats,

      date2: "",
      time2: "",

      movieId: this.props.movie.id,
      movieTitle: this.props.movie.title,
      movieDuration: this.props.movie.duration,

      hallNumber: this.props.hall.number,
      hallCapacity: this.props.hall.capacity,

      movieList: [],
      hallList: [],

      isBadDate: false,
      isBadHour: false,
      isBadMovie: false,
      isBadHall: false,
    };
    console.log("MOVIE");
    console.log(this.state.movie);
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
    this.makeTimeDisplay();
    this.makeDateDisplay();
  }

  dateHandler(e) {
    var eDate = e.target.value;
    if (new Date(eDate).getTime() + 60000 * 24 * 60 >= new Date().getTime()) {
      this.setState({ date2: eDate, isBadDate: false });
    } else {
      this.setState({ date2: eDate, isBadDate: true });
    }
  }

  timeHandler(e) {
    var eDate = e.target.value;
    if (
      eDate === "" ||
      (new Date(this.state.date2).getFullYear() === new Date().getFullYear() &&
        new Date(this.state.date2).getMonth() === new Date().getMonth() &&
        new Date(this.state.date2).getDate() === new Date().getDate() &&
        new Date(
          this.state.date2.split("-")[0],
          this.state.date2.split("-")[1] - 1,
          this.state.date2.split("-")[2],
          eDate.split(":")[0],
          eDate.split(":")[1]
        ).getTime() < new Date().getTime())
    ) {
      this.setState({ time2: eDate, isBadHour: true });
    } else {
      this.setState({ time2: eDate, isBadHour: false });
    }
  }
  makeTimeDisplay() {
    const { date, time2 } = this.state;
    var tmpDate = new Date(date);
    var hours = tmpDate.getHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    var minutes = tmpDate.getMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    this.setState({
      time2: hours + ":" + minutes,
    });

    return time2;
  }

  makeDateDisplay() {
    const { date, date2 } = this.state;
    var tmpDate = new Date(date);
    var year = tmpDate.getFullYear();
    var month = tmpDate.getMonth() + 1;
    var day = tmpDate.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    this.setState({
      date2: year + "-" + month + "-" + day,
    });

    return date2;
  }

  makeDate() {
    const { date2, time2 } = this.state;
    var hours = time2.split(":")[0];
    var minutes = time2.split(":")[1];
    var year = date2.split("-")[0];
    var month = date2.split("-")[1] - 1;
    var day = date2.split("-")[2];

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

  edit = () => {
    if (
      !this.state.isBadDate &&
      !this.state.isBadHour &&
      !this.state.isBadMovie &&
      !this.state.isBadHall
    ) {
      const { editSeance, updateLists } = this.props;
      const {
        id,
        occupiedSeats,
        movieId,
        movieTitle,
        movieDuration,
        hallNumber,
        hallCapacity,
        hall,
        ticketsSold,
      } = this.state;

      var newMovie = {
        id: movieId,
        title: movieTitle,
        duration: parseInt(movieDuration),
      };

      var newHall = {
        number: hallNumber,
        capacity: hallCapacity,
      };

      var editedTicketsSold = ticketsSold;

      if (hallNumber !== hall.number) {
        occupiedSeats.length = 0;

        for (let i = 0; i < newHall.capacity; i++) {
          occupiedSeats.push(0);
        }

        editedTicketsSold = 0;
      }

      editSeance(
        id,
        this.makeDate(),
        newMovie,
        newHall,
        editedTicketsSold,
        newHall.capacity,
        occupiedSeats
      );
      this.handleClose();
      updateLists();
      //window.location.reload();
    }
  };

  handleClose() {
    /*this.setState({ 
            id: this.props.id,
            title: this.props.title,
            duration: this.props.duration,
         });*/
  }

  render() {
    const {
      date2,
      time2,
      movieList,
      hallList,
      id,
      movieId,
      hallNumber,
    } = this.state;
    return (
      <div
        className="modal fade"
        id={"editSeanceModal" + id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editSeanceModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editSeanceModal">
                Edit Seance
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
                value={date2}
                onChange={(e) => this.dateHandler(e)}
              />
              <Error
                status={this.state.isBadDate}
                info="Chose correct date!!!"
              />
              <span className="modal-lable">Time:</span>
              <input
                type="time"
                value={time2}
                onChange={(e) => this.timeHandler(e)}
              />
              <Error
                status={this.state.isBadHour}
                info="Chose correct time!!!"
              />
              <span className="modal-lable">Movie:</span>
              <Select
                value={movieList[movieId]}
                options={movieList}
                onChange={(e) => this.movieHandler(e)}
              />
              <Error
                status={this.state.isBadMovie}
                info="You must chose movie!!!"
              />
              <span className="modal-lable">Hall:</span>
              <Select
                value={hallList[hallNumber]}
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
                className="btn btn-primary"
                data-dismiss={
                  !this.state.isBadDate &&
                    !this.state.isBadHour &&
                    !this.state.isBadMovie &&
                    !this.state.isBadHall
                    ? "modal"
                    : ""
                }
                onClick={() => {
                  this.edit();
                }}
              >
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }
}

EditSeanceModal.propTypes = {
  editSeance: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date), // ? .instanceOf(String)
  id: PropTypes.number.isRequired,
  movie: PropTypes.instanceOf(Object),
  hall: PropTypes.instanceOf(Object),
  ticketsSold: PropTypes.number.isRequired,
  ticketsAvaliable: PropTypes.number.isRequired,
  occupiedSeats: PropTypes.array.isRequired,
};

export default EditSeanceModal;

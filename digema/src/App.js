import React, { Component } from "react";
import "./App.css";
import ShowHall from "./Hall/ShowHall";
import ShowMovies from "./Movie/ShowMovies";
import ShowSeance from "./Seance/ShowSeance";
import * as CinemaAPI from "./CinemaAPI";
import "jquery/dist/jquery.min.js";
// import "popper.js/dist/popper.min.js";w
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./Navbar";

import ShowSeance2 from "./Seance/ShowSeance2";
import ShowMoviesChar from "./Seance/ShowMoviesChar";
import BuyMovieTicket from "./Movie/BuyMovieTicket";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieList: [],
      hallList: [],
      seanceList: [],
      date: new Date(),

      tmpSeance: {},
    };
  }

  componentDidMount() {
    const { movieList, hallList, seanceList } = this.state;
    if (movieList.length === 0) {
      CinemaAPI.getAllMovies().then((response) => {
        this.setState({
          movieList: response,
        });
      });
    }
    if (hallList.length === 0) {
      CinemaAPI.getAllHalls().then((response) => {
        this.setState({
          hallList: response,
        });
      });
    }
    if (seanceList.length === 0) {
      CinemaAPI.getAllSeances().then((response) => {
        this.setState({
          seanceList: response,
        });
      });
    }
  }

  /* MOVIES */

  updateMovieList = (action, body) => {
    switch (action) {
      case "POST":
        this.setState((state) => {
          var list = state.movieList;
          list.push(body);
          return { movieList: list };
        });
        break;
      case "PUT":
        this.setState((state) => {
          var list = state.movieList;
          var movieIndex = list.findIndex(
            (movie) => parseInt(movie.id, 10) === parseInt(body.id, 10)
          );
          list[movieIndex].title = body.title;
          list[movieIndex].duration = body.duration;
          return { movieList: list };
        });
        break;
      case "DELETE":
        this.setState((state) => {
          var list = state.movieList.filter(
            (movie) => parseInt(movie.id, 10) !== parseInt(body.id, 10)
          );
          /*var movieIndex = list.findIndex(
            (movie) => parseInt(movie.productId, 10) === parseInt(body, 10)
          );
          list.splice(movieIndex, 1);*/
          return { movieList: list };
        });
        break;
      default:
        break;
    }
  };

  calculateMovieId = () => {
    const { movieList } = this.state;
    let maxId = 0;
    if (movieList.length > 0)
      movieList.forEach((movie) => {
        if (movie.id >= maxId) maxId = movie.id;
      });
    return maxId + 1;
  };

  addMovie = (title, duration) => {
    var newMovie = {
      id: this.calculateMovieId(),
      title: title,
      duration: duration,
    };
    CinemaAPI.addMovie(newMovie).then((response) => {
      if (response.status === 201) {
        this.updateMovieList("POST", newMovie);
      }
    });
  };

  deleteMovie = (movieIndex) => {
    CinemaAPI.deleteMovie(movieIndex).then((response) => {
      if (response.status === 204) {
        this.updateMovieList("DELETE", movieIndex);
      }
    });
  };

  editMovie = (editedMovieIndex, title, duration) => {
    var indexToInt = parseInt(editedMovieIndex, 10);
    var editedMovie = { id: indexToInt, title: title, duration: duration };
    CinemaAPI.editMovie(indexToInt, editedMovie).then((response) => {
      if (response.status === 200) {
        this.updateMovieList("PUT", editedMovie);
      } else if (response.status === 201) {
        this.updateMovieList("POST", editedMovie);
      }
    });
  };

  /* SEANCES */

  updateSeanceList = (action, body) => {
    switch (action) {
      case "POST":
        this.setState((state) => {
          var list = state.seanceList;
          list.push(body);
          return { seanceList: list };
        });
        break;
      case "PUT":
        this.setState((state) => {
          var list = state.seanceList;
          var seanceIndex = list.findIndex(
            (seance) => parseInt(seance.id, 10) === parseInt(body.id, 10)
          );
          list[seanceIndex].date = body.date;
          list[seanceIndex].movie = body.movie;
          list[seanceIndex].hall = body.hall;
          list[seanceIndex].ticketsSold = body.ticketsSold;
          list[seanceIndex].ticketsAvaliable = body.ticketsAvaliable;
          list[seanceIndex].occupiedSeats = body.occupiedSeats;
          return { seanceList: list };
        });
        break;
      case "DELETE":
        this.setState((state) => {
          var list = state.seanceList;
          var seanceIndex = list.findIndex(
            (seance) => parseInt(seance.id, 10) === parseInt(body, 10)
          );
          list.splice(seanceIndex, 1);
          return { seanceList: list };
        });
        break;
      default:
        break;
    }
  };

  calculateSeanceId = () => {
    const { seanceList } = this.state;
    let maxId = 0;
    if (seanceList.length > 0)
      seanceList.forEach((seance) => {
        if (seance.id >= maxId) maxId = seance.id;
      });
    return maxId + 1;
  };

  addSeance = (
    date,
    movie,
    hall,
    ticketsSold,
    ticketsAvaliable,
    occupiedSeats
  ) => {
    var newSeance = {
      id: this.calculateSeanceId(),
      date: date,
      movie: movie,
      hall: hall,
      ticketsSold: ticketsSold,
      ticketsAvaliable: ticketsAvaliable,
      occupiedSeats: occupiedSeats,
    };
    CinemaAPI.addSeance(newSeance).then((response) => {
      if (response.status === 201) {
        this.updateSeanceList("POST", newSeance);
      }
    });
  };

  deleteSeance = (seanceIndex) => {
    CinemaAPI.deleteSeance(seanceIndex).then((response) => {
      if (response.status === 204) {
        this.updateSeanceList("DELETE", seanceIndex);
      }
    });
  };

  editSeance = (
    editedSeanceIndex,
    date,
    movie,
    hall,
    ticketsSold,
    ticketsAvaliable,
    occupiedSeats
  ) => {
    var indexToInt = parseInt(editedSeanceIndex, 10);
    var editedSeance = {
      id: indexToInt,
      date: date,
      movie: movie,
      hall: hall,
      ticketsSold: ticketsSold,
      ticketsAvaliable: ticketsAvaliable,
      occupiedSeats: occupiedSeats,
    };
    CinemaAPI.editSeance(indexToInt, editedSeance).then((response) => {
      if (response.status === 200) {
        this.updateSeanceList("PUT", editedSeance);
      } else if (response.status === 201) {
        this.updateSeanceList("POST", editedSeance);
      }
    });
  };

  deleteSeances = (id) => {
    CinemaAPI.deleteSeanceByMovieID(id);
  };

  editSeanses = (body) => {
    CinemaAPI.editSeanceByMovieID(body);
  };

  getSeanceById = (id) => {
    const { tmpSeance } = this.state;
    CinemaAPI.getSeanceById(id).then((response) => {
      console.log(tmpSeance);
      this.setState({ tmpSeance: response });
      return tmpSeance;
    });
  };

  changeDate = (newDate) => {
    this.setState({ date: newDate });
  };

  updateLists = () => {
    CinemaAPI.getAllMovies().then((response) => {
      this.setState({
        movieList: response,
      });
    });
    CinemaAPI.getAllHalls().then((response) => {
      this.setState({
        hallList: response,
      });
    });
    CinemaAPI.getAllSeances().then((response) => {
      this.setState({
        seanceList: response,
      });
    });
    console.log("list updated");
  };
  render() {
    const { movieList, hallList, seanceList } = this.state;

    return (
      <>
        <Router>
          <NavBar />

          <Route exact path="/">
            <ShowMovies
              movieList={movieList}
              addMovie={this.addMovie}
              deleteMovie={this.deleteMovie}
              editMovie={this.editMovie}
              deleteSeanses={this.deleteSeances}
              editSeanses={this.editSeanses}
              updateLists={this.updateLists}
            />
          </Route>

          <Route exact path="/rooms">
            <ShowHall hallList={hallList} />
          </Route>

          <Route exact path="/screening">
            <ShowSeance2
              seanceList={seanceList}
              addSeance={this.addSeance}
              editSeance={this.editSeance}
              deleteSeance={this.deleteSeance}
              updateLists={this.updateLists}
            />
          </Route>

          <Route exact path="/seances">
            <ShowSeance
              seanceList={seanceList}
              addSeance={this.addSeance}
              editSeance={this.editSeance}
              deleteSeance={this.deleteSeance}
              updateLists={this.updateLists}
            />
          </Route>

          <Route
            exact
            path="/screening/:id"
            render={({ match }) => (
              <ShowSeance2
                seanceList={seanceList}
                id={parseInt(match.params.id)}
                addSeance={this.addSeance}
                editSeance={this.editSeance}
                deleteSeance={this.deleteSeance}
                updateLists={this.updateLists}
              />
            )}
          />

          <Route
            exact
            path="/statistics/:id"
            render={({ match }) => (
              <ShowMoviesChar
                id={parseInt(match.params.id)}
                seanceList={seanceList}
              />
            )}
          />

          <Route
            exact
            path="/ticket/:id"
            render={({ match }) => (
              <BuyMovieTicket
                id={parseInt(match.params.id)}
                getSeanceById={this.getSeanceById}
                editSeance={this.editSeance}
              />
            )}
          />
        </Router>
      </>
    );
  }
}

export default App;

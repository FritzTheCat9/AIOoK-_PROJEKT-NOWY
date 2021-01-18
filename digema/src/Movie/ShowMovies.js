import React from "react";
import DeleteMovie from "./DeleteMovie";
import EditMovieModal from "./EditMovieModal";
import AddMovieModal from "./AddMovieModal";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ShowMovies = (props) => {
  const {
    movieList,
    addMovie,
    deleteMovie,
    editMovie,
    deleteSeanses,
    editSeanses,
    updateLists,
  } = props;

  return (
    <div className="mx-3">
      <h1 className="display-3">Movie List:</h1>
      <button
        className="btn btn-success mb-2"
        data-toggle="modal"
        data-target={"#addModal"}
      >
        Add Movie
      </button>
      <AddMovieModal addMovie={addMovie} updateLists={updateLists} />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Title</th>
            <th scope="col">Duration</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">View</th>
            <th scope="col">Statistics</th>
          </tr>
        </thead>
        <tbody>
          {((movieList === undefined) || (typeof movieList === 'string')) ? (
            <tr> </tr>
          ) : (
              movieList.map((movie, key) => {
                //console.log(movie.id + " " + movie.title + " " + movie.duration);
                return (
                  <tr key={movie.id}>
                    <td>{movie.id}</td>
                    <td>{movie.title}</td>
                    <td>{movie.duration}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target={"#editModal" + movie.id}
                      >
                        Edit
                    </button>
                      <EditMovieModal
                        editSeanses={editSeanses}
                        editMovie={editMovie}
                        id={movie.id}
                        title={movie.title}
                        duration={parseInt(movie.duration)}
                        updateLists={updateLists}
                      />
                    </td>
                    <td>
                      <DeleteMovie
                        deleteSeanses={deleteSeanses}
                        deleteMovie={deleteMovie}
                        id={movie.id}
                        updateLists={updateLists}
                      />
                    </td>
                    <td>
                      <Link
                        type="button"
                        className="btn btn-warning"
                        to={`/screening/${movie.id}`}
                      >
                        View
                    </Link>
                    </td>
                    <td>
                      <Link
                        to={`/statistics/${movie.id}`}
                        type="button"
                        className="btn btn-info"
                      >
                        Statistics
                    </Link>
                    </td>
                  </tr>
                );
              })
            )}
        </tbody>
      </table>
    </div>
  );
};

ShowMovies.propTypes = {
  movieList: PropTypes.array.isRequired,
  addMovie: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
  editMovie: PropTypes.func.isRequired,
  deleteSeanses: PropTypes.func.isRequired,
  editSeanses: PropTypes.func.isRequired,
};

export default ShowMovies;

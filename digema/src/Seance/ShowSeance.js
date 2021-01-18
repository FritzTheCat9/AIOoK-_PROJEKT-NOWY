import React from "react";
import Hall from "../Hall/Hall";
import Movie from "../Movie/Movie";
import ShowDate from "../ShowDate";
import AddSeanceModal from "./AddSeanceModal";
import EditSeanceModal from "./EditSeanceModal";
import DeleteSeance from "./DeleteSeance";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ShowSeance = (props) => {
  const {
    seanceList,
    addSeance,
    editSeance,
    deleteSeance,
    updateLists,
    rerenderChild,
  } = props;

  return (
    <div className="mx-3" key={rerenderChild}>
      <h1 className="display-3">Seance List:</h1>
      <button
        className="btn btn-success mb-2"
        data-toggle="modal"
        data-target={"#addSeanceModal"}
      >
        Add Seance
      </button>
      <AddSeanceModal addSeance={addSeance} updateLists={updateLists} />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Date</th>
            <th scope="col">Movie</th>
            <th scope="col">Hall</th>
            <th scope="col">TicketsSold</th>
            <th scope="col">TicketsAvaliable</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
            <th scope="col">Buy ticket</th>
          </tr>
        </thead>
        <tbody>
          {console.log(seanceList)}
          {((seanceList === undefined) || (typeof seanceList === 'string')) ? (
            <tr> </tr>
          ) : (
              seanceList.map((seance, key) => {
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
                      <button
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target={"#editSeanceModal" + seance.id}
                      >
                        Edit
                    </button>
                      <EditSeanceModal
                        editSeance={editSeance}
                        id={seance.id}
                        date={new Date(seance.date)}
                        movie={seance.movie}
                        hall={seance.hall}
                        ticketsSold={seance.ticketsSold}
                        ticketsAvaliable={seance.ticketsAvaliable}
                        occupiedSeats={seance.occupiedSeats}
                        updateLists={updateLists}
                      />
                    </td>
                    <td>
                      <DeleteSeance
                        deleteSeance={deleteSeance}
                        id={seance.id}
                        updateLists={updateLists}
                      />
                    </td>
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
  );
};

ShowSeance.propTypes = {
  seanceList: PropTypes.array.isRequired,
  addSeance: PropTypes.func.isRequired,
  editSeance: PropTypes.func.isRequired,
  deleteSeance: PropTypes.func.isRequired,
};

export default ShowSeance;

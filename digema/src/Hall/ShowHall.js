import React from "react";
import PropTypes from "prop-types";

const ShowHall = (props) => {
  const { hallList } = props;

  return (
    <div className="mx-3">
      <h1 className="display-3">Hall List:</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Number</th>
            <th scope="col">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {hallList.map((hall, key) => {
            //console.log(hall.number + " " + hall.capacity);
            return (
              <tr key={hall.number}>
                <td>{hall.number}</td>
                <td>{hall.capacity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

ShowHall.propTypes = {
  hallList: PropTypes.array,
};

export default ShowHall;

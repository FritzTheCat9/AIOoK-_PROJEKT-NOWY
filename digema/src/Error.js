import React from "react";
import PropTypes from "prop-types";

const Error = (props) => {
  return (
    <div>
      {props.status ? (
        // <p style={{ color: "green" }}>{props.info}</p>
        <p style={{ color: "red" }}>{props.info}</p>
      ) : (
          // <p style={{ color: "red" }}>{props.info}</p>
          <span></span>
        )}
    </div>
  );
};

Error.propTypes = {
  status: PropTypes.bool.isRequired,
  info: PropTypes.string.isRequired,
};
export default Error;
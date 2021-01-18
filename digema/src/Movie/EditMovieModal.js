import React, { Component } from "react";
import PropTypes from "prop-types";

import Error from "../Error";
class EditMovieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: this.props.title,
      duration: this.props.duration,

      isBadTitle: false,
      isBadDuration: false,
    };
  }

  titleHandler(e) {
    if (e.target.value === "") {
      this.setState({
        isBadTitle: true,
        title: e.target.value,
      });
    } else {
      this.setState({
        isBadTitle: false,
        title: e.target.value,
      });
    }
  }

  durationHandler(e) {
    if (parseInt(e.target.value, 10) == e.target.value && parseInt(e.target.value, 10) > 0) {
      this.setState({ duration: e.target.value, isBadDuration: false });
    } else {
      this.setState({ duration: e.target.value, isBadDuration: true });
    }
  }

  edit = () => {
    const { editMovie, editSeanses, updateLists } = this.props;
    const { id, title, duration } = this.state;
    if (this.state.isBadTitle === false && this.state.isBadDuration === false) {
      editMovie(id, title, parseInt(duration));
      var body = {
        id: id,
        title: title,
        duration: parseInt(duration),
      };
      editSeanses(body);
      updateLists();
      //window.location.reload();
    }
  };

  handleClose() {
    this.setState({
      id: this.props.id,
      title: this.props.title,
      duration: this.props.duration,
    });
  }

  render() {
    console.log("Render");
    const { title, duration, id } = this.state;
    return (
      <div
        className="modal fade"
        id={"editModal" + id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editModalLabel">
                Edit Movie
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
              <span className="modal-lable">Title:</span>
              <input
                type="text"
                value={title}
                onChange={(e) => this.titleHandler(e)}
              />
              <Error
                status={this.state.isBadTitle}
                info="Title can't be empty"
              />
              <span className="modal-lable">Duration:</span>
              <input
                type="number"
                value={duration}
                onChange={(e) => this.durationHandler(e)}
              />
              <Error
                status={this.state.isBadDuration}
                info="Enter movie duration in minutes!!!"
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
                  !this.state.isBadTitle && !this.state.isBadDuration
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
}

EditMovieModal.propTypes = {
  editSeanses: PropTypes.func.isRequired,
  editMovie: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default EditMovieModal;

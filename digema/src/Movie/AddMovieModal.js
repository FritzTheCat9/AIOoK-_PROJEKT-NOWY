import React, { Component } from "react";
import PropTypes from "prop-types";
import Error from "../Error";

class AddMovieModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      duration: 0,

      isBadTitle: true,
      isBadDuration: true,
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

  add = () => {
    const { addMovie, updateLists } = this.props;
    const { title, duration } = this.state;
    if (!this.state.isBadTitle && !this.state.isBadDuration) {
      addMovie(title, parseInt(duration));
      updateLists();
      this.handleClose();

      this.setState({
        isBadTitle: true,
        isBadDuration: true,
      });
    }
  };

  handleClose() {
    this.setState({
      title: "",
      duration: 0,
      /*isBadTitle: true,
      isBadDuration: true,*/
    });
  }

  render() {
    const { title, duration } = this.state;
    return (
      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addModalLabel">
                Add Movie
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
                placeholder="title"
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
                placeholder="duration"
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
                className="btn btn-success"
                data-dismiss={
                  !this.state.isBadTitle && !this.state.isBadDuration
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

AddMovieModal.propTypes = {
  addMovie: PropTypes.func.isRequired,
};

export default AddMovieModal;

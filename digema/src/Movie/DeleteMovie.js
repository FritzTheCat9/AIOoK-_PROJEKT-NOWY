import React, { Component } from 'react';
import PropTypes from "prop-types";

class DeleteMovie extends Component {

    delete = () => {
        const { deleteSeanses, deleteMovie, id, updateLists } = this.props;

        deleteMovie(id);
        deleteSeanses(id);
        //window.location.reload();
        updateLists();
    }

    render() {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.delete}>Delete</button>
            </div>
        );
    }
}

DeleteMovie.propTypes = { 
    deleteSeanses: PropTypes.func.isRequired,
    deleteMovie: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}

export default DeleteMovie;
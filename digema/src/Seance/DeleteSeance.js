import React, { Component } from 'react';
import PropTypes from "prop-types";

class DeleteSeance extends Component {

    delete = () => {
        const { deleteSeance, id, updateLists } = this.props;

        deleteSeance(id);
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

DeleteSeance.propTypes = { 
    deleteSeance: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
}

export default DeleteSeance;
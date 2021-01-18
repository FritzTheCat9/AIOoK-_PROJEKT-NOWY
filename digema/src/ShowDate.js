import React, { Component } from 'react';
import PropTypes from "prop-types";

class ShowDate extends Component {

    render() {
        const { date } = this.props;

        return (
            <div>
                {/*console.log(date)*/}
                {(date.getDate() < 10) ? ("0" + date.getDate()) : (date.getDate())} {this.convertMonthToString(date.getMonth())} {date.getFullYear()} {(date.getHours() < 10) ? ("0" + date.getHours()) : (date.getHours())}:{(date.getMinutes() < 10) ? ("0" + date.getMinutes()) : (date.getMinutes())}

            </div>
        );
    }

    convertMonthToString(monthNumber) {
        switch (monthNumber) {
            case 0: return "styczeń";
            case 1: return "luty";
            case 2: return "marzec";
            case 3: return "kwiecień";
            case 4: return "maj";
            case 5: return "czerwiec";
            case 6: return "lipiec";
            case 7: return "sierpień";
            case 8: return "wrzesień";
            case 9: return "październik";
            case 10: return "listopad";
            case 11: return "grudzień";
            default: return "styczeń";
        }
    }
}

ShowDate.propTypes = { 
    date: PropTypes.instanceOf(Date),
}

export default ShowDate;
import React from "react";

const Event = ({ details, selectedOption }) => {

    return (
        <div className="event">
            <p className="event-title">{details.name}</p>
            { (selectedOption === 'mois' || selectedOption === null) && <div>{details.startHour} - {details.endHour} </div> }
        </div>
    )
}

export default Event
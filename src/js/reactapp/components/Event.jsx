import React from "react";

const Event = ({ details, selectedOption }) => {
    if (details) {
        return (
            <div className="event">
                <div className="event-title">{details.name}</div>
                { (selectedOption === 'mois' || selectedOption === null) && <div>{details.startHour} - {details.endHour} </div> }
            </div>
        )
    } else {
        return null
    }

}

export default Event
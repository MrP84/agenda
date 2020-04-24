import React from "react";

const Event = ({ details, selectedOption }) => {
    if (details) {
        const duration = (new Date('2020-1-1 ' + details.endHour) - new Date('2020-1-1 ' + details.startHour)) / 3600000;
        return (
            <div className={`event ${selectedOption === 'semaine' ? 'height x' + duration : ''}`} style={{backgroundColor:`${details.bgColor !== 'default' ? details.bgColor : '#2D5577'}`}}>
                <div className="event-title">{details.name}</div>
                { (selectedOption === 'mois' || selectedOption === null) && <div>{details.startHour} - {details.endHour} </div> }
            </div>
        )
    } else {
        return null
    }

}

export default Event
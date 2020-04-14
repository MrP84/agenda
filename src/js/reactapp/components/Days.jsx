import React from "react";
import {addDays, format, startOfWeek, isSameDay} from "date-fns";
import RenderFr from "./RenderFr";

const Days = ({ selectedOption, selectedDate }) => {
    const dateFormat = "i";
    const days = [];
    let startDate = startOfWeek(selectedDate);
    for (let i = 0; i < 7; i++) {
        if (selectedOption === 'semaine') {
            if (i > 0 && i < 6) {
                days.push(
                    <div className={`col col-center ${isSameDay(addDays(startDate, i), selectedDate)? 'selected' : ''}`} key={i}>
                        <RenderFr elemEn={format(addDays(startDate, i), dateFormat)} dateFormat={dateFormat} />
                        <span> {format(addDays(startDate, i), 'd')}</span>
                    </div>
                );
            } else if (i === 0) {
                days.unshift(
                    <div className="col col-center" key={i}>
                        <span> Heure </span>
                    </div>
                )
            } else if (i === 6) {
                days.push(
                    <div className="col col-center" key={i}>
                        <span> </span>
                    </div>
                )
            }

        } else {
            days.push(
                <div className="col col-center" key={i}>
                    <RenderFr elemEn={format(addDays(startDate, i), dateFormat)} dateFormat={dateFormat} />
                </div>
            );
        }


    }
    return <div className="calendar-days row">{days}</div>;

}

export default Days;
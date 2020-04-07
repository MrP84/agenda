import React from "react";
import {addDays, format, startOfWeek} from "date-fns";
import RenderFr from "./RenderFr";

const Days = ({ selectedOption, selectedDate }) => {
    const dateFormat = "i";
    const days = [];
    let startDate = startOfWeek(selectedDate);
    for (let i = 0; i < 7; i++) {
        if (selectedOption === 'Semaine') {
            days.push(
                <div className="col col-center" key={i}>
                    <RenderFr elemEn={format(addDays(startDate, i), dateFormat)} dateFormat={dateFormat} />
                    <span> {format(addDays(startDate, i), 'd')}</span>
                </div>
            );
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
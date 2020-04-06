import React from "react";
import {addDays, format, startOfWeek} from "date-fns";
import RenderFr from "./RenderFr";

const Days = ({currentMonth}) => {
    const dateFormat = "i";
    const days = [];
    let startDate = startOfWeek(currentMonth);
    for (let i = 0; i < 7; i++) {
        days.push(
            <div className="col col-center" key={i}>
                <RenderFr elemEn={format(addDays(startDate, i), dateFormat)} dateFormat={dateFormat} />

            </div>
        );
    }
    return <div className="calendar-days row">{days}</div>;

}

export default Days;
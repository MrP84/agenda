import React from "react";
import {addDays, format, startOfWeek, isSameDay} from "date-fns";
import RenderFr from "./RenderFr";
import Holidays from "./Holidays";

const Days = ({ selectedOption, selectedDate, holidays }) => {
    const dateFormat = "i";
    const days = [];
    let startDate = startOfWeek(selectedDate);
    for (let i = 0; i < 7; i++) {
        if (selectedOption === 'semaine') {
            if (i > 0 && i < 6) {
                days.push(
                    <div className={`col col-center ${isSameDay(addDays(startDate, i), selectedDate)? 'selected' : ''}`} key={i}>
                        <div className="calendar-days--weekdays">
                            <RenderFr elemEn={format(addDays(startDate, i), dateFormat)} dateFormat={dateFormat} />
                            <span> {format(addDays(startDate, i), 'd')}</span>
                        </div>


                            {holidays.includes(addDays(startDate, i).getTime()) && (<div className="day"><Holidays support={ holidays.indexOf(addDays(startDate, i).getTime()) }/></div>)}

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
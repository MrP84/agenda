import React from "react";
import {
    addDays,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    startOfMonth,
    startOfWeek,
    startOfDay,
    endOfDay,
    addHours,
    subHours,
    addMinutes
} from "date-fns";

import Holidays from "./Holidays";
import Event from "./Event";

const Cells = ({ id: key, onDateClick, currentMonth, selectedDate, selectedOption, today, holidays, events }) => {

    const monthStart = selectedOption === "mois" || selectedOption === null ? startOfMonth(currentMonth) : startOfMonth(selectedDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const startHour = addHours(startOfDay(startOfWeek(selectedDate)), 8);
    const endHour = subHours(endOfDay(startOfWeek(selectedDate)), 3);


    const getName = (day) => {

    }

    if (selectedOption === "semaine") {
        const hourFormat = "H : mm";
        const rows = [];
        let key = '';

        let hours = [];
        let hour = startHour;
        let formattedHour = "";

        while (hour <= endHour) {
            for (let i = 0; i < 7; i++) {
                const momentum = addDays(hour, i)
                key = format(momentum, 'y MMM dd H mm');
                formattedHour = i === 0 ? format(hour, hourFormat): '';
                hours.push(
                    <div
                        className='col hour'
                        key={key}
                        onClick={() => onDateClick(momentum)}>
                        <span>{formattedHour}</span>
                    </div>

                )
            }
            hour = addMinutes(hour, 30);
            rows.push(
                <div className="row hour" key={key}>
                    {hours}
                </div>
            )
            hours = [];
        }
        return <div className="body">{rows}</div>;


    } else {
        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {

            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                getName(format(day, 'i'));
                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, monthStart) ? "disabled" : (isSameDay(day, selectedDate) && selectedOption !== 'jour') || (isSameDay(day, today) && selectedOption === 'jour') ? "selected" : ""
                        }`}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}>
                        <div className="day">
                            <span className="number">{formattedDate}</span>
                            {holidays.includes(day.getTime()) && <Holidays support={holidays.indexOf(day.getTime())}/>}
                        </div>



                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row month" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }


}

export default Cells;
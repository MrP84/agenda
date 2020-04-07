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

const Cells = ({ id: key, onDateClick, currentMonth, selectedDate, selectedOption }) => {

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const startHour = addHours(startOfDay(currentMonth), 8);
    const endHour = subHours(endOfDay(currentMonth), 3);

    if (selectedOption === "Semaine") {
        const hourFormat = "H : mm";
        const rows = [];

        let hours = [];
        let hour = startHour;
        let formattedHour = "";

        while (hour <= endHour) {
            formattedHour = format(hour, hourFormat)
            hours.push(
                <div
                    className='col hour'
                    key={hour}
                    onClick={() => onDateClick(hour)}>
                    <span>{formattedHour}</span>
                </div>

            )
            for (let i = 0; i < 6; i++) {
                hours.push(
                    <div
                        className='col hour'
                        key={i}
                        onClick={() => onDateClick(hour)}>
                    </div>
                )

            }
            hour = addMinutes(hour, 30);

            rows.push(
                <div className="row" key={hour}>
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
                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, monthStart) ? "disabled" : isSameDay(day, selectedDate) ? "selected" : ""
                        }`}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}>
                        <span className="number">{formattedDate}</span>

                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }


}

export default Cells;
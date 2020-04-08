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

const Cells = ({ id: key, onDateClick, currentMonth, selectedDate, selectedOption, today }) => {

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    const startHour = addHours(startOfDay(currentMonth), 8);
    const endHour = subHours(endOfDay(currentMonth), 3);

    if (selectedOption === "semaine") {
        const hourFormat = "H : mm";
        const rows = [];
        let key = '';

        let hours = [];
        let hour = startHour;
        let formattedHour = "";

        while (hour <= endHour) {
            for (let i = 0; i < 7; i++) {
                formattedHour = i === 0 ? format(hour, hourFormat): '';
                key = format(addDays(hour, i), 'y MMM dd H mm');
                hours.push(
                    <div
                        className='col hour'
                        key={key}
                        onClick={() => onDateClick(hour)}>
                        <span>{formattedHour}</span>
                    </div>

                )
            }
            hour = addMinutes(hour, 30);
            rows.push(
                <div className="row hour" key={hour}>
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
                            !isSameMonth(day, monthStart) ? "disabled" : (isSameDay(day, selectedDate) && selectedOption !== 'jour') || (isSameDay(day, today) && selectedOption === 'jour') ? "selected" : ""
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
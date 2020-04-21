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
    addMinutes,
    subMinutes
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
    const booker = Object.keys(events).map(index => events[index]);

    const converter = (time) => {
        const moment = format(time, "HH : mm").split(':');
        const hour = parseInt(moment[0].trim(), 10);
        const minutes = parseInt(moment[1].trim(), 10);
        return subMinutes(time, hour * 60 + minutes);
    }

    if (selectedOption === "semaine") {
        const hourFormat = "HH : mm";
        const rows = [];
        let key = '';

        let hours = [];
        let hour = startHour;
        let formattedHour = "";

        while (hour <= endHour) {
            for (let i = 0; i < 7; i++) {
                const momentum = addDays(hour, i);
                const events =
                    (booker[format(momentum, 'i') - 1] && booker[format(momentum, 'i') - 1][0]) ?
                        Object.keys(booker[format(momentum, 'i') - 1])
                    .filter(key => booker[format(momentum, 'i') - 1][key].startHour === format(hour, 'HH:mm'))
                    .map(index => (!holidays.includes(converter(momentum).getTime()))?<Event key={index} details={booker[format(momentum, 'i') - 1][index]} selectedOption={selectedOption}/>: '')
                        : '';

                key = format(momentum, 'y MMM dd H mm');
                formattedHour = i === 0 ? format(hour, hourFormat): '';
                hours.push(
                    <div
                        className={`col hour ${(holidays.includes(converter(momentum).getTime()))? 'js-prevent' : ''}`}
                        key={key}
                        onClick={() => onDateClick(momentum)}>
                        <span>{formattedHour}</span>
                        {events}
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
                const events = (booker[format(day, 'i') - 1] && !holidays.includes(day.getTime())) ? Object.keys(booker[format(day, 'i') - 1]).map(index => <Event key={index} details={booker[format(day, 'i') - 1][index]} selectedOption={selectedOption} momentum={day}/>) : '';

                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, monthStart) ? "disabled" : (isSameDay(day, selectedDate) && selectedOption !== 'jour') || (isSameDay(day, today) && selectedOption === 'jour') ? "selected" : ""
                        } ${(booker[format(day, 'i') - 1] && Object.entries(booker[format(day, 'i') - 1]).length > 1) ? 'scrolled' : ''
                        } ${holidays.includes(day.getTime()) ? 'js-prevent' : ''}`}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}>
                        <div className="day">
                            <span className="number">{formattedDate}</span>
                            {holidays.includes(day.getTime()) && <Holidays support={holidays.indexOf(day.getTime())}/>}
                        </div>
                        {events}



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
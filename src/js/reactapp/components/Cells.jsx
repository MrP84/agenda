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


    /*const getName = (day) => {
        const booker = Object.keys(events).map(index => events[index]);
        console.log(booker[day - 1]);
        if (booker[day - 1]) {
            const names = Object.keys(booker[day - 1]).map(index => booker[day - 1][index].name);

            console.log(names);
        }

    }*/



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
                const booker = Object.keys(events).map(index => events[index]);
                const details = (booker[format(day, 'i') - 1]) ? Object.keys(booker[format(day, 'i') - 1]).map(index => <Event key={index} details={booker[format(day, 'i') - 1][index]} selectedOption={selectedOption}/>) : '';
               // console.log(booker[format(day, 'i') - 1] ? Object.entries(booker[format(day, 'i') - 1]).length : 'rien');

                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, monthStart) ? "disabled" : (isSameDay(day, selectedDate) && selectedOption !== 'jour') || (isSameDay(day, today) && selectedOption === 'jour') ? "selected" : ""
                        } ${(booker[format(day, 'i') - 1] && Object.entries(booker[format(day, 'i') - 1]).length > 1) ? 'scrolled' : ''}`}
                        key={day}
                        onClick={() => onDateClick(cloneDay)}>
                        <div className="day">
                            <span className="number">{formattedDate}</span>
                            {holidays.includes(day.getTime()) && <Holidays support={holidays.indexOf(day.getTime())}/>}
                        </div>
                        {/*{(booker[format(day, 'i') - 1]) && <div><Event selectedOption={selectedOption} details={booker[format(day, 'i') - 1]}/></div>}*/}
                        {details}



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
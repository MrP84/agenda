import React from "react";
import {format, addHours} from 'date-fns'

import BookerSelect from "./BookerSelect";


const BookerForm = ({ selectedDate, selectedOption, isDisplayed, }) => {

    const handleChange = (e) => {
        const {name, value} = e.target;
        console.log(name + ' : ' + value);
    }

    {/*onChange={e => handleChange(e, key)}*/}

    const classList = !isDisplayed ? 'hidden' : '';

    const dateFormat = 'yyyy-MM-dd';
    const hourFormat = 'HH:mm';

    const startHour = selectedOption === 'semaine' ? format(selectedDate, hourFormat) : '';
    const endHour = selectedOption === 'semaine' ? format(addHours(selectedDate, 1), hourFormat) : '';

    return (
        <div className={`booker ${classList}`}>
            <form className='booker-form'>
                <input type="text" name="name" value="" onChange={e => handleChange(e)}/>
                <input type="date" name="day" value={format(selectedDate, dateFormat)} onChange={e => handleChange(e)}/>
                <input type="time" name="startHour" value={startHour} onChange={e => handleChange(e)}/>
                <input type="time" name="endHour" value={endHour} onChange={e => handleChange(e)}/>
                <BookerSelect />
                <textarea name="precision" rows="5" placeholder="Ajoutez une précision" onChange={e => handleChange(e)}></textarea>
            </form>
        </div>

    )

}

export default BookerForm;
import React from "react";
import {format} from "date-fns";
import RenderFr from "./RenderFr";

const Header = ({ prevPeriod, nextPeriod, selectedDate, currentMonth, selectedOption, today }) => {
    const monthFormat = 'M';
    const yearFormat = 'yyyy';

    const month = selectedOption === 'semaine' ? selectedDate : selectedOption === 'jour' ? today : currentMonth;

    return (
        <div className='calendar-header row flex-middle'>
            <div className='col col-start'>
                <span className='icon icon-chevron-left' onClick={prevPeriod}></span>
            </div>
            <div className="col col-center">

                <RenderFr elemEn={format(month, monthFormat)} dateFormat={monthFormat}/>


                <span> {format(month, yearFormat)}</span>
            </div>
            <div className="col col-end" onClick={nextPeriod}>
                <span className="icon icon-chevron-right"></span>
            </div>
        </div>

    );
}

export default Header;

import React from "react";
import {format} from "date-fns";
import RenderFr from "./RenderFr";

const Header = ({ prevMonth, nextMonth, currentMonth }) => {
    const monthFormat = 'M';
    const yearFormat = 'yyyy';

    return (
        <div className='calendar-header row flex-middle'>
            <div className='col col-start'>
                <span className='icon icon-chevron-left' onClick={prevMonth}></span>
            </div>
            <div className="col col-center">
                <RenderFr elemEn={format(currentMonth, monthFormat)} dateFormat={monthFormat}/>
                <span> {format(currentMonth, yearFormat)}</span>
            </div>
            <div className="col col-end" onClick={nextMonth}>
                <span className="icon icon-chevron-right"></span>
            </div>
        </div>

    );
}

export default Header;

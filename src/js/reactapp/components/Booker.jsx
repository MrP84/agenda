import React from "react";

import BookerForm from "./BookerForm";

const Booker = ({selectedDate, selectedOption, events, isDisplayed, handleClose}) => {

    return (
        <div>
            <BookerForm
                selectedDate={selectedDate}
                isDisplayed={isDisplayed}
                selectedOption={selectedOption}
                events={events}
                handleClose={handleClose}/>
        </div>
    )
}


export default Booker;
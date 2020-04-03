import React from "react";

const DateBox = () => {
    const date = new Date()
    console.log(date);
    return (
        <div className='box'>
            <p className='box-user'>user</p>
        </div>
    )
}

export default DateBox;
import React, { Component } from "react";
import { format, addMonths, subMonths } from "date-fns";

import Days from "./Days";
import Cells from "./Cells";
import Header from "./Header";

class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };

    onDateClick = day => {
        const currentMonth = format(this.state.currentMonth, 'L');

        const dayInMonth = format(day, 'L');
        if (dayInMonth < currentMonth) {
            this.prevMonth();

        } else if (dayInMonth > currentMonth) {
            this.nextMonth();
        }

        this.setState({
            selectedDate: day
        });
    };

    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    };

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    };

    render() {

        return (
            <div className='calendar'>
                <Header prevMonth={this.prevMonth} nextMonth={this.nextMonth} currentMonth={this.state.currentMonth} />
                <Days currentMonth={this.state.currentMonth} />
                <Cells onDateClick={this.onDateClick} currentMonth={this.state.currentMonth} selectedDate={this.state.selectedDate}/>
            </div>
        )
    }
}

export default Calendar
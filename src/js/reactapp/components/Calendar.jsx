import React, { Component } from "react";
import { format, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";

import Days from "./Days";
import Cells from "./Cells";
import Header from "./Header";
import View from "./View";

class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedOption: null
    };

    onDateClick = day => {
        const currentMonth = format(this.state.currentMonth, 'L');

        const dayInMonth = format(day, 'L');
        if (dayInMonth < currentMonth) {
            this.prevPeriod();

        } else if (dayInMonth > currentMonth) {
            this.nextPeriod();
        }

        this.setState({
            selectedDate: day
        });
    };

    nextPeriod = () => {
        if (this.state.selectedOption === 'Semaine') {
            this.setState({
                selectedDate: addWeeks(this.state.selectedDate, 1)
            });
        } else {
            this.setState({
                currentMonth: addMonths(this.state.currentMonth, 1)
            });
        }

    };

    prevPeriod = () => {
        if (this.state.selectedOption === 'Semaine') {
            this.setState({
                selectedDate: subWeeks(this.state.selectedDate, 1)
            });
        } else {
            this.setState({
                currentMonth: subMonths(this.state.currentMonth, 1)
            });
        }
    };

    handleViewChange = (selectedOption) => {
        this.setState({selectedOption});
        console.log(selectedOption);
    };

    render() {
        const { currentMonth, selectedDate, selectedOption } = this.state;
        return (
            <div className='calendar'>
                <View handleViewChange={this.handleViewChange}/>

                <Header
                    prevPeriod={this.prevPeriod}
                    nextPeriod={this.nextPeriod}
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    selectedOption={selectedOption}/>
                <Days
                    currentMonth={currentMonth}
                    selectedOption={selectedOption}
                    selectedDate={selectedDate} />
                <Cells
                    onDateClick={this.onDateClick}
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    selectedOption={selectedOption}/>
            </div>
        )
    }
}

export default Calendar
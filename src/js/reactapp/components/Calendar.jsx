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
        selectedOption: null,
        today: new Date()
    };

    onDateClick = day => {
        const currentMonth = format(this.state.currentMonth, 'L');

        const dayInMonth = format(day, 'L');
        if (dayInMonth < currentMonth) {
            this.prevPeriod();

        } else if (dayInMonth > currentMonth) {
            this.nextPeriod();
        }

        if (this.state.selectedOption === 'jour') {
            this.setState({
                selectedOption: null
            })
        }

        if (this.state.selectedOption !== 'semaine') {
            this.setState({
                selectedDate: day
            });
        }


    };

    nextPeriod = () => {
        if (this.state.selectedOption === 'semaine') {
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
        if (this.state.selectedOption === 'semaine') {
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
        this.toggleDisplay();
        console.log(selectedOption);
    };

    toggleDisplay = () => {
        document.querySelector('.view--items').classList.contains('hidden') ? document.querySelector('.view--items').classList.remove('hidden') : document.querySelector('.view--items').classList.add('hidden');
    };

    render() {
        const { currentMonth, selectedDate, selectedOption, today } = this.state;
        return (
            <div className='calendar'>
                <View
                    handleViewChange={this.handleViewChange}
                    selectedOption={selectedOption}
                    toggleDisplay={this.toggleDisplay} />

                <Header
                    prevPeriod={this.prevPeriod}
                    nextPeriod={this.nextPeriod}
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    selectedOption={selectedOption}
                    today={today} />
                <Days
                    currentMonth={currentMonth}
                    selectedOption={selectedOption}
                    selectedDate={selectedDate} />
                <Cells
                    onDateClick={this.onDateClick}
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    selectedOption={selectedOption}
                    today={today} />
            </div>
        )
    }
}

export default Calendar
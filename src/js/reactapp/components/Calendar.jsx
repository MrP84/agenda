import React, { Component } from "react";
import { format, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";

import Days from "./Days";
import Cells from "./Cells";
import Header from "./Header";
import View from "./View";
import Booker from "./Booker";

class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedOption: null,
        today: new Date(),
        holidays: []
    };

    componentDidMount() {
        const year = format(this.state.currentMonth, 'Y');
        fetch('https://calendarific.com/api/v2/holidays?api_key=bbe984721b4f0a35417438222b7fde5b42ce47b2&country=FR&year=' + year)
            .then(res => res.json())
            .then((data) => {
                this.setState({holidays: data.response.holidays})
            })
            .catch((e) => console.log(e))
    }

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

        this.setState({
            selectedDate: day
        });

        console.log(this.state.holidays);

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
        this.setState({selectedOption: selectedOption});
        if (selectedOption === 'jour') {
            this.setState({
                selectedDate: this.state.today
            })
        }
        this.toggleDisplay();
    };

    toggleDisplay = () => {
        document.querySelector('.view--items').classList.contains('hidden') ? document.querySelector('.view--items').classList.remove('hidden') : document.querySelector('.view--items').classList.add('hidden');
    };

    render() {
        const { currentMonth, selectedDate, selectedOption, today, holidays } = this.state;
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
                    today={today}
                    holidays={holidays}/>
                <Booker
                    selectedDate={selectedDate}
                    selectedOption={selectedOption} />
            </div>
        )
    }
}

export default Calendar
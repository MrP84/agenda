import React, { Component } from "react";
import { format, addMonths, subMonths, addWeeks, subWeeks } from "date-fns";

import Days from "./Days";
import Cells from "./Cells";
import Header from "./Header";
import View from "./View";
import Booker from "./Booker";

import students from "../example";


class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date(),
        selectedOption: null,
        today: new Date(),
        holidays: [],
        isDisplayed: false,
        events: {
            1: {

            },
            2: {
                0 : {
                    name : 'romain',
                    startHour: '18:00',
                    endHour: '19:00',
                    repeat: 'allweeks',
                    precision: '',
                    bgColor: '#55248D'
                },

            },
            3: {
                0 : {
                    name: 'romane',
                    startHour: '17:00',
                    endHour: '18:00',
                    repeat: 'allweeks',
                    precision: '',
                    bgColor: '#557C8D'

                },
            },
            4: {

            },
            5: {
                0 : {
                    name: 'romain',
                    startHour: '09:00',
                    endHour: '10:00',
                    repeat: 'allweeks',
                    precision: '',
                    bgColor: '#55248D'
                },
                1 : {
                    name: 'malo',
                    startHour: '17:30',
                    endHour: '19:30',
                    repeat: 'allweeks',
                    precision: '',
                    bgColor: 'default'
                },

            }

        }
    };

    loadExample = () => this.setState({ events: students})

    componentDidMount() {
        const year = format(this.state.currentMonth, 'Y');
        fetch('https://calendarific.com/api/v2/holidays?api_key=bbe984721b4f0a35417438222b7fde5b42ce47b2&country=FR&year=' + year)
            .then(res => res.json())
            .then((data) => {
                const response = data.response.holidays;
                const nationalHolidays = Object.keys(response).filter(key => response[key].type.includes('National holiday'));

                const filtered = Object.keys(response)
                    .filter(key => nationalHolidays.includes(key))
                    .reduce( (obj, key) => {
                        obj[key] = response[key];
                        return obj;
                    }, {});

                const dates = Object.keys(filtered).map(index => new Date(filtered[index].date.datetime.year, filtered[index].date.datetime.month - 1, filtered[index].date.datetime.day).getTime());

                this.setState({holidays: dates})
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
                selectedOption: 'mois'
            })
        }

        this.setState({
            selectedDate: day,
            isDisplayed: true
        });

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
                selectedDate: this.state.today,
                selectedOption: 'mois'
            })
        }
        this.toggleDisplay();
    };

    toggleDisplay = () => {
        document.querySelector('.view--items').classList.contains('hidden') ? document.querySelector('.view--items').classList.remove('hidden') : document.querySelector('.view--items').classList.add('hidden');
    };

    handleClose = () => {
        this.setState({
            isDisplayed: false
        })
    }

    render() {
        const { currentMonth, selectedDate, selectedOption, today, holidays, events, isDisplayed } = this.state;
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
                    selectedDate={selectedDate}
                    holidays={holidays}/>
                <Cells
                    onDateClick={this.onDateClick}
                    currentMonth={currentMonth}
                    selectedDate={selectedDate}
                    selectedOption={selectedOption}
                    today={today}
                    holidays={holidays}
                    events={events} />
                <Booker
                    selectedDate={selectedDate}
                    selectedOption={selectedOption}
                    events={events}
                    isDisplayed={isDisplayed}
                    handleClose={this.handleClose}/>
                <button onClick={this.loadExample}>Charger exemple</button>
            </div>
        )
    }
}

export default Calendar
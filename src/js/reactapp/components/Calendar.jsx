import React, { Component } from "react";
import { format, endOfWeek, startOfWeek, addDays, addMonths, subMonths, startOfMonth, endOfMonth, isSameMonth, isSameDay } from "date-fns";

class Calendar extends Component {
    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };

    renderMonthFr (monthEn) {
        const monthsFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'juillet', 'Août', 'Septembre', 'Octobre','Novembre', 'Décembre'];
        return monthsFr[monthEn - 1];
    }

    renderDayFr (dayEn) {
        const daysOfWeekFr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        return daysOfWeekFr[dayEn - 1];
    }

    renderHeader() {
        const monthFormat = 'M';
        const yearFormat = 'yyyy';

        return (
            <div className='calendar-header row flex-middle'>
                <div className='col col-start'>
                    <div className='icon' onClick={this.prevMonth}> chevron_left </div>
                </div>
                <div className="col col-center">
                    <span>{this.renderMonthFr(format(this.state.currentMonth, monthFormat))}</span> <span>{format(this.state.currentMonth, yearFormat)}</span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon"> chevron_right </div>
                </div>
            </div>

        );
    }

    renderDays() {
        const dateFormat = "i";

        const days = [];
        let startDate = startOfWeek(this.state.currentMonth);
        for (let i = 0; i < 7; i++) {
            days.push(
                <div className="col col-center" key={i}>

                    {this.renderDayFr(format(addDays(startDate, i), dateFormat))}
                </div>
            );
        }
        return <div className="calendar-days row">{days}</div>;
    }

    renderCells() {
        const { currentMonth, selectedDate } = this.state;

        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const dateFormat = "d";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                formattedDate = format(day, dateFormat);
                const cloneDay = day;
                days.push(
                    <div
                        className={`col cell ${
                            !isSameMonth(day, monthStart) ? "disabled" : isSameDay(day, selectedDate) ? "selected" : ""
                        }`}
                        key={day}
                        onClick={() => this.onDateClick(cloneDay)}>
                        <span className="number">{formattedDate}</span>
                        {/*<span className="bg">{formattedDate}</span>*/}
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div className="row" key={day}>
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="body">{rows}</div>;
    }

    onDateClick = day => {
        this.setState({
            selectedDate: day
        });
    }

    nextMonth = () => {
        this.setState({
            currentMonth: addMonths(this.state.currentMonth, 1)
        });
    }

    prevMonth = () => {
        this.setState({
            currentMonth: subMonths(this.state.currentMonth, 1)
        });
    }

    render() {
        return (
            <div className='calendar'>
                { this.renderHeader() }
                { this.renderDays() }
                { this.renderCells() }
            </div>
        )
    }
}

export default Calendar
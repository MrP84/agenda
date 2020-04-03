const today = new Date();
const currentMonth = today.getMonth();
const currentYear = today.getFullYear();

const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

const next = () => {
    const currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    const currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

const previous = () => {
    const currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    const currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    showCalendar(currentMonth, currentYear);
}

const jump = () => {
    const currentYear = parseInt(selectYear.value);
    const currentMonth = parseInt(selectMonth.value);
    showCalendar(currentMonth, currentYear);
}

const showCalendar = (month, year) => {
    const firstDay = (new Date(year, month)).getDay();
    const daysInMonth = 32 - new Date(year, month, 32).getDate();


}
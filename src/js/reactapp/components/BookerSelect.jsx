import React from "react";

const BookerSelect = ({type}) => {

    const options = (type === 'color') ? [
        {label : 'red', value : '#D50000'},
        {label : 'pink', value : '#E67C73'},
        {label : 'orange', value : '#F4511E'},
        {label : 'yellow', value : '#F6BF26'},
        {label : 'purple', value : '#55248D'},
        {label : 'green', value : '#0B8043'},
        {label : 'greyBlue', value : '#557C8D'},
        {label : 'default', value : '#2D5577'},
    ] : [
        {label: 'once', value: 'Une fois'},
        {label: 'allweeks', value: 'Chaque semaine'},
        {label: 'oneoutoftwo', value: 'Une semaine sur deux'},
        {label: 'all months', value: 'Une fois par mois'},
    ];

        return (
            <div className="booker-form--select">
                <p className={`booker-form--prompt`}> {type === 'period' ? 'Répétition : ' : 'Choisissez une couleur :'} </p>
                <ul className={`booker-form--${type}s`}>
                    { Object.keys(options).map(index =>
                        <li key={index} className={`booker-form--${type} ${(type === 'color' && parseInt(index, 10) === options.length - 1) ? 'selected' : '' }`} data-label={options[index].label} >{type === 'period' ? options[index].value : <div className={`booker-form--${type}Picker`} style={{backgroundColor: `${options[index].value}`}}> </div>}</li>)}

                </ul>
            </div>

        )


}

export default BookerSelect


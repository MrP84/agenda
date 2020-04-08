import React from "react";

const View = ({handleViewChange, selectedOption, toggleDisplay}) => {

    const options = [
        {value: 'Mois', label: 'mois'},
        {value: 'Semaine', label: 'semaine'},
        {value: 'Aujourd\'hui', label: 'jour'}
    ];

    let view = [];
    const text = [];
    const content = selectedOption === null || selectedOption === 'jour' ? 'Sélectionnez ...' : selectedOption;

    text.push(<p key={options[0].label} className='view--text' onClick={toggleDisplay}>{content}</p>);

    for (let i = 0; i < options.length; i++) {
        view.push(
            <li
                className={`view--item ${options[i].label} ${options[i].label === selectedOption ? "selected" : "hidden"}`}
                key={i}
                onClick={() => handleViewChange(options[i].label)}
            ><span className={`icon icon-${options[i].label}`}> </span> {options[i].value} </li>
        )
    }
    return <div className='view'>
            {text}
            <ul className={`view--items hidden`}>{view}</ul>
        </div>


};

export default View;
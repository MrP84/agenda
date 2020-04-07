import React, {Component} from "react";
import Select from "react-select"

const View = ({handleViewChange}) => {



    const options = [
        {value: 'Mois', label: 'Mois'},
        {value: 'Semaine', label: 'Semaine'},
        {value: 'Jour', label: 'Jour'}
    ];

    let view = [];

    for (let i = 0; i < options.length; i++) {
        view.push(
            <li
                className='view--item'
                key={i}
                onClick={() => handleViewChange(options[i].value)}
            >{options[i].label}</li>
        )
    }
    return <ul className="view--items">{view}</ul>;

};

export default View;
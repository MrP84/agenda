import React from "react";

const RenderFr = ({ elemEn, dateFormat }) => {
    const monthsFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'juillet', 'Août', 'Septembre', 'Octobre','Novembre', 'Décembre'];
    const daysOfWeekFr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    let result = '';

    if (dateFormat === 'i') result = daysOfWeekFr[elemEn - 1];
    if (dateFormat === 'M') result = monthsFr[elemEn - 1];

    return (
        <span>
            {result}
        </span>
    )
};

export default RenderFr
import React from "react";

const RenderFr = ({ elemEn, dateFormat, support }) => {
    const monthsFr = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'juillet', 'Août', 'Septembre', 'Octobre','Novembre', 'Décembre'];

    const daysOfWeekFr = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

    const holidaysFr =
        ['Jour de l\'an', 'Lundi de Pâques', 'Fête du travail', 'Armistice 1945', 'Ascension', 'Lundi de Pentecôte', 'Fête nationale', 'Assomption', 'Toussaint', 'Armistice 1918', 'Noël']

     let result = '';

    if (dateFormat === 'i') result = daysOfWeekFr[elemEn - 1];
    if (dateFormat === 'M') result = monthsFr[elemEn - 1];
    if (dateFormat === 'H') result = holidaysFr[support];

    return (
        <span>
            {result}
        </span>
    )
};

export default RenderFr
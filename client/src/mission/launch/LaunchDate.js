import React from "react";

function LaunchData({ launch }) {
    let json = JSON.stringify(launch);
    let parse = JSON.parse(json);
    let strDate;
    if(!parse['months']) {
        if(parse['quarter']) {
            let quarter = parse['quarter'];
            strDate = `${quarter}${quarter === 1 ? 'st' : quarter === 2 ? 'nd' : quarter === 3 ? 'rd' : 'th'} Quarter of ${parse['years']}`;
        } else {
            strDate = `${parse['years']}`
        }
    } else {
        let date;
        parse['date'] ? date = new Date(parse['years'], parse['months']-1, parse['date'], parse['hours'], parse['minutes']) :
            date = new Date(parse['years'], parse['months'], 0);
        if (parse['date'] && parse['hours']) {
            strDate = date.toLocaleString();
        } else {
            strDate = date.toLocaleDateString();
        }
    }

    return (
        <p>{strDate}</p>
    )
}

export default LaunchData

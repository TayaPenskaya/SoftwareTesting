import React from "react";

function formatDate(num) {
    return num.toString().replace(/^\d$/, '0' + num);
}

function Timer({launch, index}) {
    setInterval( () => {
        let json = JSON.stringify(launch);
        let parse = JSON.parse(json);
        let parseDate;

        let now = new Date();
        let res = '';
        let minusFlag = false;

        if (parse['years'] && parse['months']) {
            parse['date'] ? parseDate = new Date(parse['years'], parse['months']-1, parse['date'], parse['hours'], parse['minutes']) :
                parseDate = new Date(parse['years'], parse['months'], 0);
        }


        if (parseDate) {
            let diff = parseDate.getTime() - now.getTime();
            minusFlag = diff < 0;
            let days = Math.trunc(diff / (1000 * 3600 * 24));
            let hr = Math.trunc(diff / (1000 * 3600) - days * 24);
            let min = Math.trunc(diff / (1000 * 60) - days * 24 * 60 - hr * 60);
            let sec = Math.trunc(diff / 1000 - days * 24 * 3600 - hr * 3600 - min * 60);
            res += `${Math.abs(days)} days, ${formatDate(Math.abs(hr))}:${formatDate(Math.abs(min))}:${formatDate(Math.abs(sec))}`;
        } else if (parse['quarter'] && (parse['years'] === now.getFullYear())) {
            let diff = Math.floor(parse['quarter'] - 1 - (now.getMonth() + 1) / 4);
            res += diff === 0 ? 'this Quarter' : diff === 1 ? 'next Quarter'
                : diff === 2 ? 'in one Quarter' : 'in two Quarters'
        } else {
            res += 'Quarter/Date unknown..'
        }

        if (minusFlag) {
            document.getElementById(index).style.color = 'red';
        } else {
            document.getElementById(index).style.color = 'green';
        }
        document.getElementById(index).innerHTML = res;
    }, 0);

    return (
        <p id={index}>{}</p>
    )
}

export default Timer
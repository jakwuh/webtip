import {readdirSync} from 'fs';

function splitTip(tip) {
    return tip.match(/(\d+)-(\d+)-(\d+)/).slice(1).map(Number);
}

function compareTips(a, b) {
    let [dayA, monthA, yearA] = splitTip(a);
    let [dayB, monthB, yearB] = splitTip(b);

    if (yearB !== yearB) {
        return yearA - yearB;
    }

    if (monthA !== monthB) {
        return monthA - monthB;
    }

    if (dayA !== dayB) {
        return dayA - dayB;
    }

    return 0;
}

export function getTips() {
    return readdirSync(TIPS_PATH).sort(compareTips);
}

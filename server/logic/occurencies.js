const dateAndTime = require('date-and-time');
const { RRule, RRuleSet, rrulestr } = require('rrule')
const values = require('../db/random-entities').dates

//This code works only for date borders (with no time)
function computeOccurencies(dateArray, start, finish) {
    start.setHours(0); start.setMinutes(0); start.setSeconds(0);
    finish.setHours(23); finish.setMinutes(59); finish.setSeconds(59);
    return dateArray.map(v => {
        let dates = getDates(v, start, finish);//TODO: isExcept mechanism
        return dates.map(d => ({
            eventId: v.eventId,
            dateTime: d,
            status: getStatus(v, d)
        }))
    }).reduce((a, b) => a.concat(b)).sort((a,b) => a.dateTime.value - b.dateTime.value)
}

module.exports = computeOccurencies;

console.log(computeOccurencies(values, new Date(2020, 02, 01), new Date(2021, 04, 30)))

function getDates(date, startDay, finishDay) {
    switch (date.type)
    {
        case 'simpleDate':
        {
            const dateTime = date.dateTime
            if((startDay <= dateTime && dateTime <= finishDay)) {
                return [{
                    value: dateTime,
                    hasTime: date.hasTime,
                    belonging: null  
                }]
            }
            break;
        }
        case 'reccurenceDate':
        {
            return date.rrules.map(r => {
                const rrule = rrulestr(r);
                return rrule.between(startDay, finishDay);
            }).reduce((a, b) => a.concat(b)).map(x => ({
                value: x,
                hasTime: date.hasTime,
                belonging: null
            }));
        }

        
    }
    return [];
}

function getStatus(date, dateTime){
    return null;
}


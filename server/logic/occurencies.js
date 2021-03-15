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
        case 'continuousDate':
        {
            const start = date.start, end = date.end;
            if (
                (start >= startDay && start <= finishDay) 
            ||
                (end >= startDay && end <= finishDay) 
            || 
                (start <= startDay &&  end >= finishDay)
            )
            {
                const result = [];
                if(start >= startDay && start <= finishDay){
                    result.push({
                        value: start,
                        hasTime: date.hasTime,
                        belonging:"start"
                    });
                }
                getDaysBetween(start, end).filter(x => x >= startDay && x <= finishDay).forEach(d => {
                    result.push({
                        value:d,
                        hasTime:false,
                        belonging:"middle"
                    })
                });

                if(end >= startDay && end <= finishDay){
                    result.push({
                        value: end,
                        hasTime: date.hasTime,
                        belonging:"end"
                    });
                }
                
                return result;
            }
        }
        case 'continuousReccurenceDate':
        {
            //TODO:
        }

        
    }
    return [];
}

function getStatus(date, dateTime) {
    const today = new Date();
    if (today < dateTime.value) return "upcoming";
    if(!date.hasTime && dateAndTime.isSameDay(today, dateTime.value)) return "today"
    return "happened"
}

function getDaysBetween(start, end){
    const res = [];
    for(let i = dateAndTime.addDays(start, 1); i < end; i= dateAndTime.addDays(i, 1)){
        res.push(i);
    }
    return res;
}
const dateAndTime = require('date-and-time');
const { RRule, RRuleSet, rrulestr } = require('rrule')

//This code works only for date borders (with no time)
function computeOccurencies(dateArray, start, finish) {
    start.setHours(0); start.setMinutes(0); start.setSeconds(0);
    finish.setHours(23); finish.setMinutes(59); finish.setSeconds(59);
    const groupedByEventId =  dateArray.map(v => {
        let dates = getDates(v, start, finish);
        return dates.map(d => ({
            eventId: v.eventId,
            dateTime: d,
            status: getStatus(v, d),
            isExcept: v.isExcept
        }))
    })
    .reduce((a, b) => a.concat(b))
    .filter(x => x.dateTime.value >= start && x.dateTime.value <= finish)
    .reduce((gr, d) => {
        (gr[d.eventId] = gr[d.eventId] || []).push(d);
        return gr;
    }, {});
    Object.keys(groupedByEventId).forEach(key => { //Deleting exceptDates
        const oneIdDates = groupedByEventId[key];
        const settingDates = oneIdDates.filter(x => !x.isExcept);
        const exceptDates = oneIdDates.filter(x => x.isExcept);
        if (exceptDates.length > 0) {
            const filtered = settingDates.filter(x => !exceptDates.some(y => isEqual(x, y)));
            groupedByEventId[key] = filtered;
        }
    });
    const result = Object.values(groupedByEventId)
    .reduce((a, b) => a.concat(b))
    .sort((a, b) => a.dateTime.value - b.dateTime.value);
    result.forEach(x => { delete x.isExcept });
    return result;
    
}

module.exports = computeOccurencies;

function isEqual(one, another) {
    return one.eventId == another.eventId
    && one.dateTime.hasTime == another.dateTime.hasTime
    && one.dateTime.value.getYear() == another.dateTime.value.getYear()
    && one.dateTime.value.getMonth() == another.dateTime.value.getMonth()
    && one.dateTime.value.getDate() == another.dateTime.value.getDate()
    && (!one.dateTime.hasTime || (
        one.dateTime.value.getHours() == another.dateTime.value.getHours()
        && one.dateTime.getMinutes() == another.dateTime.value.getMinutes()
    ));  
}

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
            return RRule.fromString(date.rrule).between(startDay, finishDay)
            .map(x => ({
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


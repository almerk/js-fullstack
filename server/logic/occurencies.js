const dateAndTime = require('date-and-time');
const { RRule, RRuleSet, rrulestr } = require('rrule')
const values = require('../db/random-entities').dates



/* 
    { 
        eventId:'1', 
        dateTime: {
            value: new Date(),
            hasTime: true,
            belonging: null
        }
        status: null
    } 
*/




function getDates(date, startDay, finishDay) {
    switch (date.type)
    {
        case 'simpleDate':
        {
            const dateTime = date.dateTime
            if((startDay <= dateTime && dateTime <= finishDay) || dateAndTime.isSameDay(dateTime, finishDay)) {
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
            
        }

        
    }
    return [];
}



values.filter(d=>d.type=='simpleDate').forEach(d => {
    console.log(d);
    console.log('////////////////');
    console.log(getDates(d, new Date(1901, 0, 1), new Date(1950, 11 ,31, 23, 59, 59)));
})

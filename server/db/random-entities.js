const dateAndTime = require('date-and-time');
const { RRule, RRuleSet, rrulestr } = require('rrule')
const rand = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));


const GROUPS_COUNT = 6;
const USERS_COUNT = rand(GROUPS_COUNT * 5, GROUPS_COUNT * 15);

const someText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quia quas eos incidunt explicabo harum dicta nihil eaque, aspernatur est. Modi soluta ab odit fuga nesciunt nihil rem tenetur doloribus?';
const getRandomName = () => {
    const left = rand(0, someText.length - 3);
    const right = rand(left + 2, someText.length - 1);
    let name = someText.substring(left, right);
    return name.charAt(0).toUpperCase() + name.slice(1)
};
const getRandomDate = (withTime)=>{
    return withTime?
    new Date(rand(1901, 2020), rand(0, 11), rand(0, 31), rand(0,23), rand(0,59)) 
    :new Date(rand(1901, 2020), rand(0, 11), rand(0, 31));
}

let currentSubjectId = 0, currentObjectId = 0;
const getSubjectId = () => (++currentSubjectId).toString(), getObjectId = () => (++currentObjectId).toString();

/* ----------------------------------------------Subjects--------------------------------------------- */

const groups = [ 
    { 
        id: getSubjectId(),
        name: 'all',
        parentId: null
    }
]
for (let i = 0; i < GROUPS_COUNT; i++) {
    groups.push({
        id: getSubjectId(),
        name: getRandomName(),
        parentId: groups[Math.floor(Math.random() * groups.length)].id
    });
}

const users = [];
for (let i = 0; i < USERS_COUNT; i++) {
    users.push({
        id: getSubjectId(),
        groupId: groups[Math.floor(Math.random() * groups.length)].id,
        login: getRandomName().replace(/\W/g, '').substring(0, 8),
        name: getRandomName().replace(/\W/g,'').substring(0, 20),
        surname: getRandomName().replace(/\W/g,'').substring(0, 20),
        patronymic: getRandomName().replace(/\W/g,'').substring(0, 20),
    });
}

const subjects =   groups.map(x => ({ ...x, type: 'group' }))
                    .concat(users.map(x => ({ ...x, type: 'user' })));


/* ----------------------------------------------Objects--------------------------------------------- */

const calendarTypes = ['Anniversary', 'Notification', 'Task'].map(x => ({ id:getObjectId(), name: x }));

const CALENDARS_COUNT = 8

const calendars = []
for (let i = 0; i < CALENDARS_COUNT; i++) {
    calendars.push({
        id: getObjectId(),
        typeId: calendarTypes[Math.floor(Math.random() * calendarTypes.length)].id,
        name: getRandomName()
    });
}

const EVENTS_COUNT = CALENDARS_COUNT * rand(3, 20)
const TASK_STATUSES = ['created','in process','completed'];
const mutateEventOfCalendarType = ev => {

    const calendar = calendars.find(c =>
        c.id == ev.calendarId);
    const typeName  = calendarTypes.find(t => 
                        t.id == calendar.typeId).name;
    switch(typeName) {
        case 'Anniversary':
            ev.type = 'anniversaryEvent';
            ev.date = rand(0,2) < 2 ? getRandomDate() : null
            break;
        case 'Notification':
            ev.type = 'notificationEvent';
            break;
        case 'Task':
            ev.type = 'taskEvent';
            ev.status = TASK_STATUSES[Math.floor(Math.random() * TASK_STATUSES.length)];
            ev.isComplete =  ev.status == 'completed';
            break;
    }
    return ev;
}

const calendarEvents = []
for (let i = 0; i < EVENTS_COUNT; i++) {
    calendarEvents.push(
        mutateEventOfCalendarType ({
            id: getObjectId(),
            calendarId : calendars[Math.floor(Math.random() * calendars.length)].id,
            name: getRandomName(),
            description : i % 3 == 0 ? '' : getRandomName()
        })
    );
}

const objects = calendarTypes.map(x => ({ ...x, type: 'calendarType' }))
                    .concat(calendars.map(x => ({ ...x, type: 'calendar' })))
                    .concat(calendarEvents)

/* ------------------------------------------Relations---------------------------------------------- */
/*
    0. Each relation determines subject rights on object
    1. Each object has subject owner. It must have all rights
    2. Each task has perfomer(s) and acceptor(s). Only task can have them
    3. One relation can have several roles (ex. owner and acceptor)
    4. Only one relation can be created for pair subject <-> object. But it can have several roles
    
*/
getRandomSubject = (filter) => {
    const subjs = filter ? subjects.filter(filter) : subjects
    const randomIndex = rand(0, subjs.length-1);
    const res = subjs[randomIndex]
    return res;
}
getRandomRights = ()=> {
    const rights = { 
        canRead: true, 
        canCreateOf: rand(0,1) > 0,
        canUpdate: rand(0,1) > 0 
    }
    rights.canDelete = rights.canUpdate && rand(0,1) > 0
    return rights;
} 
const MAX_RELATIONS_NUM = 20

let relations = []
objects.forEach(object => {
    const objRels = [];
    objRels.push({
        objectId: object.id,
        subjectId: getRandomSubject().id,
        canRead : true,
        canUpdate: true,
        canCreateOf: true,
        canDelete: true,
        characteristics: ['owner']
    });
    const currentRelationsNum = rand(0, MAX_RELATIONS_NUM);
    for(let i = 0; i < currentRelationsNum; i++){
        objRels.push({
            objectId: object.id,
            subjectId: getRandomSubject(s => !objRels.map(x => x.subjectId).includes(s.id)).id,
            ...getRandomRights(),
            characteristics:[],
        });
    }
    if(object.type == 'taskEvent') {
        objRels[rand(0, objRels.length-1)].characteristics.push("acceptor");
        objRels[rand(0, objRels.length-1)].characteristics.push("perfomer");
        if(rand(0, 2) > 1) objRels[rand(0, objRels.length-1)].characteristics.push("acceptor");
        if(rand(0, 2) > 1) objRels[rand(0, objRels.length-1)].characteristics.push("perfomer");
    }
    relations = relations.concat(objRels);
});

 
/* -----------------------------------------Dates---------------------------------------------- */
/*
    1. Each anniversary event has one reccurence date, repeated yearly
    2. Some of anniversary event can have date, when in all started (Birtdays, for example) 
    3. Notification events can have all type of dates and can have no date. All these events must be displayed to user
    4. Occurence is a composed value. It is composed from date
*/
const dates = []
const freq = [ RRule.YEARLY, RRule.MONTHLY, RRule.WEEKLY, RRule.DAILY, RRule.HOURLY]
const getRandomRRules = () => Array.from({length: rand(1 , 4) }, () => 
    new RRule({
        freq: freq[rand(0,freq.length-1)],
        dtstart : rand(0,5)!=5? getRandomDate(true) : undefined,
        interval: rand(1,3),
        until: rand(0,5)==5? getRandomDate(true) : undefined
    }).toString()
);
calendarEvents.forEach(event => {
    switch(event.type){
        case 'anniversaryEvent' :
            const rrule = event.date? new RRule({
                freq: RRule.YEARLY,
                dtstart: event.date
            }): new RRule({
                freq: RRule.YEARLY,
                bymonthday: rand(1, 28),
                bymonth: rand(1, 12)
            });
            dates.push({
                eventId: event.id,
                type:"reccurenceDate",
                hasTime: false,
                rrules:[
                    rrule.toString()
                ]
            });
            
        break;
        case 'notificationEvent' :
            const current_dates_num = rand(0, 5)
            for(let i = 0; i < current_dates_num; i++){
                let date = {
                    eventId: event.id,
                    isExcept: false,
                    hasTime: rand(0,1) > 0
                };
                switch(rand(0, 3))
                {
                    case 0:
                        date = {
                           ...date,
                            type:'simpleDate',
                            dateTime: getRandomDate(date.hasTime)
                        }
                        break;
                    case 1:
                        date = {
                            ...date,
                             type: 'continuousDate',
                             start: getRandomDate(date.hasTime),
                             
                         }
                         date.end = dateAndTime.addMinutes(date.start, rand(30, 20160))
                        break;
                    case 2:
                        date = {
                            ...date,
                             type:'reccurenceDate',
                             rrules:getRandomRRules()
                         }
                        break;
                    case 3:
                        date = {
                            ...date,
                             type:'continuousReccurenceDate',
                             start: getRandomDate(date.hasTime),
                             rrules:getRandomRRules()
                         }
                         date.end = dateAndTime.addMinutes(date.start, rand(30, 20160))
                        break;
                }
                dates.push(date);
            }
        break;
        case 'taskEvent' :
            const current_dates_num_ = rand(0, 2)
            for(let i = 0; i < current_dates_num_; i++){
                let date = {
                    eventId: event.id,
                    isExcept: false,
                    hasTime: rand(0,1) > 0
                };
                switch(rand(0, 3))
                {
                    case 0:
                        date = {
                           ...date,
                            type:'simpleDate',
                            dateTime: getRandomDate(date.hasTime)
                        }
                        break;
                    case 1:
                        date = {
                            ...date,
                             type: 'continuousDate',
                             start: getRandomDate(date.hasTime),
                             
                         }
                         date.end = dateAndTime.addMinutes(date.start, rand(30, 20160))
                        break;
                    case 2:
                        date = {
                            ...date,
                             type:'reccurenceDate',
                             rrules:getRandomRRules()
                         }
                         if(rand(0, 2) > 0){
                             dates.push({
                                    eventId: event.id,
                                    hasTime: rand(0,1) > 0,
                                    type:'simpleDate',
                                    isExcept: true,
                                    dateTime: getRandomDate(date.hasTime),
                                 }
                             );
                         }
                        break;
                    case 3:
                        date = {
                            ...date,
                             type:'continuousReccurenceDate',
                             start: getRandomDate(date.hasTime),
                             rrules:getRandomRRules()
                         }
                         if(rand(0, 2) > 0){
                            dates.push({
                                    eventId: event.id,
                                    isExcept: true,
                                    hasTime: rand(0,1) > 0,
                                    type:'continuousDate',
                                    start: getRandomDate(date.hasTime),
                                    end: getRandomDate(date.hasTime),
                                }
                            );
                        }
                         date.end = dateAndTime.addMinutes(date.start, rand(30, 20160))
                        break;
                }
                dates.push(date);
            }
        break;
    }
    
});

module.exports = { 
        groups, 
        users, 
    subjects,
        calendarTypes,
        calendars,
        calendarEvents,
    objects,
    relations,
    dates
}
const fs = require('fs')
const date = require('date-and-time');
const rand = (min, max) => min + Math.random() * (max + 1 - min);


const GROUPS_COUNT = 6;
const USERS_COUNT = rand(GROUPS_COUNT * 5, GROUPS_COUNT * 15);

const someText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quia quas eos incidunt explicabo harum dicta nihil eaque, aspernatur est. Modi soluta ab odit fuga nesciunt nihil rem tenetur doloribus?';
const getRandomName = () => {
    const left = rand(0, someText.length - 3);
    const right = rand(left + 2, someText.length - 1);
    let name = someText.substring(left, right);
    return name.charAt(0).toUpperCase() + name.slice(1)
};


let currentSubjectId = 0, currentObjectId = 0;
const getSubjectId = () => ++currentSubjectId, getObjectId = () => ++currentObjectId;

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

const subjects =   groups.map(x => ({ ...x, $type: 'group' }))
                    .concat(users.map(x => ({ ...x, $type: 'user' })));


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

const EVENTS_COUNT = CALENDARS_COUNT * rand(20, 200)
const TASK_STATUSES = ['created','in process','completed'];
const mutateEventOfCalendarType = ev => {

    const calendar = calendars.find(c =>
        c.id == ev.calendarId);
    const typeName  = calendarTypes.find(t => 
                        t.id == calendar.typeId).name;
    switch(typeName) {
        case 'Anniversary':
            ev.$type = 'anniversaryEvent';
            ev.date = new Date(rand(-2000000000000, 1000000000000))
            //computed: 
            break;
        case 'Notification':
            ev.$type = 'notificationEvent';
            break;
        case 'Task':
            ev.$type = 'taskEvent';
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

/* ------------------------------------------Relations---------------------------------------------- */
/*
    1. Each object has subject owner
    2. Each task has perfomer(s) and acceptor(s). Only task can have them
    3. One relation can have several roles (ex. owner and acceptor)
    4. Only one relation can be created for pair subject <-> object. But it can have several roles
*/





/* ------------------------------------------------------------------------------------------------- */



db = { 
    groups, 
    users, 
    subjects,
    calendarTypes,
    calendars,
    calendarEvents
}

fs.writeFileSync('./db.json', JSON.stringify(db, null, "\t"));
console.log('Entities saved to ./db.json');

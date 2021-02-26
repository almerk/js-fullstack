const fetch = require('node-fetch')
const fs = require('fs')
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
const getSubjectId = () => ++currentSubjectId, getObjectId = () => currentObjectId;

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



db = { 
    groups, 
    users, 
    subjects:  groups.map(x => ({ ...x, $type: 'group' }))
                .concat(users.map(x => ({ ...x, $type: 'user' }))) 
}

fs.writeFileSync('./db.json', JSON.stringify(db, null, "\t"));
console.log('Entities saved to ./db.json');

const fetch = require('node-fetch')
const fs = require('fs')

const GROUPS_COUNT = 6;

const someText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quia quas eos incidunt explicabo harum dicta nihil eaque, aspernatur est. Modi soluta ab odit fuga nesciunt nihil rem tenetur doloribus?';
const rand = (min, max) => min + Math.random() * (max + 1 - min);
const getRandomName = () => {
    const left = rand(0, someText.length - 2);
    const right = rand(left, someText.length - 1);
    return someText.substring(left, right);
};


let currentSubjectId = 0;
const getSubjectId = () => ++currentSubjectId;

const groups = [ 
    { 
        id: getSubjectId(),
        name: 'all',
        parentId: null
    }
]
for (let i = 0; i < GROUPS_COUNT; i++){
    groups.push({
        id: getSubjectId(),
        name: getRandomName(),
        parentId: groups[Math.floor(Math.random() * groups.length)].id
    });
}





db = { groups }

fs.writeFileSync('./db.json', JSON.stringify(db, null, "\t"));
console.log('Entities saved to ./db.json');

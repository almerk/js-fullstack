const fs = require('fs');

module.exports = (path) => {  
    const db = fs.readFileSync(path, 'utf-8'); 
    return JSON.parse(db); 
}   
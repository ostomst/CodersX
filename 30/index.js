const fs = require('fs');

const content = JSON.parse(fs.readFileSync('./data.json', () => { console.log("Read"); }));

content.members = [{ name: 'Nam', age: 24 }];

fs.writeFileSync('./data.json', JSON.stringify(content));

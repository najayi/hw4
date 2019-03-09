const low      = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

var vehicles = db.get('vehicles').size().value();
console.log('number of vehicle entries : ' + vehicles);

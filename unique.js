const low      = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

var vehicles = db.get('vehicles');
var vehicle_ids = vehicles.map('id').value();
var counter = 0;
var unique_ids  = [];

vehicle_ids.forEach(function(item){
    if (!unique_ids.includes(item)){
        counter++;
        unique_ids.push(item);
    }
})

console.log('number of unique ids :' + counter);
console.log(JSON.stringify(unique_ids));

var fetch    = require('node-fetch');
var low      = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter  = new FileSync('db.json');
var db       = low(adapter);

// Set some defaults
db.defaults({ vehicles: [] }).write()

// Request bus data from MBTA
async function getBusLocations(){
	var url = 'https://api-v3.mbta.com/vehicles?api_key=bf1594531a834f48b822988895125aa5&filter[route]=1&include=trip';	
	var response = await fetch(url);
	var json     = await response.json();
	return json.data;
}

async function run(){

    var buses = await getBusLocations();

    buses.forEach(pushVehicle);

    console.log(new Date());

}

var pushVehicle = function (item){

    id = item.id;
    label = item.attributes.label;
    direction_id = item.attributes.direction_id;
    lat = item.attributes.latitude;
    long = item.attributes.longitude;

    var vehicle = {
        id           : id,
        label        : label,
        direction_id : direction_id,
        latitude     : lat,
        longitude    : long
    };

    db.get('vehicles').push(vehicle).write();

}

run();
var i = setInterval(run,15000);
setTimeout(function () {clearInterval( i );}, 3601000);


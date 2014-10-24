
var PUBNUB = require("../pubnub.js")

function log(r) {
	console.log(JSON.stringify(r));
}

var pubnub = PUBNUB({
    write_key     : "pub-c-bf446f9e-dd7f-43fe-8736-d6e5dce3fe67",
    read_key      : "sub-c-d1c2cc5a-1102-11e4-8880-02ee2ddab7fe",
    origin        : "dara24.devbuild.pubnub.com",
    auth_key	  : 'abcd'
});


//var home   = pubnub.sync('home');

// Sync to 'home.bedroom1.light1' Reference



var home = pubnub.sync('home');

/*
light1.on.merge(function(r){
	var data = r.data;
	log(light1.value('status'));
});


light1.on.ready(function(){
    console.log(light1.value('status'));
    light1.merge({ status : 'on' });
});
*/


// Home object has finished downloading and is ready to use
home.on.ready(function(ref) {
    console.log('HOME READY');
    console.log(JSON.stringify(home.value(), null, 2));
    
    // Full Home Status
    //log(ref.value());


    // Bedroom 1
    var bedroom1 = home.get('bedroom1');
    bedroom1.on.merge(function(r){
        console.log('MERGE on HOME.BEDROOM1');
        console.log(JSON.stringify(bedroom1.value(),null,2))
    });

    var office = pubnub.sync('office');
    var light1 = bedroom1.get('light1');

    light1.on.merge(function(r){
        console.log('MERGE on HOME.BEDROOM1.light1');
        console.log(JSON.stringify(light1.value('status'),null,2));
    });

    
    log(bedroom1.value('light1.status'));


    // Light 1
    var b1light1 = home.get('bedroom1.light1');

    var b1light2 = bedroom1.get('light2');


    // Light 1 Dedicated Event Listeners
    b1light1.on.merge(function(ref) {
    	log('Bedroom 1 Light 1 UPDATED');
        //log(bedroom1.value());
    	log(b1light1.value('status'));
    });

    
    // Write Data
    setTimeout(function(){
        home.merge({'bedroom1' :{ 'light1' : { status : 'on' }}});
    },3000);

    
    // Write Data
    setTimeout(function(){
        b1light1.merge({'status' : 'off'});
    },6000);

            // Write Data
    setTimeout(function(){
        b1light1.merge({'status' : 'on'});
    },9000);
    
    /*

    console.log(b1light2.value().status == 'on');

    // Replace Data
    // (deletes all data/leafs in child replaces with new dict)
    b1light2.merge({ status : 'off' });

    // Also You Could
    b1light2.get('status').merge('on', function(r){
        console.log(b1light2.value());
        console.log('B1 Light 2 : ' + b1light2.value().status == 'on'); 
    });
    
    */
    
})

/*
// Data Events
home.on.merge(function(ref) {
    var delta = ref.delta    // Changed Values
    ,   type  = ref.type     // Type of Chane "merge/merge" or "set/replace" or "remove"
    ,   path  = ref.root     // Reference to the Top-most Parent "Root" Node
    ,   path  = ref.path     // Path of Changes
    ,   value = ref.value(); // Full Data Diction with applied Delta Changes
})
home.on.remove(function(ref) {
    var delta = ref.delta    // Changed Values
    ,   type  = ref.type     // Type of Chane "merge" or "set" or "remove"
    ,   path  = ref.root     // Reference to the Top-most Parent "Root" Node
    ,   path  = ref.path     // Path of Changes
    ,   value = ref.value(); // Full Data Diction with applied Delta Changes
})

*/

home.on.merge(function(r){
    console.log('MERGE on HOME');
    console.log(JSON.stringify(home.value(), null, 2));
});
home.on.error(function(info) { console.log(info) })

// Network Events
home.on.network.connect(function(info)    { /* network active   */ })
//home.on.network.disconnect(function(info) { /* network inactive */ })
//home.on.network.reconnect(function(info)  { /* network restored */ })

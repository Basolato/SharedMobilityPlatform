'use strict';
/**
 * Write your transction processor functions here
 */


/**
 * Start Booking Transaction
 * @param {org.example.biznet.StartBooking} startBooking
 * @transaction
 */
function onStartBooking(startBooking) {
    
    var factory = getFactory();
    var time = Date.now();
    var user = startBooking.user;
    var mode = startBooking.mode;
    var id = "JOURNEY_1"+time;

    var journey = factory.newResource('org.example.biznet', 'Journey', id); 
    journey.start = time;
    journey.user = user;
    journey.mode = mode;

    journey.end = 0;
    journey.time = 0;

    return getAssetRegistry('org.example.biznet' + '.Journey')
        .then(function(journeyRegistry){
            return journeyRegistry.add(journey);
        });
    //wir bekommen den user, und das transportmittel
    // wir legen ein Objekt von typ journey an
    // in dieses object bekommt neue id, und legen startzeitpunkt fest

    //returnen der ID
   
}

/**
 * End Booking Transaction
 * @param {org.example.biznet.EndBooking} EndBooking
 * @transaction
 */
function onEndBooking(EndBooking) {

    var factory = getFactory();

    var time = Date.now();
    var journey = EndBooking.journey;

    journey.end = time;
    journey.time = journey.end - journey.start;

    return getAssetRegistry('org.example.biznet' + '.Journey')
    .then(function(journeyRegistry){
        return journeyRegistry.update(journey);
    });
}
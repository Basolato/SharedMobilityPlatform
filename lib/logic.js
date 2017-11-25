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

    // emit a notification that a trip has started
    var journeyStartedNotification = factory.newEvent('org.example.biznet', 'journeyStarted');
    journeyStartedNotification.journey = journey;
    emit(journeyStartedNotification);

    //Normal way
    //return getAssetRegistry('org.example.biznet' + '.Journey')
    return getAssetRegistry('org.example.biznet' + '.Journey')
        .then(function(journeyRegistry){
            //normal way
            return journeyRegistry.add(journey);
            //journeyRegistry.add(journey);
        });
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


    // emit a notification that a trip has ended
    var journeyEndedNotification = factory.newEvent('org.example.biznet', 'journeyEnded');
    journeyEndedNotification.journey = journey;
    emit(journeyEndedNotification);


    return getAssetRegistry('org.example.biznet' + '.Journey')
    .then(function(journeyRegistry){
        return journeyRegistry.update(journey);
    });
}

/**
 * CreateBill Transaction
 * @param {org.example.biznet.CreateBill} CreateBill
 * @transaction
 */
function onCreateBill(CreateBill) {
    
        var factory = getFactory();
    
        var time = Date.now();
        
        var mobilityProvider = CreateBill.billFor;


        return getAssetRegistry('org.example.biznet.Journey')
        .then(function (assetRegistry) {
            return query('selectJourneys')
                    .then(function (results) {

                        var promises = [];

                        var toPay = [];

                        for (var n = 0; n < results.length; n++) {
                            var journey = results[n];
                            

                            journey.start = 0;
                            journey.end = 0;
                            journey.time = 0;

                            // remove the commodity
                            promises.push(assetRegistry.update(journey));
                        }

                        // we have to return all the promises
                        return Promise.all(promises);
                    });
        });
    
        //return getAssetRegistry('org.example.biznet' + '.Journey')
        //.then(function(journeyRegistry){
        //    return journeyRegistry.update(journey);
        //});
    }


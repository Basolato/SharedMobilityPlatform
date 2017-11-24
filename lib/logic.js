'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * Sample transaction
 * @param {org.example.biznet.ChangeAssetValue} changeAssetValue
 * @transaction
 */
/**function onChangeAssetValue(changeAssetValue) {
    var assetRegistry;
    var id = changeAssetValue.relatedAsset.assetId;
    return getAssetRegistry('org.example.biznet.SampleAsset')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.get(id);
        })
        .then(function(asset) {
            asset.value = changeAssetValue.newValue;
            return assetRegistry.update(asset);
        });
}**/


/**
 * Start Booking Transaction
 * @param {org.example.biznet.user} StartBooking
 * @param {org.example.biznet.TransportationMode} StartBooking
 * @transaction
 */
function onStartBooking(user, TransportationMode) {
    return true;
}

/**
 * End Booking Transaction
 * @param {org.example.biznet.journey} EndBooking
 * @transaction
 */
function onEndBooking(journey) {
    return true;
}
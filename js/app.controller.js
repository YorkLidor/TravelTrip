import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'
import { placeController } from './place.controller.js'


window.onload = onInit
window.onGoToPlace = placeController.onGoToPlace
window.onPlaceSearch = placeController.onPlaceSearch
window.onRemoveLocation = placeController.onRemoveLocation
window.onCopyLocation() = placeController.onCopyLocation

window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos

function onInit() {
    mapService.initMap()
        .then(() => {
        })
        .catch(() => console.log('Error: cannot init map'))

    placeService.query()
        .then((places) => placeController.renderPlaces(places))
    
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            placeController.onGoToPlace(pos.coords.latitude,pos.coords.longitude)
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function onPanTo() {
    mapService.panTo(35.6895, 139.6917)
}


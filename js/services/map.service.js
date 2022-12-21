import { placeController } from '../place.controller.js'
import { placeService } from './place.service.js'

export const mapService = {
    initMap,
    addMarker,
    setLocation,
    searchPlaceCords,
}


// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return _connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)
        })
        .then(setMapListiner)

}

function setLocation(latLng) {
    gMap.panTo(latLng, gMap)
}

function setMapListiner() {
    google.maps.event.addListener(gMap, "click", function (event) {
        var lat = event.latLng.lat()
        var lng = event.latLng.lng()
        const name = prompt('Enter Location Name')
        placeService.savePlace({ name, lat, lng }).then((place) => {
            placeMarker(event.latLng, gMap, place.id)
            placeService.query()
                .then((places) => {
                    placeController.renderPlaces(places)
                }
                )
        }
        )

    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}

function placeMarker(latLng, gMap, locationId) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: gMap,
    })
    // gMarkers.push({locationId,marker})
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}


function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyDoBcTxLwg49in7I8ihnIOUZSK1wNTvYag'
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function searchPlaceCords(placeName) {
    var api = `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=AIzaSyD4YPH5GCrczJkbL9WWpkXj3GRoSIRovCY`
    return fetch(api)
        .then((response) => response.json())
        .then((data) => data.results[0].geometry.location)

}


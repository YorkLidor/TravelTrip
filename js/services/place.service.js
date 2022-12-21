import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PLACE_KEY = 'placeDB'
_createPlaces()

export const placeService = {
    query,
    getPlaceById,
    savePlace,
    removePlace,
}

function query() {
    return storageService.query(PLACE_KEY)
        .then(places => 
            places
        )
}

function _createPlaces(){
    let places = utilService.loadFromStorage(PLACE_KEY)
    if (!places || !places.length) {
        _createDemoPlaces()
    }
}

function _createDemoPlaces() {
    const places = [{
        name: 'Paris',
        lat: 48.864716,
        lng: 2.349014
    },
    {
        name: 'Amsterdam',
        lat: 52.377956,
        lng: 4.897070
    },
    {
        
        name: 'London',
        lat: 51.509865,
        lng: -0.118092
    }]
    utilService.saveToStorage(PLACE_KEY, places)
}

function _createPlace(name, lat, lng) {
    const randomPlace = utilService.randomLocationName()
    return {
        id: utilService.makeId(),
        name: name || randomPlace.name,
        lat: lat || randomPlace.lat,
        lng: lng || randomPlace.lng,
        weather,
        createdAt: utilService.randomPastTime(),
        updatedAt: utilService.randomPastTime()
    }
}

function getPlaceById(placeId) {
    return storageService.get(PLACE_KEY, placeId)
}

function savePlace(place){
    return storageService.put(PLACE_KEY, place)
}

function removePlace(placeId){
    return storageService.remove(PLACE_KEY, placeId)
}


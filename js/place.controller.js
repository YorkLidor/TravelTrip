import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'
// import { placeService } from './services/place.service.js'


export const placeController = {
    renderPlaces,
    onGoToPlace,
    onRemoveLocation,
}

function renderPlaces(places){
    console.log('places:', places)
    var strHtmls = places.map(place => `
    <div class="location-card">
        <h5 class="location-title">${place.name}</h5>
        <button class="delete-btn" onclick="onGoToPlace(${place.lat},${place.lng})">Go</button>
        <button class="go-btn" data-id="${place.id}" onclick="onRemoveLocation(this)">Delete</button>
    </div>
    `)
    
    document.querySelector('.places-container').innerHTML = strHtmls.join('')
}

function onGoToPlace(lat,lng){
    const marge = {lat,lng}
    mapService.setLocation(marge)
}

function onRemoveLocation(elBtn){
    const placeId = elBtn.dataset.id
    elBtn.removeAttribute('onclick')
    placeService.removePlace(placeId)
    .then(()=>placeService.query()
    .then((places)=>placeController.renderPlaces(places))
    )
}
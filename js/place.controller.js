import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'


export const placeController = {
    renderPlaces,
}

function renderPlaces(places){
    console.log('places:', places)
    var strHtmls = places.map(place => `
    <div class="location-card">
        <h5 class="location-title">${place.name}</h5>
        <button class="delete-btn" onclick="OnGoToPlace(${place.lat},${place.lng})">Go</button>
        <button class="go-btn" onclick="onRemoveLocation('${place.id}')">Delete</button>
    </div>
    `)
    
    document.querySelector('.places-container').innerHTML = strHtmls.join('')
}



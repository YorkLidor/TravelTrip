
export const placeController = {
    renderPlaces,
}

function renderPlaces(places){
    var strHtmls = places.map(place => `
    <div class="location-card">
        <h5 class="location-title">${place.name}</h5>
        <button class="delete-btn" onclick="OnGoToPlace(${place.lat},${place.lng})">Go</button>
        <button class="go-btn" onclick="onRemoveLocation('${place.id}')">Delete</button>
    </div>
    `)
    
    document.querySelector('.places-container').innerHTML = strHtmls.join('')
}


// function addLocation(lat, lon, name) {
//     //matan
//     var newLocation = _createPlace(lat, lon, name)
//     //glocations?
//     gLocations.unshift(newLocation)
//     //save?
//     _saveLocationsToStorage()
//     return newLocation
// }

// google.maps.event.addListener(gMap, "click", function (event) {
//     var latitude = event.latLng.lat();
//     var longitude = event.latLng.lng();
//     const locationName = prompt('Enter Location Name')
//     const newLocation = addLocation(latitude, longitude, locationName)
//     renderPlaces()
//     placeMarker(event.latLng, gMap, newLocation.id)
// })

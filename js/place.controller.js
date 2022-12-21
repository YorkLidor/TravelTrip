
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

// google.maps.event.addListener(gMap, "click", function (event) {
//     var latitude = event.latLng.lat();
//     var longitude = event.latLng.lng();
//     const locationName = prompt('Enter Location Name')
//     const newLocation = addLocation(latitude, longitude, locationName)
//     console.log('newLocation:', newLocation)
//     renderPlaces()
//     placeMarker(event.latLng, gMap, newLocation.id)
// })

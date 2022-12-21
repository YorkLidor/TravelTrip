import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

export const placeController = {
    renderPlaces,
    onGoToPlace,
    onRemoveLocation,
    onPlaceSearch,
    onCopyLocation,
    renderMapByQueryParams,
}

function renderPlaces(places) {
    var strHtmls = places.map(place => `
    <div class="location-card">
        <h5 class="location-title">${place.name}</h5>
        <button class="go-btn" onclick="onGoToPlace('${place.id}')">Go</button>
        <button class="delete-btn" data-id="${place.id}" onclick="onRemoveLocation(this)">Delete</button>
    </div>
    `)
    // ${place.lat},${place.lng},
    document.querySelector('.places-container').innerHTML = strHtmls.join('')
}

function onGoToPlace(id) {
    const place = placeService.getPlaceById(id)
    console.log('marge:', place)
    const marge = { lat: place.lat, lng: place.lng }
    mapService.setLocation(marge)
    onSetParams(place)
}

function onRemoveLocation(elBtn) {
    const placeId = elBtn.dataset.id
    elBtn.removeAttribute('onclick')
    placeService.removePlace(placeId)
        .then(() => placeService.query()
            .then((places) => placeController.renderPlaces(places))
        )
}

function onPlaceSearch(ev) {
    if (ev) ev.preventDefault()
    const elInputSearch = document.querySelector('input[name=search]')
    const placeName = elInputSearch.value


    mapService.searchPlaceCords(placeName).then((cords) => {
        const { lat, lng } = cords
        onGoToPlace(lat, lng)
        placeService.savePlace({ name: placeName, lat, lng })
            .then(() => placeService.query().then(placeController.renderPlaces))

    })
}

function onSetParams({ name, lat, lng }) {
    const queryName = `?name=${name}`
    const queryLat = `&lat=${lat}`
    const queryLng = `&lng=${lng}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryName + queryLat + queryLng
    window.history.pushState({ path: newUrl }, '', newUrl)
}

function renderMapByQueryParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    console.log('queryStringParams:', queryStringParams)
    const nameParams = queryStringParams.get('name') || ''
    const latParams = +queryStringParams.get('lat') || ''
    const lngParams = +queryStringParams.get('lng') || ''
    console.log('latParams:', latParams)
    if (!latParams) return

    const place = { name: nameParams, lat: latParams, lng: lngParams }
    placeService.savePlace(place)
        .then(() => {
            mapService.setLocation({ lat: place.lat, lng: place.lng })
            placeService.query(renderPlaces)
        })
}

function onCopyLocation() {
    // const url = 'http://127.0.0.1:5501/index.html'
    // const searchValue = url + location.search
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + location.search

    // Check if the clipboard API is available
    if (navigator.clipboard) {
        // Use the clipboard API to write the search value to the clipboard
        navigator.clipboard.writeText(newUrl).then(() => {
            // The write was successful
            searchValue
        }, (err) => {
            // The write failed
            console.error('Error copying search value to clipboard: ', err);
        });
    } else {
        // The clipboard API is not available, so we can't copy to the clipboard
        console.error('Clipboard API is not available');
    }
}
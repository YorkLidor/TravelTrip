import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

export const placeController = {
    renderPlaces,
    onGoToPlace,
    onRemoveLocation,
    onPlaceSearch,
    onCopyLocation,
}

function renderPlaces(places) {
    var strHtmls = places.map(place => `
    <div class="location-card">
        <h5 class="location-title">${place.name}</h5>
        <button class="go-btn" onclick="onGoToPlace(${place.lat},${place.lng})">Go</button>
        <button class="delete-btn" data-id="${place.id}" onclick="onRemoveLocation(this)">Delete</button>
    </div>
    `)

    document.querySelector('.places-container').innerHTML = strHtmls.join('')
}

function onGoToPlace(lat, lng) {
    const marge = { lat, lng }
    mapService.setLocation(marge)
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

function onCopyLocation(){
    setLang(lang)
    if (lang === 'he') {
        document.body.classList.add('rtl')
    }else {
        document.body.classList.remove('rtl')
    } 
    const queryStringParams = `?language=${lang}`
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + queryStringParams
    window.history.pushState({ path: newUrl }, '', newUrl)
    renderbooks()
    renderCards()
}

function renderFilterByQueryStringParams() {
    const queryStringParams = new URLSearchParams(window.location.search)
    const lanParams = queryStringParams.get('lan') || '' 
    const lngParams = queryStringParams.get('lng') || '' 
    
    if (!filterBy) return
    document.querySelector('.select-lang').value = filterBy
    onSetLang(filterBy)
}
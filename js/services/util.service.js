export const utilService = {
    saveToStorage,
    loadFromStorage,
    makeId,
    randomPastTime,
    randomLocationName,
    // randomPetType
}

const gLocationNames = [
    {
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
    }
]
// const gPetTypes = ['cat', 'dog', 'bird', 'fish', 'rabbit']

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomLocationName() {
    return gLocationNames[parseInt(Math.random() * gLocationNames.length)]
}

// function randomPetType() {
//     return gPetTypes[parseInt(Math.random() * gPetTypes.length)]
// }

function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}
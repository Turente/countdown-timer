const dom = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
}


const addTime = 1000 * 60 * 60 * 24 * 7
const finishTime = Date.now() + addTime + (1000 * 9)



const metkaInterval = setInterval(() => {
    const timeNow = Date.now()
    const timer = finishTime - timeNow
    if (timer < 0) {
        clearInterval(metkaInterval)
    } else {
    const formattedTime = getFormattedTime(timer)
    renderTime(formattedTime, dom)
    }
}, 1000);


// функция форматирования времени
function getFormattedTime(time) {
    const formattedTime = {
        days: Math.floor(time / (1000 * 60 * 60 * 24)),
        hours: Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((time % (1000 * 60)) / 1000),
    }
    return formattedTime
}

// функция отрисовки времени
function renderTime(timeData, dom) {
    Object.keys(timeData).forEach(key => {
        const segment = dom[key].querySelector('.segment')
        dom[key].querySelector('.timer__num').innerHTML = timeData[key]
        changeCircleSegment(segment, key, timeData[key])
    })
}

// функция изменения значения круглой обводки
function changeCircleSegment(elem, key, value) {
    const style = elem.style
    if (['minutes', 'seconds'].includes(key)) {
        style.strokeDasharray = `${value} 60`
    } else if (key === 'hours') {
        const segment = 60 / 24 * value
        style.strokeDasharray = `${segment} 60`
    } else if (key === 'days') {
        const segment = 60 / 7 * value
        style.strokeDasharray = `${segment} 60`
    }

    style.strokeLinecap = value ? 'round' : 'initial'
}
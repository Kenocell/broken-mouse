console.log('Broken Mouse Script Injected')

var x
var y
var point = {}
var ScrollInterval
var running = false
var STEPx = 1
var STEPy = 1
var e
var time

function startTrack() {
    getElement();
    document.body.appendChild(e)
    running = true
    ScrollInterval = setInterval(() => {
        if ((y - 10) > point.y) {
            window.scrollBy(0, STEPx)
        }
        if ((y + 10) < point.y) {
            window.scrollBy(0, -STEPx)
        }
        if ((x - 10) > point.x) {
            window.scrollBy(STEPy, 0)
        }
        if ((x + 10) < point.x) {
            window.scrollBy(-STEPy, 0)
        }
    }, 10);
}

function getElement() {

    var html = `<div style="height: 10px;width: 10px;top: ${point.y}px;left: ${point.x}px;position: fixed;background-color: black;border-radius: 10px;"></div>`;
    // document.body.append(html);
    e = document.createElement('span')
    e.innerHTML = html
    return;
}

function endTrack() {
    running = false
    e.outerHTML = '';
    delete e;
    clearInterval(ScrollInterval)
}

function init() {

    document.onmousemove = (ev) => {
        x = ev.clientX
        y = ev.clientY
        TIMEx = (point.y) ? Math.abs(point.y - y) : 20
        TIMEx = TIMEx / 10
        STEPx = (TIMEx > 0) ? TIMEx : 30
        TIMEy = (point.y) ? Math.abs(point.x - x) : 20
        TIMEy = TIMEy / 10
        STEPy = (TIMEy > 0) ? TIMEy : 30
    }

    document.onkeydown = (ev) => {
        if (running && ev.which !== 17) endTrack()
        if (running) return
        time = Date.now()
        var lastState = running
        if (ev.which === 17 && !lastState) {
            point.y = y
            point.x = x
            startTrack()
        }
    }
    document.onkeyup = (ev) => {
        let timeDif = Date.now() - time;
        if (ev.which === 17 && running && timeDif > 150) {
            endTrack();
        }
    }
}

init();
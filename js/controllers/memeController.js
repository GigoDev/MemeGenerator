'use strict'
let gElCanvas
let gCtx
let gSrokeColor = 'black'
let gFillColor = 'white'
let gSize = 30
let gStartPos
let gFont = 'Impact'
const PADDING = 5
const TOUCH_EVS = ['touchstart', 'touchmove', 'touchend']



/////////////Rendering:

function renderMeme() {

    const { lines, selectedImgId, selectedLineIdx } = getMeme()
    const selectedLine = lines[selectedLineIdx]

    drawImg(selectedImgId, () => {
       
        lines.forEach(line => drawText(line))
        drawRect(selectedLine.pos)
        drawText(selectedLine)
    })

}

function renderSelectedLine() {
    const { lines, selectedLineIdx } = getMeme()
    const selectedLine = lines[selectedLineIdx]

    drawText(selectedLine)
    drawRect(selectedLine.pos)
}

function drawImg(id, callback) {
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        callback()
    }
}

function drawText({ txt, size, fillColor, strokeColor, pos }) {
    const { x, y } = pos

    gCtx.lineWidth = size / 20
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px ${gFont}`
    gCtx.textAlign = 'start'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}

function drawRect({ x, y }) {
    const { width, height } = getTxtMeasurement()


    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = 2
    gCtx.strokeRect(x - PADDING, y - height + PADDING, width + PADDING * 2, height)

}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()
}

////////////////////User inputs:

function onImgSelect(elImg) {
    coverCanvasWithImg(elImg)
}

function onGetUserText(text) {
    setLineTxt(text)
    renderMeme()
}

function onSetColor() {
    gSrokeColor = document.querySelector('.stroke-color').value
    gFillColor = document.querySelector('.fill-color').value
    setColor()
    renderMeme()
}

function onSetTxtSize(diff) {
    gSize += diff
    setTxtSize()
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

function onSwitchLine() {
    switchLine()
    renderMeme()
    setTxtInput(gMeme)
}

function onDeleteLine() {
    removeLine()
    switchLine()
    renderMeme()
}

function onSetFont(value){
    gFont = value
}

function setTxtInput({ lines, selectedLineIdx }) {
    let elInput = document.querySelector('.txt-input')
    elInput.value = lines[selectedLineIdx].txt
    elInput.focus()
}

// // Drag and Drop:

function onDown(ev) {
    //* Get the ev pos from mouse or touch
    const evPos = getEvPos(ev)


    const clickedLineIdx = gMeme.lines.findIndex(({ pos }, idx) => isLineClicked(pos, idx, ev))
    if (clickedLineIdx === -1) return

    selectLine(clickedLineIdx)
    renderMeme()
    setLineDrag(true)

    //* Save the pos we start from
    gStartPos = evPos

}

function onMove(ev) {
    const { lines, selectedLineIdx } = getMeme()
    const { isDrag } = lines[selectedLineIdx]

    if (!isDrag) return

    document.body.style.cursor = 'move'

    const pos = getEvPos(ev)
    //* Calc the delta, the diff we moved
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy)
    //* Save the last pos, we remember where we`ve been and move accordingly
    gStartPos = pos
    //* The canvas is render again after every move
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    setTxtInput(gMeme)

    document.body.style.cursor = 'default'
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {

    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVS.includes(ev.type)) {
        //* Prevent triggering the mouse ev
        ev.preventDefault()
        //* Gets the first touch point
        ev = ev.changedTouches[0]
        //* Calc the right pos according to the touch screen
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
        // console.log('pos:', pos)
    }
    return pos
}

// Files:

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent
}
'use strict'
let gElCanvas
let gCtx


/////////////Rendering:

function renderMeme() {
    const meme = getMeme()
    const { lines, selectedImgId } = meme

    drawImg(selectedImgId, () => lines.forEach((line, idx) =>drawText( line, getTxtPos(idx))))
}

function drawImg(id, callback) {
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        callback()
    }
}

function drawText({ txt, size, fillColor, strokeColor },pos) {
    const {x,y} = pos

    gCtx.lineWidth = size / 20
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'start'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
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

function onDownloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL();
    elLink.href = imgContent
}

function onSetColor() {
    const strokeColor = document.getElementById('stroke-color').value
    const fillColor = document.getElementById('fill-color').value
    setColor(strokeColor, fillColor)
    renderMeme()
}

function onSetTxtSize(diff) {
    console.log(diff)
    setTxtSize(diff)
    renderMeme()
}

function onAddLine() {
    addLine()
    renderMeme()
}

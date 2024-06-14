'use strict'
var gElCanvas
var gCtx

function renderMeme() {
    const meme = getMeme()
    const top = { x: gElCanvas.width / 2, y: 20 }
    const bottom = { x: gElCanvas.width / 2, y: gElCanvas.height - 20 }
    const { lines, selectedLineIdx, selectedImgId } = meme

    drawImg(selectedImgId, () => drawText(lines[selectedLineIdx], top))
}

function drawImg(id, callback) {
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        callback()
    }
}

function drawText({ txt, size,fillColor,strokeColor } , { x, y }) {
    gCtx.lineWidth = size / 20
    gCtx.strokeStyle = strokeColor
    gCtx.fillStyle = fillColor
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(txt, x, y)
    gCtx.strokeText(txt, x, y)
}


function onImgSelect(elImg) {
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()

}

function renderImg(src = 'img/square.jpg') {
    const elImg = new Image()
    elImg.src = src
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

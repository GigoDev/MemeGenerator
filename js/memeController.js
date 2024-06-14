'use strict'
var gElCanvas
var gCtx

function renderMeme() {
    const meme = getMeme()
    const top = { x: gElCanvas.width / 2, y: 20 }
    const bottom = { x: gElCanvas.width / 2, y: gElCanvas.height - 20 }
    const { lines, selectedLineIdx, selectedImgId } = meme
    const {txt,size} = lines[selectedLineIdx]

    drawImg(selectedImgId, () => drawText(txt,size, top))
}

function drawImg(id, callback) {
    const elImg = new Image()
    elImg.src = `img/${id}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
        callback()
    }
}

function drawText(text, size, { x, y }) {
    gCtx.lineWidth = size / 20
    gCtx.strokeStyle = 'black'
    gCtx.fillStyle = 'white'
    gCtx.font = `${size}px Arial`
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
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
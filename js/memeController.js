var gElCanvas
var gCtx

function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    renderMeme()
}

function renderMeme() {
    let meme = getMeme()
    drawImg(meme.selectedImgId)
    drawText('hello', 100, 100)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'brown'
    gCtx.fillStyle = 'black'
    gCtx.font = '40px Arial'
    gCtx.textAlign = 'center'
    gCtx.textBaseline = 'middle'
    gCtx.fillText(text, x, y)
    gCtx.strokeText(text, x, y)
}

function drawImg(id) {
    const elImg = new Image()
    elImg.src = `imgs/${id}.jpg`
    elImg.onload = () => {
        gCtx.drawImage(elImg, 0, 0, elImg.naturalWidth, elImg.naturalHeight)
    }
}

function onSelectImg(elImg) {
    coverCanvasWithImg(elImg)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.clientWidth - 2
    renderImg()
}

function renderImg(src = 'img/square.jpg') {
    const elImg = new Image()
    elImg.src = src
    coverCanvasWithImg(elImg)
}
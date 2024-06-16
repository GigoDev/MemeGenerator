'use strict'


function onInit() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    renderGallery()
    addListeners()

}

function onShowGallery(){
    document.querySelector('.editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'grid'
}
function onShowEditor(){
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.editor').style.display = 'grid'
    resizeCanvas()
}
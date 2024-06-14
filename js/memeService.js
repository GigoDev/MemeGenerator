'use strict'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 30,
            fillColor: 'white',
            strokeColor: 'black'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    gMeme.lines[0].txt = txt
}

function setImg(id){
    gMeme.selectedImgId = id
}

function setColor(strokeColor,fillColor) {
    const{lines,selectedLineIdx} = gMeme
    lines[selectedLineIdx].fillColor = fillColor
    lines[selectedLineIdx].strokeColor = strokeColor
}
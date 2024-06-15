'use strict'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Add text here',
        size: 30,
        fillColor: 'white',
        strokeColor: 'black'
    }]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    console.log(txt)
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].txt = txt
}

function setImg(id) {
    gMeme.selectedImgId = id
}

function setColor() {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].fillColor = gFillColor
    lines[selectedLineIdx].strokeColor = gSrokeColor
}

function setTxtSize() {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].size = gSize
}

function getTxtPos(selectedLineIdx) {
    return { x: selectedLineIdx * 20, y: selectedLineIdx * 30 + 20 }
}

function addLine() {
    gMeme.lines.push(_createLine())
    gMeme.selectedLineIdx++
}

function _createLine() {
    return { txt: 'Add text here', size: gSize, fillColor: gFillColor, strokeColor: gSrokeColor }
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (!gMeme.lines[gMeme.selectedLineIdx]) gMeme.selectedLineIdx = 0
}
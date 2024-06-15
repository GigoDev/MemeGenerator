'use strict'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Add text here',
        size: 30,
        fillColor: 'white',
        strokeColor: 'black',
        pos: { x: 20, y: 40 }
    }]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
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
    gMeme.lines[gMeme.selectedLineIdx].size = gSize
}

function addLine() {
    gMeme.selectedLineIdx = gMeme.lines.length
    gMeme.lines.push(_createLine())
}

function _createLine() {
    const txt = 'Add text here'
    const size = gSize
    const fillColor = gFillColor
    const strokeColor = gSrokeColor
    const pos = { x: gMeme.selectedLineIdx * 20+20, y: gMeme.selectedLineIdx * 30 + 40 }

    return { txt, size, fillColor, strokeColor, pos }
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (!gMeme.lines[gMeme.selectedLineIdx]) gMeme.selectedLineIdx = 0
}

function selectLine(idx) {
    gMeme.selectedLineIdx = idx
}

function getTxtMeasurement() {
    const { lines, selectedLineIdx } = gMeme
    const fontSize = lines[selectedLineIdx].size
    console.log(selectedLineIdx)

    gCtx.font = `${fontSize}px Arial`

    const textMetrics = gCtx.measureText(lines[selectedLineIdx].txt);
    const width = textMetrics.width;
    const height = fontSize;

    return { width, height }
}
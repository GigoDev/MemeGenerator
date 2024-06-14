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
        },

        {
            txt: 'Not!!!',
            size: 30,
            fillColor: 'white',
            strokeColor: 'black'
        },
    ]
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

function setColor(strokeColor, fillColor) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].fillColor = fillColor
    lines[selectedLineIdx].strokeColor = strokeColor
}

function setTxtSize(diff) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].size += diff
}

function getTxtPos(selectedLineIdx) {
    return { x: selectedLineIdx * 20, y: selectedLineIdx * 30 + 20 }
}

function addLine() {
    gMeme.lines.push(_createLine())
}

function _createLine() {
    const { size, fillColor, strokeColor } = gMeme.lines[gMeme.selectedLineIdx]
    gMeme.selectedLineIdx++
    return { txt: 'Add text here', size, fillColor, strokeColor }
}
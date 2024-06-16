'use strict'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'Add text here',
        size: 30,
        fillColor: 'white',
        strokeColor: 'black',
        pos: { x: 20, y: 40 },
        isDrag: false
    }]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt) {
    const { lines, selectedLineIdx } = gMeme
    lines[selectedLineIdx].txt = txt
}

function removeLine() {
    const { lines, selectedLineIdx: idx } = gMeme
    lines.splice(idx, 1)
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
    const pos = { x: gMeme.selectedLineIdx * 20 + 20, y: gMeme.selectedLineIdx * 30 + 40 }
    const isDrag = false

    return { txt, size, fillColor, strokeColor, pos, isDrag }
}

function switchLine() {
    gMeme.selectedLineIdx++
    if (!gMeme.lines[gMeme.selectedLineIdx]) gMeme.selectedLineIdx = 0
}

function selectLine(idx) {
    gMeme.selectedLineIdx = idx
}

function getTxtMeasurement(idx = gMeme.selectedLineIdx) {
    const { lines } = gMeme
    const fontSize = lines[idx].size

    gCtx.font = `${fontSize}px Impact`

    const textMetrics = gCtx.measureText(lines[idx].txt);
    const width = textMetrics.width;
    const height = fontSize;

    return { width, height }
}

//  Drag and drop:

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

//* Move the circle in a delta, diff from the pervious pos
function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
    
}

function isLineClicked(linePos, lineIdx, ev) {
    const { offsetX, offsetY } = ev
    const { width, height } = getTxtMeasurement(lineIdx)

    return offsetX >= linePos.x - PADDING && offsetX <= linePos.x + width + PADDING &&
        offsetY >= linePos.y - height && offsetY <= linePos.y
}

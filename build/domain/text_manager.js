"use strict";
var past = [];
var present = "";
var future = [];
function updateText(newText) {
    past.push(present);
    present = newText;
    future = [];
}
function undo() {
    if (past.length > 0) {
        future.push(present);
        present = past.pop();
    }
}
function redo() {
    if (future.length > 0) {
        past.push(present);
        present = future.pop();
    }
}

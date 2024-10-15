let past = [];
let current_project = {};
let future = [];

function updateText(newText) {
  past.push(current_project);
  current_project = newText;
  future = [];
}

function undo() {
  if (past.length > 0) {
    future.push(current_project);
    current_project = past.pop();
  }
}

function redo() {
  if (future.length > 0) {
    past.push(current_project);
    current_project = future.pop();
  }
}

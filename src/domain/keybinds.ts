let currentKeybind = []
const keymaps = {
  Insert: {
    mode: true,
    f: {
      action: () => {
        addNewElement("FRAME");
      }
    },
    action: () => {
      openMenuNewElement();
    },
    s: {
      mode: true,
      c: {
        action: () => {
          addNewElement("OVAL"):
        }
      },
      r: {
        action: () => {
          addNewElement("RECT");
        }
      },
      i: {
        action: () => {
          addNewElement("IMAGE");
        }
      }
    }
  },
}
const keydown = {}
window.addEventListener("keydown", (e) => {
  keydown[e.key] = true;
}); 
window.addEventListener("keyup", (e) => { 
  keydown[e.key] = false;
});

function checkKeybind(map) {
  for (let key in map) {
    if (keydown[key]){
      if (map[key].mode) {
        currentKeybind.push(key); 
      }
      if (map[key].action) {
        map[key].action();
      }
      else {
        checkKeybind(map[key])
      }
    }
  }
}

function keyMode(map, index, key) {
  if (map[key] && map[key].mode) {
    currentKeybind.push(key)
  }
  if (map[key] && map[key].action) {
    map[key].action();
  }
  if (index < currentKeybind.length) {
    const keyMap = currentKeybind[index];
    keyMode(map[keyMap], index + 1, key);
    return;
  }
  if (map[key] && map[key].action) {
    currentKeybind = [];
  }
}
window.addEventListener("keydown", (e) => {
  if (currentKeybind.length > 0) {
    keyMode(keymaps, 0, e.key)
  }
  else {
    checkKeybind(keymaps)
  }
})
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePopovers();
    currentKeybind = [];
  }
})
window.addEventListener("keydown", (e) => { 
  e.preventDefault();
});
window.addEventListener("keyup", (e) => { 
  e.preventDefault();
});

const keymaps = {
  Control:{
    n:{
      f: {
        action: () => {
          addNewElement("FRAME");
        }
      },
      s: {
        o: {
          action: () => {
            addNewElement("OVAL"):
          }
        },
        r: {
          action: () => {
            addNewElement("RECT");
          }
        }
      }
    }
  }
}
const keydown = {}
const currentKeybind = {}
window.addEventListener("keydown", (e) => { 
  keydown[e.key] = true;
}); 
window.addEventListener("keyup", (e) => { 
  keydown[e.key] = false;
});

function checkKeybind(map, event) {
  for (let key in map) {
    console.log(key)
    if (keydown[key]){
      console.log(typeof map[key])
      if ("action" in map[key]) {
        map[key].action();
        event.preventDefault();

      }
      else {
        checkKeybind(map[key], event)
      }
    }
  }
}
window.addEventListener("keydown", (e) => {
  checkKeybind(keymaps, e)
})

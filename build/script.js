(()=>{"use strict";const t=class{constructor(){this.past=[],this.future=[]}updateText(t){this.current_project&&this.past.push(this.current_project),this.current_project=t,this.future=[]}undo(){this.past.length>0&&(this.current_project&&this.future.push(this.current_project),this.current_project=this.past.pop())}redo(){this.future.length>0&&(this.current_project&&this.past.push(this.current_project),this.current_project=this.future.pop())}},e=class{constructor(t,e){this.isSelecting=!1,this.selectionBox=document.getElementById("selection_box"),this.selectionBoxX=0,this.selectionBoxY=0,this.controls=t,this.move=e}initSelectionBox(){this.selectionBox&&(this.isSelecting=!0,this.selectionBoxX=this.move.calcPositionCursorX(this.controls.M_INIT_X),this.selectionBoxY=this.move.calcPositionCursorY(this.controls.M_INIT_Y),this.selectionBox.style.left=`${this.selectionBoxX}`,this.selectionBox.style.top=`${this.selectionBoxY}`,this.selectionBox.style.width="0px",this.selectionBox.style.height="0px",this.selectionBox.style.display="block")}updateSelectionBox(){if(this.selectionBox&&this.isSelecting){const t=this.move.calcPositionCursorX(this.controls.M_X),e=this.move.calcPositionCursorY(this.controls.M_Y),o=Math.abs(t-this.selectionBoxX),i=Math.abs(e-this.selectionBoxY),s=Math.min(t,this.selectionBoxX),n=Math.min(e,this.selectionBoxY);this.selectionBox.style.left=`${s}px`,this.selectionBox.style.top=`${n}px`,this.selectionBox.style.width=`${o}px`,this.selectionBox.style.height=`${i}px`}}finishSelectionBox(){this.isSelecting&&!this.controls.M_BUTTON_LEFT&&this.selectionBox&&(this.selectionBox.style.display="none",this.isSelecting=!1)}},o=class{constructor(t,e){this.drawPosition=document.getElementById("project_draw_position"),this.drawRect=document.getElementById("project_draw_rect"),this.controls=t,this.projectHistory=e}setPositionDraw(t,e){this.drawPosition&&(this.drawPosition.style.transform=`translate(${t}px, ${e}px)`)}setPosition(t,e){this.setPositionDraw(t,e),this.setPositionProject(t,e)}getPositionDrawX(){var t;const e=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return e?e.left:0}getPositionDrawY(){var t;const e=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return e?e.top:0}getPositionDrawPoint(){var t,e,o;const i=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return{x:null!==(e=null==i?void 0:i.left)&&void 0!==e?e:0,y:null!==(o=null==i?void 0:i.top)&&void 0!==o?o:0}}getPositionDrawPointXY(){var t,e,o;const i=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return{x:null!==(e=null==i?void 0:i.x)&&void 0!==e?e:0,y:null!==(o=null==i?void 0:i.y)&&void 0!==o?o:0}}getPositionProjectPoint(){var t,e;return null!==(e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.position)&&void 0!==e?e:{x:0,y:0}}setPositionProject(t,e){var o;const i=null===(o=this.projectHistory.current_project)||void 0===o?void 0:o.position;i&&(i.x=t,i.y=e)}calcPositionCursorX(t){var e,o;const i=null===(e=this.drawPosition)||void 0===e?void 0:e.getBoundingClientRect();return t-(null!==(o=null==i?void 0:i.left)&&void 0!==o?o:0)}calcPositionCursorY(t){var e,o;const i=null===(e=this.drawPosition)||void 0===e?void 0:e.getBoundingClientRect();return t-(null!==(o=null==i?void 0:i.top)&&void 0!==o?o:0)}moveProject(t){var e;const o=null===(e=this.drawRect)||void 0===e?void 0:e.getBoundingClientRect(),i=o&&t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom;if(this.controls.M_BUTTON_LEFT&&i){const t=this.getPositionProjectPoint();this.setPositionDraw(t.x+this.controls.M_DELTA_X,t.y+this.controls.M_DELTA_Y)}}moveProjectOnOneDirection(t){var e;const o="UP"===this.controls.SCROLL_STATE?this.controls.JUMP_SCROLL_MOVE:-this.controls.JUMP_SCROLL_MOVE,i=null===(e=this.projectHistory.current_project)||void 0===e?void 0:e.position;i&&(t.shiftKey?this.setPosition(i.x+o,i.y):this.setPosition(i.x,i.y+o))}initMove(){}finishMove(){var t;const e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.position;e&&this.setPositionProject(e.x+this.controls.M_DELTA_X,e.y+this.controls.M_DELTA_Y)}},i=class{constructor(t){this.body=document.querySelector("body"),this.selectionBox=t.selectionBox,this.actions=t.actions,this.zoom=t.zoom,this.move=t.move,this.bihavior=t.bihavior}onSelectionModeActionsKeyDown(t){t.shiftKey&&this.body&&this.body.setAttribute("selected","move-h")," "!==t.key||this.selectionBox.isSelecting||(this.actions.setMoveMode(),this.move.initMove()),t.ctrlKey&&!this.selectionBox.isSelecting&&(this.actions.setZoomMode(),this.zoom.initZoomMode())}onActionsKeyUp(t){"ZOOM"===this.actions.EDIT_MODE&&this.zoom.finishZoomMode(),this.bihavior.decelAllElement(),this.actions.setSelectionMode(),t.preventDefault()}},s=class{constructor(t,e){this.MIN_ZOOM=.1,this.MAX_ZOOM=3,this.NORMAL_SCALE=1,this.point={x:0,y:0},this.elPoint={x:0,y:0},this.deltaPoint={x:0,y:0},this.controls=t,this.projectHistory=e,this.draw=document.getElementById("project_draw")}initZoomMode(){}finishZoomMode(){}updateZoomState(){const{move:t}=this.controls,e="UP"===this.controls.SCROLL_STATE?this.controls.SCALE_JUMP:-this.controls.SCALE_JUMP,o=this.getScale()+e;this.setScale(o)}setScaleDraw(t){this.draw&&t<=this.MAX_ZOOM&&t>=this.MIN_ZOOM&&(this.draw.style.transform=`scale(${t})`)}setScaleProject(t){this.projectHistory.current_project&&t<=this.MAX_ZOOM&&t>=this.MIN_ZOOM&&(this.projectHistory.current_project.zoom=t)}setScale(t){this.setScaleDraw(t),this.setScaleProject(t)}getScale(){var t,e;return null!==(e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.zoom)&&void 0!==e?e:this.NORMAL_SCALE}},n=class{constructor(t,n,r){this.W_WIDTH=window.innerWidth,this.W_HEIGHT=window.innerHeight,this.JUMP_SCROLL_MOVE=50,this.M_X=0,this.M_Y=0,this.M_INIT_X=0,this.M_INIT_Y=0,this.M_DELTA_X=0,this.M_DELTA_Y=0,this.M_BUTTON_LEFT=!1,this.M_BUTTON_MIDDLE=!1,this.M_BUTTON_RIGHT=!1,this.SCROLL_STATE="STOP",this.SCALE_JUMP=.1,this.isScrolling=0,this.actions=t,this.move=new o(this,n),this.zoom=new s(this,n),this.selectionBox=new e(this,this.move),this.bihavior=r,this.modes=new i(this),this.addEventListeners()}addEventListeners(){window.addEventListener("keydown",this.handleKeyDown.bind(this)),window.addEventListener("keyup",this.handleKeyUp.bind(this)),window.addEventListener("mousemove",this.handleMouseMove.bind(this)),window.addEventListener("wheel",this.handleScroll.bind(this),{passive:!1}),window.addEventListener("mouseup",this.handleMouseUp.bind(this)),window.addEventListener("mousedown",this.handleMouseDown.bind(this)),window.addEventListener("contextmenu",(t=>t.preventDefault()))}handleKeyDown(t){"SELECTION"===this.actions.EDIT_MODE&&this.modes.onSelectionModeActionsKeyDown(t)}handleKeyUp(t){this.modes.onActionsKeyUp(t)}handleMouseMove(t){switch(this.M_X=t.clientX,this.M_Y=t.clientY,this.M_DELTA_X=this.M_X-this.M_INIT_X,this.M_DELTA_Y=this.M_Y-this.M_INIT_Y,this.actions.EDIT_MODE){case"SELECTION":this.selectionBox.updateSelectionBox();break;case"MOVE":this.move.moveProject(t)}}handleScroll(t){switch(this.SCROLL_STATE=t.deltaY<0?"UP":"DOWN",clearTimeout(this.isScrolling),this.isScrolling=setTimeout((()=>{this.SCROLL_STATE="STOP"}),300),this.actions.EDIT_MODE){case"SELECTION":this.move.moveProjectOnOneDirection(t),this.selectionBox.updateSelectionBox();break;case"ZOOM":this.zoom.updateZoomState()}t.preventDefault()}handleMouseUp(t){switch(this.updateMouseButtons(t,!1),this.actions.EDIT_MODE){case"SELECTION":this.selectionBox.finishSelectionBox();break;case"MOVE":this.move.finishMove()}this.resetMousePosition()}handleMouseDown(t){this.updateMouseButtons(t,!0),this.M_INIT_X=t.clientX,this.M_INIT_Y=t.clientY,"SELECTION"===this.actions.EDIT_MODE&&this.M_BUTTON_LEFT&&0===t.button&&(this.selectionBox.initSelectionBox(),t.preventDefault())}updateMouseButtons(t,e){0===t.button?this.M_BUTTON_LEFT=e:1===t.button?this.M_BUTTON_MIDDLE=e:2===t.button&&(this.M_BUTTON_RIGHT=e)}resetMousePosition(){this.M_INIT_X=0,this.M_INIT_Y=0,this.M_DELTA_X=0,this.M_DELTA_Y=0}},r=class{constructor(t){this.EDIT_MODE="SELECTION",this.projectDrawScope=document.getElementById("project_draw_rect"),this.bihavior=t}openMenuFile(){console.log("TODO")}openRecentProjects(){console.log("TODO")}openMenuNewElement(){const t=document.getElementById("menu_new_element");t&&(this.bihavior.selectElement(t),this.bihavior.toggleIsOpen(t))}closeMenuNewElement(){const t=document.getElementById("menu_new_element");t&&(this.bihavior.decelElement(t),this.bihavior.toggleIsOpen(t))}addNewElement(t){switch(t){case"OVAL":case"RECT":case"FRAME":case"IMAGE":console.log("TODO")}this.closeMenuNewElement()}setSelectionMode(){const t=document.getElementById("btn_selection_mode");t&&(this.bihavior.selectElement(t),this.EDIT_MODE="SELECTION")}setMoveMode(){const t=document.getElementById("btn_move_mode");t&&this.projectDrawScope&&(this.bihavior.selectElement(t),this.EDIT_MODE="MOVE",this.projectDrawScope.setAttribute("selected","move"))}setZoomMode(){const t=document.getElementById("btn_zoom_mode");t&&this.projectDrawScope&&(this.bihavior.selectElement(t),this.EDIT_MODE="ZOOM",this.projectDrawScope.setAttribute("selected","zoom"))}openMenuPlugins(){const t=document.getElementById("btn_plugin");t&&this.bihavior.selectElement(t)}openFolder(t){console.log("TODO")}setEditMode(t){switch(t){case"DESIGN":case"PROTOTYPE":console.log("TODO")}}addNewProp(t){switch(t){case"HTML":this.bihavior.addPropertieHTML();break;case"CSS":this.bihavior.addPropertieCSS()}}removePropretie(t){const e=document.getElementById(t);e&&this.bihavior.removeUiPropretie(e)}},c=class{constructor(t,e){this.currentKeybind=[],this.newElement={action:()=>{this.actions.openMenuNewElement()},f:{action:()=>{this.actions.addNewElement("FRAME")}},c:{action:()=>{this.actions.addNewElement("OVAL")}},r:{action:()=>{this.actions.addNewElement("RECT")}},i:{action:()=>{this.actions.addNewElement("IMAGE")}}},this.keymaps={Control:{n:Object.assign({mode:!0},this.newElement)},Insert:Object.assign({mode:!0},this.newElement)},this.keydown={},this.actions=t,this.bihavior=e,this.addEventListener()}isKeybind(t){return void 0===t.action||"function"==typeof t.action&&void 0===t.mode||"boolean"==typeof t.mode}isRecordOfObject(t){return"object"==typeof t&&null!==t&&!Array.isArray(t)}checkKeybind(t,e,o=""){if(t.action&&"function"==typeof t.action&&(t.action(),e.preventDefault()),t.mode&&this.currentKeybind.push(o),this.isRecordOfObject(t))for(const o in t)this.keydown[o]&&this.checkKeybind(t[o],e,o)}keyMode(t,e,o){let i=!1;if(this.isKeybind(t)&&(t.action&&"function"==typeof t.action&&(t.action(),i=!0),t.mode&&this.currentKeybind.push(o)),e<this.currentKeybind.length){const i=this.currentKeybind[e];this.isRecordOfObject(t[i])&&this.keyMode(t[i],e+1,o)}i&&(this.currentKeybind=[])}addEventListener(){window.addEventListener("keydown",(t=>{this.keydown[t.key]=!0})),window.addEventListener("keyup",(t=>{this.keydown[t.key]=!1})),window.addEventListener("keydown",(t=>{"F5"!==t.key&&(this.currentKeybind.length>0?this.keyMode(this.keymaps,0,t.key):this.checkKeybind(this.keymaps,t),"Escape"===t.key&&(this.actions.closeMenuNewElement(),this.bihavior.closePopovers(),this.currentKeybind=[]))}))}},l=class{constructor(t){document.addEventListener("click",(e=>{const o=document.querySelector(".popover");o&&e.target instanceof Node&&!o.contains(e.target)&&(t.actions.closeMenuNewElement(),this.closePopovers())}))}generateSlug(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))}toggleIsOpen(t){const e="is_open";"true"===t.getAttribute(e)?t.setAttribute(e,"false"):t.setAttribute(e,"true")}selectElement(t){this.decelAllElement(),t.setAttribute("selected","true")}decelAllElement(){const t=Array.from(document.querySelectorAll(".selection"));for(const e of t)this.decelElement(e)}decelElement(t){t.setAttribute("selected","false")}addPropertieHTML(){var t;const e=document.getElementById("list_props_html"),o=null===(t=document.getElementById("item_prop_template"))||void 0===t?void 0:t.cloneNode(!0);o&&e&&(o.removeAttribute("visible"),o.setAttribute("id",this.generateSlug()),e.appendChild(o))}addPropertieCSS(){var t;const e=document.getElementById("list_props_css"),o=null===(t=document.getElementById("item_prop_template"))||void 0===t?void 0:t.cloneNode(!0);o&&e&&(o.removeAttribute("visible"),o.setAttribute("id",this.generateSlug()),e.appendChild(o))}removeUiPropretie(t){t&&t.remove()}closePopovers(){const t=document.querySelector(".popover");t&&t.setAttribute("is_open","false")}};class h{constructor(){this.translations={en:{project_name:"Project Name",user_name:"Username",html:"Html",css:"Css",javascript:"javascript",assets:"Assets",design:"Design",prototype:"Prototype"},pt_br:{project_name:"Nome do Projeto",user_name:"Nome de usuário",html:"Html",css:"Css",javascript:"javascript",assets:"Assets",design:"Design",prototype:"Prototipo"}},this.base_view_body={id:"body",name:"body",is_view:!0,tag:"div",template:"",position:{x:-250,y:-250},props:[{name:"style",value:"width: 500px; height: 500px; background: #fff; position: absolute;"}],content:[]},this.base_json_template={id:"html",name:"",is_view:!1,tag:"html",template:"",position:{x:0,y:0},zoom:1,props:[{name:"lang",value:"pt-BR"}],content:[{id:"head",name:"",is_view:!1,tag:"head",template:"",props:[],content:[{name:"",is_view:!1,tag:"meta",template:"",props:[{name:"charset",value:"UTF-8"}],content:[]},{name:"",is_view:!1,tag:"meta",template:"",props:[{name:"name",value:"viewport"},{name:"content",value:"width=device-width, initial-scale=1.0"}],content:[]},{name:"",is_view:!1,tag:"title",template:"",props:[],content:["My Site"]}]},{name:"",is_view:!0,tag:"body",template:"",props:[],content:[{name:"",is_view:!0,tag:"h1",template:"",props:[{name:"style",value:"color: red;"}],content:["Teste"]}]}]}}}const a=class{constructor(t,e){this.translations=t.translations,this.setLanguage(e)}setLanguage(t){const e=Array.from(document.querySelectorAll("[data-translate]"));if(e)for(const o of e){const e=o.getAttribute("data-translate");e&&this.translations[t][e]&&(o.textContent=this.translations[t][e])}}},d=document.getElementById("project_draw"),u=new class{constructor(){this.RENDER_LABEL="PAB",this.common=new h,this.bihavior=new l(this),this.actions=new r(this.bihavior),this.keybinds=new c(this.actions,this.bihavior),this.projectHistory=new t,this.controls=new n(this.actions,this.projectHistory,this.bihavior),this.translations=new a(this.common,"pt_br")}initNewProject(){this.projectHistory.updateText(this.common.base_json_template)}updateCssProp(t,e,o){const i=new RegExp(`${e}:\\s*[^;]+;`,"g"),s=`${e}: ${o};`;return i.test(t)?t.replace(i,s):`${t} ${s}`}getProp(t,e){return t.find((t=>t.name===e))}addProp(t,e){let o=!1;const i=t.map((t=>t.name===e.name?(o=!0,e):t));return o||i.push(e),i}buildBodyRenderMode(t){var e,o,i;const s=Object.assign({},this.common.base_view_body),n=this.getProp(s.props,"style"),r=this.getProp(t.props,"style");let c=(null!==(e=null==r?void 0:r.value)&&void 0!==e?e:"")+(null!==(o=null==n?void 0:n.value)&&void 0!==o?o:"");const l=null!==(i=t.position)&&void 0!==i?i:s.position;return l&&(c=this.updateCssProp(c,"left",`${l.x}px`),c=this.updateCssProp(c,"top",`${l.y}px`),s.props=this.addProp(t.props.concat(s.props),{name:"style",value:c})),s.content=t.content,s}propsTosString(t){return t?t.map((t=>`${t.name}="${t.value}"`)).join(" "):""}generateTag(t,e){const o=t.tag;let i=[...t.props];return e&&(i=i.map((t=>("class"===t.name&&(t.value=t.value.split(" ").map((t=>t.startsWith(this.RENDER_LABEL)?t:`${this.RENDER_LABEL}__${t}`)).join(" ")),t)))),`<${o} ${this.propsTosString(i)}>${t.content?Array.isArray(t.content)?t.content.map((t=>this.buildTag(t,e))).join("\n"):t.content:""}</${o}>`}buildTag(t,e=!1){if("string"==typeof t)return t;let o=t;return e&&"body"===o.tag&&(o=this.buildBodyRenderMode(o)),this.generateTag(o,e)}buildProject(){let t="<!DOCTYPE html>";return this.projectHistory.current_project&&(t+=this.buildTag(this.projectHistory.current_project)),t}exportProject(){this.initNewProject();const t=new Blob([this.buildProject()],{type:"text/html"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download="index.html",e.click(),URL.revokeObjectURL(e.href)}};if(u.initNewProject(),u.projectHistory.current_project&&u.projectHistory.current_project.content.length>1){const t=u.buildTag(u.projectHistory.current_project.content[1],!0);d.innerHTML=t}window.main=u})();
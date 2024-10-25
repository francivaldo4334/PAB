(()=>{"use strict";const t=class{constructor(t,e){this.isSelecting=!1,this.selectionBox=document.getElementById("selection_box"),this.selectionBoxX=0,this.selectionBoxY=0,this.controls=t,this.move=e}initSelectionBox(){this.selectionBox&&(this.isSelecting=!0,this.selectionBoxX=this.move.calcPositionCursorX(this.controls.M_INIT_X),this.selectionBoxY=this.move.calcPositionCursorY(this.controls.M_INIT_Y),this.selectionBox.style.left=`${this.selectionBoxX}`,this.selectionBox.style.top=`${this.selectionBoxY}`,this.selectionBox.style.width="0px",this.selectionBox.style.height="0px",this.selectionBox.style.display="block")}updateSelectionBox(){if(this.selectionBox&&this.isSelecting){const t=this.move.calcPositionCursorX(this.controls.M_X),e=this.move.calcPositionCursorY(this.controls.M_Y),o=Math.abs(t-this.selectionBoxX),n=Math.abs(e-this.selectionBoxY),i=Math.min(t,this.selectionBoxX),s=Math.min(e,this.selectionBoxY);this.selectionBox.style.left=`${i}px`,this.selectionBox.style.top=`${s}px`,this.selectionBox.style.width=`${o}px`,this.selectionBox.style.height=`${n}px`}}finishSelectionBox(){this.isSelecting&&!this.controls.M_BUTTON_LEFT&&this.selectionBox&&(this.selectionBox.style.display="none",this.isSelecting=!1)}},e=class{constructor(t,e){this.drawPosition=document.getElementById("project_draw_position"),this.drawRect=document.getElementById("project_draw_rect"),this.controls=t,this.projectHistory=e}setPositionDraw(t,e){this.drawPosition&&(this.drawPosition.style.transform=`translate(${t}px, ${e}px)`)}setPosition(t,e){this.setPositionDraw(t,e),this.setPositionProject(t,e)}getPositionDrawX(){var t;const e=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return e?e.left:0}getPositionDrawY(){var t;const e=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return e?e.top:0}getPositionDrawPoint(){var t,e,o;const n=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return{x:null!==(e=null==n?void 0:n.left)&&void 0!==e?e:0,y:null!==(o=null==n?void 0:n.top)&&void 0!==o?o:0}}getPositionDrawPointXY(){var t,e,o;const n=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return{x:null!==(e=null==n?void 0:n.x)&&void 0!==e?e:0,y:null!==(o=null==n?void 0:n.y)&&void 0!==o?o:0}}getPositionProjectPoint(){var t,e;return null!==(e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.position)&&void 0!==e?e:{x:0,y:0}}setPositionProject(t,e){const o=this.projectHistory.current_project,n=null==o?void 0:o.position;n&&(n.x=t,n.y=e,this.projectHistory.updateText(o,!1))}calcPositionCursorX(t){var e,o;const n=null===(e=this.drawPosition)||void 0===e?void 0:e.getBoundingClientRect();return t-(null!==(o=null==n?void 0:n.left)&&void 0!==o?o:0)}calcPositionCursorY(t){var e,o;const n=null===(e=this.drawPosition)||void 0===e?void 0:e.getBoundingClientRect();return t-(null!==(o=null==n?void 0:n.top)&&void 0!==o?o:0)}moveProject(t){var e;const o=null===(e=this.drawRect)||void 0===e?void 0:e.getBoundingClientRect(),n=o&&t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom;if(this.controls.M_BUTTON_LEFT&&n){const t=this.getPositionProjectPoint();this.setPositionDraw(t.x+this.controls.M_DELTA_X,t.y+this.controls.M_DELTA_Y)}}moveProjectOnOneDirection(t){var e;const o="UP"===this.controls.SCROLL_STATE?this.controls.JUMP_SCROLL_MOVE:-this.controls.JUMP_SCROLL_MOVE,n=null===(e=this.projectHistory.current_project)||void 0===e?void 0:e.position;n&&(t.shiftKey?this.setPosition(n.x+o,n.y):this.setPosition(n.x,n.y+o))}initMove(){}finishMove(){var t;const e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.position;e&&this.setPositionProject(e.x+this.controls.M_DELTA_X,e.y+this.controls.M_DELTA_Y)}},o=class{constructor(t,e,o,n,i,s){this.body=document.querySelector("body"),this.selectionBox=t,this.actions=e,this.zoom=o,this.move=n,this.bihavior=i,this.projectHistory=s}onSelectionModeActionsKeyDown(t){t.ctrlKey&&!t.shiftKey&&"z"===t.key.toLowerCase()?(this.projectHistory.undo(),t.preventDefault()):t.ctrlKey&&t.shiftKey&&"z"===t.key.toLowerCase()?(this.projectHistory.redo(),t.preventDefault()):t.ctrlKey?(this.actions.setZoomMode(),this.zoom.initZoomMode()):t.shiftKey&&"Tab"===t.key?(this.actions.toPrevComponent(),t.preventDefault()):"Tab"===t.key?(this.actions.toNextComponent(),t.preventDefault()):t.shiftKey?this.body&&this.body.setAttribute("data-pab-project-selected","move-h"):"Enter"===t.key?(this.actions.toInnerComponent(),t.preventDefault()):" "===t.key&&(this.selectionBox.isSelecting||(this.actions.setMoveMode(),this.move.initMove()),t.preventDefault())}onActionsKeyUp(t){"ZOOM"===this.actions.EDIT_MODE&&this.zoom.finishZoomMode(),this.bihavior.decelAllElement(),"Control"!==t.key&&" "!==t.key||this.actions.setSelectionMode(),t.preventDefault()}},n=class{constructor(t,e){this.MIN_ZOOM=.1,this.MAX_ZOOM=3,this.NORMAL_SCALE=1,this.controls=t,this.projectHistory=e,this.draw=document.getElementById("project_draw")}initZoomMode(){}finishZoomMode(){}updateZoomState(){const t="UP"===this.controls.SCROLL_STATE?this.controls.SCALE_JUMP:-this.controls.SCALE_JUMP,e=this.getScale()+t;this.setScale(e)}setScaleDraw(t){this.draw&&t<=this.MAX_ZOOM&&t>=this.MIN_ZOOM&&(this.draw.style.transform=`scale(${t})`)}setScaleProject(t){const e=this.projectHistory.current_project;e&&t<=this.MAX_ZOOM&&t>=this.MIN_ZOOM&&(e.zoom=t,this.projectHistory.updateText(e,!1))}setScale(t){this.setScaleDraw(t),this.setScaleProject(t)}getScale(){var t,e;return null!==(e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.zoom)&&void 0!==e?e:this.NORMAL_SCALE}},i=class{constructor(t,e){this.currentKeybind=[],this.newElement={action:()=>{this.actions.openMenuNewElement()},o:{action:()=>{this.actions.addNewElement("OVAL")}},r:{action:()=>{this.actions.addNewElement("RECT")}},t:{action:()=>{this.actions.addNewElement("TEXT")}}},this.keymaps={Delete:{action:()=>{this.actions.removeSelectedComponent()}},Control:{c:{action:()=>{this.actions.copySelectedComponent()}},v:{action:()=>{this.actions.pasteComponetInSelectedComponent()}},n:Object.assign({mode:!0},this.newElement)},Insert:Object.assign({mode:!0},this.newElement)},this.keydown={},this.actions=t,this.bihavior=e,this.addEventListener()}isKeybind(t){return void 0===t.action||"function"==typeof t.action&&void 0===t.mode||"boolean"==typeof t.mode}isRecordOfObject(t){return"object"==typeof t&&null!==t&&!Array.isArray(t)}checkKeybind(t,e,o=""){if(t.action&&"function"==typeof t.action&&(t.action(),e.preventDefault()),t.mode&&this.currentKeybind.push(o),this.isRecordOfObject(t))for(const o in t)this.keydown[o]&&this.checkKeybind(t[o],e,o)}keyMode(t,e,o,n){let i=!1;if(this.isKeybind(t)&&(t.action&&"function"==typeof t.action&&(t.action(),i=!0,n.preventDefault()),t.mode&&this.currentKeybind.push(o)),e<this.currentKeybind.length){const i=this.currentKeybind[e];this.isRecordOfObject(t[i])&&this.keyMode(t[i],e+1,o,n)}i&&(this.currentKeybind=[])}addEventListener(){window.addEventListener("keyup",(t=>{this.keydown[t.key]=!1})),window.addEventListener("keydown",(t=>{this.keydown[t.key]=!0,"F5"!==t.key&&(this.currentKeybind.length>0?this.keyMode(this.keymaps,0,t.key,t):this.checkKeybind(this.keymaps,t),"Escape"===t.key&&(this.actions.closeMenuNewElement(),this.actions.closeMenuFile(),this.bihavior.closePopovers(),this.currentKeybind=[]))}))}},s=class{constructor(s,r,c,a,l){var d,p;this.W_WIDTH=window.innerWidth,this.W_HEIGHT=window.innerHeight,this.JUMP_SCROLL_MOVE=50,this.M_X=0,this.M_Y=0,this.M_INIT_X=0,this.M_INIT_Y=0,this.M_DELTA_X=0,this.M_DELTA_Y=0,this.M_BUTTON_LEFT=!1,this.M_BUTTON_MIDDLE=!1,this.M_BUTTON_RIGHT=!1,this.SCROLL_STATE="STOP",this.SCALE_JUMP=.1,this.isScrolling=0,this.drawRect=document.getElementById("project_draw_rect"),this.sideBars=document.getElementsByClassName("side_bar_border"),this.sideBarLeft=null===(p=null===(d=document.getElementById("side_bar_right"))||void 0===d?void 0:d.parentElement)||void 0===p?void 0:p.querySelector("[data-pab-project-is-open]"),this.mainProjectManager=r,this.actions=c,this.bihavior=a,this.main=s,this.move=new e(this,l),this.zoom=new n(this,l),this.keybinds=new i(c,a),this.selectionBox=new t(this,this.move),this.modes=new o(this.selectionBox,c,this.zoom,this.move,a,l),this.addEventListeners()}addEventListeners(){var t,e;window.addEventListener("keydown",this.handleKeyDown.bind(this)),window.addEventListener("keyup",this.handleKeyUp.bind(this)),window.addEventListener("mousemove",this.handleMouseMove.bind(this)),window.addEventListener("wheel",this.handleScroll.bind(this),{passive:!1}),window.addEventListener("mouseup",this.handleMouseUp.bind(this)),null===(t=this.drawRect)||void 0===t||t.addEventListener("mousedown",this.handleMouseDown.bind(this)),window.addEventListener("contextmenu",(t=>t.preventDefault())),null===(e=this.drawRect)||void 0===e||e.addEventListener("click",this.handleClick.bind(this))}handleClick(t){this.mainProjectManager.cleanAllSelectables()}handleKeyDown(t){var e;if(t.altKey&&"1"===t.key&&(this.actions.toggleWithDrawAndPropsFocus(),t.preventDefault()),t.ctrlKey&&"\\"==t.key){if(this.sideBars&&this.sideBars.length>0){const t=null===(e=this.sideBarLeft)||void 0===e?void 0:e.getAttribute("data-pab-project-is-open");Array.from(this.sideBars).forEach((e=>{"false"===t?e.setAttribute("data-pab-project-is-open","true"):e.setAttribute("data-pab-project-is-open","false")}))}}else"SELECTION"===this.actions.EDIT_MODE&&("PROPS"===this.main.FOCUS||"DRAW"===this.main.FOCUS&&this.modes.onSelectionModeActionsKeyDown(t))}handleKeyUp(t){this.modes.onActionsKeyUp(t)}handleMouseMove(t){switch(this.M_X=t.clientX,this.M_Y=t.clientY,this.M_DELTA_X=this.M_X-this.M_INIT_X,this.M_DELTA_Y=this.M_Y-this.M_INIT_Y,this.actions.EDIT_MODE){case"SELECTION":this.selectionBox.updateSelectionBox();break;case"MOVE":this.move.moveProject(t)}}handleScroll(t){switch(this.SCROLL_STATE=t.deltaY<0?"UP":"DOWN",clearTimeout(this.isScrolling),this.isScrolling=setTimeout((()=>{this.SCROLL_STATE="STOP"}),300),this.actions.EDIT_MODE){case"SELECTION":this.move.moveProjectOnOneDirection(t),this.selectionBox.updateSelectionBox();break;case"ZOOM":this.zoom.updateZoomState()}t.preventDefault()}handleMouseUp(t){switch(this.updateMouseButtons(t,!1),this.actions.EDIT_MODE){case"SELECTION":this.selectionBox.finishSelectionBox();break;case"MOVE":this.move.finishMove()}this.resetMousePosition()}handleMouseDown(t){this.updateMouseButtons(t,!0),this.M_INIT_X=t.clientX,this.M_INIT_Y=t.clientY,"SELECTION"===this.actions.EDIT_MODE&&this.M_BUTTON_LEFT&&0===t.button&&(this.selectionBox.initSelectionBox(),t.preventDefault())}updateMouseButtons(t,e){0===t.button?this.M_BUTTON_LEFT=e:1===t.button?this.M_BUTTON_MIDDLE=e:2===t.button&&(this.M_BUTTON_RIGHT=e)}resetMousePosition(){this.M_INIT_X=0,this.M_INIT_Y=0,this.M_DELTA_X=0,this.M_DELTA_Y=0}};Element.prototype.getComponentId=function(){var t;return null!==(t=this.getAttribute(`${l.RENDER_LABEL}id`))&&void 0!==t?t:""};let r="";class c{static getElementByComponent(t){return document.querySelector(`[${l.RENDER_LABEL}id=${t.id}]`)}static generateSlug(){let t=c.tryGenerateSlug();for(;c.getElementByComponentId(t);)t=c.tryGenerateSlug();return t}static getElementByComponentId(t){return document.querySelector(`[${l.RENDER_LABEL}id=${t}]`)}static stringToProps(t){return t.split(";").map((t=>t.trim())).filter((t=>t)).map((t=>{const[e,o]=t.split(":").map((t=>t.trim()));return{name:e,value:o}}))}static getProp(t,e){return t.find((t=>t.name===e))}static addProp(t,e){var o;let n=!1;const i=Object.assign(Object.assign({},e),{id:null!==(o=e.id)&&void 0!==o?o:this.generateSlug()}),s=t.map((t=>t.name===i.name?(n=!0,i):t));return n||s.push(i),s}static updateCssProp(t,e,o){const n=new RegExp(`${e}:\\s*[^;]+;`,"g"),i=`${e}: ${o};`;return n.test(t)?t.replace(n,i):`${t} ${i}`}static cssSanitize(t){const e=document.createElement("div"),o=t.split(";").filter((t=>""!==t.trim())),n=[];for(let t of o){const[o,i]=t.split(":").map((t=>t.trim()));if(o&&i){const t=e.style.getPropertyValue(o);e.style.setProperty(o,null!=i?i:"auto"),""!==e.style.getPropertyValue(o)&&n.push(`${o}: ${i}`),e.style.setProperty(o,t)}}return n.join("; ")}static isValidTagName(t){return/^[a-zA-Z][a-zA-Z0-9:-]*$/.test(t)}static propsTosString(t){return t.map((t=>`${t.name}="${t.value}"`)).join(" ")}static propsTosStringCss(t){return t.map((t=>`${t.name}: ${t.value};`)).join(" ")}static tryGenerateSlug(){return"pab__id__xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))}static findComponentById(t,e){if(t){if(t.id===e)return t;if(Array.isArray(t.content))for(const o of t.content){const t=this.findComponentById(o,e);if(t)return t}}}static getClipboard(t){t(r)}static setClipboard(t){r=t}}class a{constructor(t){var e,o,n;this.id=null!==(e=t.id)&&void 0!==e?e:c.generateSlug(),this.selected=null!==(o=t.selected)&&void 0!==o&&o,this.name=t.name,this.is_view=t.is_view,this.tag=t.tag,this.template=null!==(n=t.template)&&void 0!==n?n:"",this.props=t.props,this.styles=t.styles,this.content=t.content,this._zoom=t.zoom,this.position=t.position}get zoom(){var t;return null!==(t=this._zoom)&&void 0!==t?t:l.SCALE_DEFAULT}set zoom(t){this._zoom=t}}class l{}l.translations={en:{project_name:"Project Name",user_name:"Username",html:"Html",css:"Css",javascript:"javascript",assets:"Assets",design:"Design",prototype:"Prototype"},pt_br:{project_name:"Nome do Projeto",user_name:"Nome de usuário",html:"Html",css:"Css",javascript:"javascript",assets:"Assets",design:"Design",prototype:"Prototipo"}},l.base_json_template=new a({id:"html",name:"",is_view:!1,tag:"html",template:"",position:{x:0,y:0},zoom:1,props:[{name:"lang",value:"pt-BR"}],styles:[],content:[new a({id:"head",name:"",is_view:!1,tag:"head",template:"",position:{x:0,y:0},props:[],styles:[],content:[new a({name:"",is_view:!1,tag:"meta",template:"",position:{x:0,y:0},props:[{name:"charset",value:"UTF-8"}],styles:[],content:[]}),new a({name:"",is_view:!1,tag:"meta",template:"",position:{x:0,y:0},props:[{name:"name",value:"viewport"},{name:"content",value:"width=device-width, initial-scale=1.0"}],styles:[],content:[]}),new a({name:"",is_view:!1,tag:"title",template:"",position:{x:0,y:0},props:[],styles:[],content:"My Site"})]}),new a({name:"",is_view:!0,tag:"body",id:"body",template:"",position:{x:-250,y:-250},props:[],styles:[],content:[new a({name:"",is_view:!0,id:"teste_h1",tag:"h1",template:"",position:{x:0,y:0},props:[],styles:[{name:"color",value:"red"}],content:"Teste"})]})]}),l.base_view_body=new a({id:"body",tag:"div",name:"body",is_view:!0,selected:!0,props:[],styles:[{name:"width",value:"500px"},{name:"height",value:"500px"},{name:"background",value:"#fff"},{name:"position",value:"absolute"}],content:[],zoom:0,position:{x:-250,y:-250}}),l.text_json_template=new a({name:"text",is_view:!0,tag:"h4",template:"",position:{x:0,y:0},props:[],styles:[{name:"color",value:"black"}],content:"Text"}),l.rect_json_template=new a({name:"rect",is_view:!0,tag:"div",template:"",position:{x:0,y:0},props:[],styles:[{name:"width",value:"100px"},{name:"height",value:"100px"},{name:"background",value:"white"}],content:[]}),l.oval_json_template=new a({name:"oval",is_view:!0,tag:"div",template:"",position:{x:0,y:0},props:[],styles:[{name:"width",value:"100px"},{name:"height",value:"100px"},{name:"border-radius",value:"50%"},{name:"background",value:"white"}],content:[]}),l.RENDER_LABEL="bab_project__",l.SCALE_DEFAULT=1;const d=class{constructor(t){this.translations=l.translations,this.setLanguage(t)}setLanguage(t){const e=Array.from(document.querySelectorAll("[data-translate]"));if(e)for(const o of e){const e=o.getAttribute("data-translate");e&&this.translations[t][e]&&(o.textContent=this.translations[t][e])}}},p=class{constructor(t,e,o){this.EDIT_MODE="SELECTION",this.projectDrawScope=document.getElementById("project_draw_rect"),this.drawRect=document.getElementById("project_draw_rect"),this.sideRight=document.getElementById("side_bar_right"),this.menuNewElement=document.getElementById("data-pab-project-menu-add-elements"),this.menuActions=document.getElementById("data-pab-project-menu-actions"),this.mainProjectManager=t,this.bihavior=o,this.main=e}toggleWithDrawAndPropsFocus(){var t,e,o,n,i,s,r;"DRAW"===this.main.FOCUS?(this.main.FOCUS="PROPS",null===(t=this.drawRect)||void 0===t||t.setAttribute("data-pab-project-focus","false"),null===(e=this.sideRight)||void 0===e||e.setAttribute("data-pab-project-focus","true"),null===(i=null===(n=null===(o=this.sideRight)||void 0===o?void 0:o.parentElement)||void 0===n?void 0:n.querySelector("[data-pab-project-is-open]"))||void 0===i||i.setAttribute("data-pab-project-is-open","true")):(this.main.FOCUS="DRAW",null===(s=this.drawRect)||void 0===s||s.setAttribute("data-pab-project-focus","true"),null===(r=this.sideRight)||void 0===r||r.setAttribute("data-pab-project-focus","false"))}openMenuFile(){var t;const e=null===(t=this.menuActions)||void 0===t?void 0:t.getAttribute("data-pab-project-drop-down-id");if(e){const t=document.getElementById(e);t&&this.bihavior.toggleIsOpen(t)}}closeMenuFile(){var t;const e=null===(t=this.menuActions)||void 0===t?void 0:t.getAttribute("data-pab-project-drop-down-id");if(e){const t=document.getElementById(e);null==t||t.setAttribute("data-pab-project-is-open","false")}}openRecentProjects(){console.log("TODO")}openMenuNewElement(){var t;const e=null===(t=this.menuNewElement)||void 0===t?void 0:t.getAttribute("data-pab-project-drop-down-id");if(e&&this.menuNewElement){const t=document.getElementById(e);this.bihavior.selectElement(this.menuNewElement),this.bihavior.toggleIsOpen(t)}}closeMenuNewElement(){var t;const e=null===(t=this.menuNewElement)||void 0===t?void 0:t.getAttribute("data-pab-project-drop-down-id");if(e){const t=document.getElementById(e);null==t||t.setAttribute("data-pab-project-is-open","false")}}toPrevComponent(){this.mainProjectManager.toPrevComponent()}toNextComponent(){this.mainProjectManager.toNextComponent()}toInnerComponent(){this.mainProjectManager.toInnerComponent()}removeSelectedComponent(){this.mainProjectManager.removeSelectedComponent()}addNewElement(t){switch(t){case"OVAL":this.mainProjectManager.setComponentProjectInSelectedComponent(l.oval_json_template),this.main.buildProject(!0);break;case"RECT":this.mainProjectManager.setComponentProjectInSelectedComponent(l.rect_json_template),this.main.buildProject(!0);break;case"TEXT":this.mainProjectManager.setComponentProjectInSelectedComponent(l.text_json_template),this.main.buildProject(!0);break;case"FRAME":case"IMAGE":console.log("TODO")}this.closeMenuNewElement()}setSelectionMode(){const t=document.getElementById("btn_selection_mode");t&&(this.bihavior.selectElement(t),this.EDIT_MODE="SELECTION")}setMoveMode(){const t=document.getElementById("btn_move_mode");t&&this.projectDrawScope&&(this.bihavior.selectElement(t),this.EDIT_MODE="MOVE",this.projectDrawScope.setAttribute("data-pab-project-selected","move"))}setZoomMode(){const t=document.getElementById("btn_zoom_mode");t&&this.projectDrawScope&&(this.bihavior.selectElement(t),this.EDIT_MODE="ZOOM",this.projectDrawScope.setAttribute("data-pab-project-selected","zoom"))}openMenuPlugins(){const t=document.getElementById("btn_plugin");t&&this.bihavior.selectElement(t)}openFolder(t){console.log("TODO")}setEditMode(t){switch(t){case"DESIGN":case"PROTOTYPE":console.log("TODO")}}addNewProp(t,e){switch(t){case"HTML":this.bihavior.addPropertieHTML(e);break;case"CSS":this.bihavior.addPropertieCSS(e)}}removePropretie(t){const e=document.getElementById(t);e&&this.bihavior.removeUiPropretie(e)}copySelectedComponent(){const t=this.mainProjectManager.getSelectedComponentJson();console.log(t),c.setClipboard(t)}pasteComponetInSelectedComponent(){c.getClipboard((t=>{this.mainProjectManager.setComponetJsonInSelectedComponent(t)}))}exportIndexHtml(){this.main.exportProject()}},h=class{constructor(t,e){this.mainProjectManager=t,this.main=e,document.addEventListener("click",(e=>{const o=document.querySelector(".popover");o&&e.target instanceof Node&&!o.contains(e.target)&&(t.actions.closeMenuNewElement(),this.closePopovers())}))}toggleIsOpen(t){"true"===t.getAttribute("data-pab-project-is-open")?t.setAttribute("data-pab-project-is-open","false"):t.setAttribute("data-pab-project-is-open","true")}selectElement(t){this.decelAllElement(),t.setAttribute("data-pab-project-selected","true")}decelAllElement(){const t=Array.from(document.querySelectorAll(".selection"));for(const e of t)this.decelElement(e)}decelElement(t){t.setAttribute("data-pab-project-selected","false")}newPropertie(t){var e,o;const n=null===(e=document.getElementById("item_prop_template"))||void 0===e?void 0:e.cloneNode(!0);return n&&(n.removeAttribute("data-pab-project-visible"),n.setAttribute("id",null!==(o=null==t?void 0:t.id)&&void 0!==o?o:c.generateSlug())),n}loadPropertieInput(t,e,o){const n=t.querySelector(".data-pab-project-prop_input_name input"),i=t.querySelector(".data-pab-project-prop_input_value input");null==n||n.addEventListener("input",(n=>{var i;const s=n.target;this.mainProjectManager.setPropertyInSelectedComponent(null!==(i=null==o?void 0:o.id)&&void 0!==i?i:t.id,"name",s.value,e)})),null==i||i.addEventListener("keydown",(n=>{var s;let r=i.value.trim(),c=parseFloat(r);if(!isNaN(c)){const a=n.shiftKey?10:1,l="ArrowUp"===n.key?a:"ArrowDown"===n.key?-a:void 0;if(l){c+=l;const n=r.replace(/-?[0-9.]+/g,"").trim();i.value=c+n,this.mainProjectManager.setPropertyInSelectedComponent(null!==(s=null==o?void 0:o.id)&&void 0!==s?s:t.id,"value",i.value,e)}}})),null==i||i.addEventListener("input",(n=>{var i;const s=n.target;this.mainProjectManager.setPropertyInSelectedComponent(null!==(i=null==o?void 0:o.id)&&void 0!==i?i:t.id,"value",s.value,e)})),o&&(n.value=o.name,i.value=o.value)}addPropertieHTML(t){var e;const o=t?Object.assign(Object.assign({},t),{id:null!==(e=t.id)&&void 0!==e?e:c.generateSlug()}):void 0,n=document.getElementById("list_props_html"),i=this.newPropertie(o);i&&(null==n||n.appendChild(i),this.loadPropertieInput(i,"HTML",o))}addPropertieCSS(t){var e;const o=t?Object.assign(Object.assign({},t),{id:null!==(e=t.id)&&void 0!==e?e:c.generateSlug()}):void 0,n=document.getElementById("list_props_css"),i=this.newPropertie(o);i&&(null==n||n.appendChild(i),this.loadPropertieInput(i,"CSS",o))}removeProprety(t){this.mainProjectManager.removeProprety(t)}removeUiPropretie(t){t&&(this.removeProprety(t.id),t.remove(),this.main.buildProject(!0))}closePopovers(){const t=document.querySelector(".popover");t&&t.setAttribute("data-pab-project-is-open","false")}},u=class{constructor(t){this.past=[],this.future=[],this.main=t}set current_project(t){this._current_project=t,this._current_project&&this.updateText(this._current_project)}get current_project(){return JSON.parse(JSON.stringify(this._current_project))}updateText(t,e=!0){this._current_project&&e&&this.past.push(this._current_project),this._current_project=t,e&&(this.future=[])}undo(){this.past.length>0&&(this._current_project&&this.future.push(this._current_project),this._current_project=this.past.pop(),this.main.buildProject(!0,!0,!1))}redo(){this.future.length>0&&(this._current_project&&this.past.push(this._current_project),this._current_project=this.future.pop(),this.main.buildProject(!0,!0,!1))}};class m{constructor(t){this.nameField=document.querySelector("#comp_name input"),this.tagField=document.querySelector("#comp_tag input"),this.textField=document.querySelector("#comp_text input"),this.propListHtml=document.getElementById("list_props_html"),this.propListCSS=document.getElementById("list_props_css"),this.projectHistory=new u(t),this.bihavior=new h(this,t),this.actions=new p(this,t,this.bihavior),this.main=t,this.updateNameAndTagOfSelectedComponent()}getPreviousComponent(t,e=void 0){if(!e)return this.getPreviousComponent(t,this.projectHistory.current_project);if(Array.isArray(e.content))for(const o of e.content){if(o.id===t)return e;const n=this.getPreviousComponent(t,o);if(n)return n}}updateNameAndTagOfSelectedComponent(){this.nameField.addEventListener("input",(t=>{const e=this.getComponentSelected(),o=t.target;if(e){const t=c.findComponentById(this.projectHistory.current_project,e.getComponentId());t&&(t.name=o.value,t.id&&this.setComponentProjectById(t.id,t,!1),this.main.buildProject(!0))}t.preventDefault()})),this.tagField.addEventListener("input",(t=>{const e=this.getComponentSelected(),o=t.target;if(e){const t=c.findComponentById(this.projectHistory.current_project,e.getComponentId());t&&c.isValidTagName(o.value)&&(t.tag=o.value,t.id&&this.setComponentProjectById(t.id,t,!1),this.main.buildProject(!0))}})),this.textField.addEventListener("input",(t=>{const e=this.getComponentSelected(),o=t.target;if(e){const t=c.findComponentById(this.projectHistory.current_project,e.getComponentId());t&&(t.content=o.value,t.id&&this.setComponentProjectById(t.id,t,!1),this.main.buildProject(!0))}}))}getNextBrotherComponent(t){if(!t.id)return;const e=this.getPreviousComponent(t.id);if(!e)return;if(!Array.isArray(e.content))return;const o=e.content.findIndex((e=>e.id===t.id));return o>=0&&o+1<e.content.length?e.content[o+1]:void 0}getPrevBrotherComponent(t){if(!t.id)return;const e=this.getPreviousComponent(t.id);if(!e)return;if(!Array.isArray(e.content))return;const o=e.content.findIndex((e=>e.id===t.id));return o>0&&o<e.content.length?e.content[o-1]:void 0}toPrevComponent(t=this.getComponentSelected()){if(!t)return;const e=c.findComponentById(this.projectHistory.current_project,t.getComponentId());if(!e||!e.id)return;const o=this.getPrevBrotherComponent(e);if(o&&o.id){const t=c.getElementByComponent(o);return void(t&&this.onSelectComponente(t))}const n=this.getPreviousComponent(e.id);if(n&&n.id){const t=c.getElementByComponent(n);t&&this.onSelectComponente(t)}}toInnerComponent(t=this.getComponentSelected()){if(!t)return;const e=c.findComponentById(this.projectHistory.current_project,t.getComponentId());if(e&&Array.isArray(e.content)&&e.content.length>0){const t=e.content[0];if(t&&t.id){const e=c.getElementByComponent(t);return void(e&&this.onSelectComponente(e))}}}toNextComponent(t=this.getComponentSelected()){if(!t){const t=c.findComponentById(this.projectHistory.current_project,"body");if(!t||!t.id)return;const e=c.getElementByComponent(t);if(!e)return;return void this.onSelectComponente(e)}const e=c.findComponentById(this.projectHistory.current_project,t.getComponentId());if(!e)return;const o=this.getNextBrotherComponent(e);if(o&&o.id){const t=c.getElementByComponent(o);if(t)return void this.onSelectComponente(t)}if(Array.isArray(e.content)&&e.content.length>0){const t=e.content[0];if(t&&t.id){const e=c.getElementByComponent(t);return void(e&&this.onSelectComponente(e))}}}setComponentProjectInSelectedComponent(t){const e=this.getComponentSelected();if(!e)return;const o=c.findComponentById(this.projectHistory.current_project,e.getComponentId());if(!o||!o.id)return;Array.isArray(o.content)||(o.content=[]);const n=JSON.parse(JSON.stringify(t));n.id=c.generateSlug(),o.content.push(n),this.setComponentProjectById(o.id,o,!1),this.main.buildProject(!0)}removeSelectedComponent(){const t=this.getComponentSelected();if(!t)return;const e=c.findComponentById(this.projectHistory.current_project,t.getComponentId());if(!e||!e.id)return;const o=this.getPreviousComponent(e.id);Array.isArray(null==o?void 0:o.content)&&(o.content=o.content.filter((t=>t.id!==e.id))),o&&o.id&&(this.setComponentProjectById(o.id,o,!1),this.main.buildProject(!0))}setComponentProjectById(t,e,o=!0,n=this.projectHistory.current_project,i=(t,e)=>{this.projectHistory.updateText(t,e)},s=!0){if(n){if(n.id===t&&i(e,o),Array.isArray(n.content))for(let i=0;i<n.content.length;i++)this.setComponentProjectById(t,e,o,n.content[i],(t=>{Array.isArray(n.content)&&(n.content[i]=t)}),!1);s&&this.projectHistory.updateText(n,o)}}removeProprety(t){const e=this.getComponentSelected();if(!e)return;const o=c.findComponentById(this.projectHistory.current_project,e.getComponentId());o&&(o.props=o.props.filter((e=>e.id!==t)),o.styles=o.styles.filter((e=>e.id!==t)),this.setComponentProjectById(o.id,o))}setPropertyInSelectedComponent(t,e,o,n){var i;const s=this.getComponentSelected();if(!s)return;const r=c.findComponentById(this.projectHistory.current_project,s.getComponentId());if(!r||!r.id)return;const a=r.props;if("HTML"===n){let n=a.find((e=>e.id===t))||{name:"",value:"",id:t};"name"===e&&(n.name&&s.removeAttribute(n.name),n.name=o),"value"===e&&(n.value=o),a.includes(n)||a.push(n)}if("CSS"===n){const n=c.getProp(a,"style"),s=c.stringToProps(null!==(i=null==n?void 0:n.value)&&void 0!==i?i:""),l=r.styles;for(const t of s)l.push(t);let d=l.find((e=>e.id===t))||{name:"",value:"auto",id:t};"name"===e&&(d.name=o),"value"===e&&(d.value=o),l.includes(d)||l.push(d);let p=c.propsTosStringCss(l);p=c.cssSanitize(p)}this.setComponentProjectById(r.id,r,!1),this.main.buildProject(!0,!1)}cleanAllSelectables(t=!0){const e=document.querySelectorAll(`[${l.RENDER_LABEL}selectable]`);e&&e.forEach((t=>{t.setAttribute(`${l.RENDER_LABEL}selected`,"false");const e=c.findComponentById(this.projectHistory.current_project,t.getComponentId());e&&(e.selected=!1,e.id&&this.setComponentProjectById(e.id,e,!1))})),t&&(this.propListHtml&&(this.propListHtml.innerHTML=""),this.propListCSS&&(this.propListCSS.innerHTML=""),this.nameField.value="",this.tagField.value="",this.textField.value="")}onSelectComponente(t,e=!0){if(!t)return;if("SELECTION"!==this.actions.EDIT_MODE)return;this.cleanAllSelectables(e),t.setAttribute(`${l.RENDER_LABEL}selected`,"true");const o=c.findComponentById(this.projectHistory.current_project,t.getComponentId());if(o){if(o.selected=!0,this.nameField.value=o.name,this.tagField.value=o.tag,"string"==typeof o.content&&(this.textField.value=o.content),e){for(const t of o.props)t.name.toLowerCase().startsWith(l.RENDER_LABEL.toLowerCase())||"style"===t.name||this.actions.addNewProp("HTML",t);const t=o.styles.filter((t=>!("body"===o.id&&["left","top","position"].includes(t.name))));for(const e of t)this.actions.addNewProp("CSS",e)}o.id&&this.setComponentProjectById(o.id,o,!1)}}getComponentSelected(){return document.querySelector(`[${l.RENDER_LABEL}selected="true"]`)}getSelectedComponentJson(){var t;const e=null===(t=this.getComponentSelected())||void 0===t?void 0:t.getComponentId();if(!e)return"";const o=c.findComponentById(this.projectHistory.current_project,e);return o?JSON.stringify(o):""}setComponetJsonInSelectedComponent(t){var e;if(null===(e=this.getComponentSelected())||void 0===e?void 0:e.getComponentId())try{const e=JSON.parse(t);this.setComponentProjectInSelectedComponent(e)}catch(t){throw t}}}const v=new class{constructor(){this.FOCUS="DRAW",this.translations=new d("pt_br"),this.mainProjectManager=new m(this),this.controls=new s(this,this.mainProjectManager,this.mainProjectManager.actions,this.mainProjectManager.bihavior,this.mainProjectManager.projectHistory),this.projectHistory=this.mainProjectManager.projectHistory,this.actions=this.mainProjectManager.actions}initNewProject(){this.projectHistory.updateText(l.base_json_template)}loadOnclickEvents(){const t=document.querySelectorAll(`[${l.RENDER_LABEL}selectable]`);t&&t.forEach((t=>{t.onclick=t=>{const e=t.target;this.mainProjectManager.onSelectComponente(e),t.stopPropagation()}}))}buildBodyRenderMode(t){var e;const o=JSON.parse(JSON.stringify(l.base_view_body)),n=null!==(e=t.position)&&void 0!==e?e:o.position;return n&&(o.styles.push({name:"left",value:`${n.x}px`,id:c.generateSlug()}),o.styles.push({name:"top",value:`${n.y}px`,id:c.generateSlug()})),o.props=t.props.concat(o.props),o.props.push({name:`${l.RENDER_LABEL}body`,value:"",id:c.generateSlug()}),o.styles=t.props.concat(o.styles),o.content=t.content,o}generateTag(t,e,o=!0){var n;const i=t.tag;let s=[...t.props];return e?(s=s.map((t=>("class"===t.name&&(t.value=t.value.split(" ").map((t=>t.startsWith(l.RENDER_LABEL)?t:`${l.RENDER_LABEL}${t}`)).join(" ")),t))),s.push({name:`${l.RENDER_LABEL}selectable`,value:""}),s.push({name:`${l.RENDER_LABEL}selected`,value:String(t.selected)}),s.push({name:`${l.RENDER_LABEL}id`,value:null!==(n=t.id)&&void 0!==n?n:""})):s=s.filter((t=>!t.name.startsWith(l.RENDER_LABEL))),t.styles=t.styles.map((t=>(t.id||(t.id=c.generateSlug()),t))),t.id&&this.mainProjectManager.setComponentProjectById(t.id,t,!1),s.push({name:"style",value:c.propsTosStringCss(t.styles),id:c.generateSlug()}),`<${i} ${c.propsTosString(s)}>${t.content?Array.isArray(t.content)?t.content.map((t=>this.buildTag(t,e,o))).join("\n"):t.content:""}</${i}>`}buildTag(t,e=!1,o=!0){if("string"==typeof t)return t;let n=t;return e&&"body"===n.tag&&(n=this.buildBodyRenderMode(n)),n.id&&this.mainProjectManager.setComponentProjectById(n.id,n,o),this.generateTag(n,e,o)}buildItemTheeWithComponent(t,e){const o=e.cloneNode();if(o.removeAttribute("id"),o.setAttribute("data-pab-project-visible","true"),Array.isArray(t.content)&&t.content.length>0)for(const n of t.content){const t=o.querySelector(".content");t&&t.appendChild(this.buildItemTheeWithComponent(n,e))}return o}buildProject(t=!1,e=!0,o=!0){let n="";if(this.projectHistory.current_project)if(t){const t=document.getElementById("project_draw");n+=this.buildTag(this.projectHistory.current_project.content[1],!0,o),t.innerHTML=n,this.loadOnclickEvents(),this.mainProjectManager.onSelectComponente(this.mainProjectManager.getComponentSelected(),e)}else n="<!DOCTYPE html>",n+=this.buildTag(this.projectHistory.current_project,!1,o);return n}exportProject(){this.initNewProject();const t=new Blob([this.buildProject()],{type:"text/html"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download="index.html",e.click(),URL.revokeObjectURL(e.href)}};v.initNewProject(),v.buildProject(!0),window.main=v})();
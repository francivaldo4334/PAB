(()=>{"use strict";const t=class{constructor(t,e){this.isSelecting=!1,this.selectionBox=document.getElementById("selection_box"),this.selectionBoxX=0,this.selectionBoxY=0,this.controls=t,this.move=e}initSelectionBox(){this.selectionBox&&(this.isSelecting=!0,this.selectionBoxX=this.move.calcPositionCursorX(this.controls.M_INIT_X),this.selectionBoxY=this.move.calcPositionCursorY(this.controls.M_INIT_Y),this.selectionBox.style.left=`${this.selectionBoxX}`,this.selectionBox.style.top=`${this.selectionBoxY}`,this.selectionBox.style.width="0px",this.selectionBox.style.height="0px",this.selectionBox.style.display="block")}updateSelectionBox(){if(this.selectionBox&&this.isSelecting){const t=this.move.calcPositionCursorX(this.controls.M_X),e=this.move.calcPositionCursorY(this.controls.M_Y),o=Math.abs(t-this.selectionBoxX),i=Math.abs(e-this.selectionBoxY),n=Math.min(t,this.selectionBoxX),s=Math.min(e,this.selectionBoxY);this.selectionBox.style.left=`${n}px`,this.selectionBox.style.top=`${s}px`,this.selectionBox.style.width=`${o}px`,this.selectionBox.style.height=`${i}px`}}finishSelectionBox(){this.isSelecting&&!this.controls.M_BUTTON_LEFT&&this.selectionBox&&(this.selectionBox.style.display="none",this.isSelecting=!1)}},e=class{constructor(t,e){this.drawPosition=document.getElementById("project_draw_position"),this.drawRect=document.getElementById("project_draw_rect"),this.controls=t,this.projectHistory=e}setPositionDraw(t,e){this.drawPosition&&(this.drawPosition.style.transform=`translate(${t}px, ${e}px)`)}setPosition(t,e){this.setPositionDraw(t,e),this.setPositionProject(t,e)}getPositionDrawX(){var t;const e=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return e?e.left:0}getPositionDrawY(){var t;const e=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return e?e.top:0}getPositionDrawPoint(){var t,e,o;const i=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return{x:null!==(e=null==i?void 0:i.left)&&void 0!==e?e:0,y:null!==(o=null==i?void 0:i.top)&&void 0!==o?o:0}}getPositionDrawPointXY(){var t,e,o;const i=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return{x:null!==(e=null==i?void 0:i.x)&&void 0!==e?e:0,y:null!==(o=null==i?void 0:i.y)&&void 0!==o?o:0}}getPositionProjectPoint(){var t,e;return null!==(e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.position)&&void 0!==e?e:{x:0,y:0}}setPositionProject(t,e){const o=this.projectHistory.current_project,i=null==o?void 0:o.position;i&&(i.x=t,i.y=e,this.projectHistory.updateText(o,!1))}calcPositionCursorX(t){var e,o;const i=null===(e=this.drawPosition)||void 0===e?void 0:e.getBoundingClientRect();return t-(null!==(o=null==i?void 0:i.left)&&void 0!==o?o:0)}calcPositionCursorY(t){var e,o;const i=null===(e=this.drawPosition)||void 0===e?void 0:e.getBoundingClientRect();return t-(null!==(o=null==i?void 0:i.top)&&void 0!==o?o:0)}moveProject(t){var e;const o=null===(e=this.drawRect)||void 0===e?void 0:e.getBoundingClientRect(),i=o&&t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom;if(this.controls.M_BUTTON_LEFT&&i){const t=this.getPositionProjectPoint();this.setPositionDraw(t.x+this.controls.M_DELTA_X,t.y+this.controls.M_DELTA_Y)}}moveProjectOnOneDirection(t){var e;const o="UP"===this.controls.SCROLL_STATE?this.controls.JUMP_SCROLL_MOVE:-this.controls.JUMP_SCROLL_MOVE,i=null===(e=this.projectHistory.current_project)||void 0===e?void 0:e.position;i&&(t.shiftKey?this.setPosition(i.x+o,i.y):this.setPosition(i.x,i.y+o))}initMove(){}finishMove(){var t;const e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.position;e&&this.setPositionProject(e.x+this.controls.M_DELTA_X,e.y+this.controls.M_DELTA_Y)}},o=class{constructor(t,e,o,i,n,s){this.body=document.querySelector("body"),this.selectionBox=t,this.actions=e,this.zoom=o,this.move=i,this.bihavior=n,this.projectHistory=s}onSelectionModeActionsKeyDown(t){t.ctrlKey&&!t.shiftKey&&"z"===t.key.toLowerCase()?(this.projectHistory.undo(),t.preventDefault()):t.ctrlKey&&t.shiftKey&&"z"===t.key.toLowerCase()?(this.projectHistory.redo(),t.preventDefault()):t.ctrlKey?(this.actions.setZoomMode(),this.zoom.initZoomMode()):t.shiftKey&&"Tab"===t.key?(this.actions.toPrevComponent(),t.preventDefault()):"Tab"===t.key?(this.actions.toNextComponent(),t.preventDefault()):t.shiftKey?this.body&&this.body.setAttribute("selected","move-h"):"Enter"===t.key?(this.actions.toInnerComponent(),t.preventDefault()):" "===t.key&&(this.selectionBox.isSelecting||(this.actions.setMoveMode(),this.move.initMove()),t.preventDefault())}onActionsKeyUp(t){"ZOOM"===this.actions.EDIT_MODE&&this.zoom.finishZoomMode(),this.bihavior.decelAllElement(),this.actions.setSelectionMode(),t.preventDefault()}},i=class{constructor(t,e){this.MIN_ZOOM=.1,this.MAX_ZOOM=3,this.NORMAL_SCALE=1,this.controls=t,this.projectHistory=e,this.draw=document.getElementById("project_draw")}initZoomMode(){}finishZoomMode(){}updateZoomState(){const t="UP"===this.controls.SCROLL_STATE?this.controls.SCALE_JUMP:-this.controls.SCALE_JUMP,e=this.getScale()+t;this.setScale(e)}setScaleDraw(t){this.draw&&t<=this.MAX_ZOOM&&t>=this.MIN_ZOOM&&(this.draw.style.transform=`scale(${t})`)}setScaleProject(t){const e=this.projectHistory.current_project;e&&t<=this.MAX_ZOOM&&t>=this.MIN_ZOOM&&(e.zoom=t,this.projectHistory.updateText(e,!1))}setScale(t){this.setScaleDraw(t),this.setScaleProject(t)}getScale(){var t,e;return null!==(e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.zoom)&&void 0!==e?e:this.NORMAL_SCALE}},n=class{constructor(t,e){this.currentKeybind=[],this.newElement={action:()=>{this.actions.openMenuNewElement()},o:{action:()=>{this.actions.addNewElement("OVAL")}},r:{action:()=>{this.actions.addNewElement("RECT")}},t:{action:()=>{this.actions.addNewElement("TEXT")}}},this.keymaps={Delete:{action:()=>{this.actions.removeSelectedComponent()}},Control:{n:Object.assign({mode:!0},this.newElement)},Insert:Object.assign({mode:!0},this.newElement)},this.keydown={},this.actions=t,this.bihavior=e,this.addEventListener()}isKeybind(t){return void 0===t.action||"function"==typeof t.action&&void 0===t.mode||"boolean"==typeof t.mode}isRecordOfObject(t){return"object"==typeof t&&null!==t&&!Array.isArray(t)}checkKeybind(t,e,o=""){if(t.action&&"function"==typeof t.action&&(t.action(),e.preventDefault()),t.mode&&this.currentKeybind.push(o),this.isRecordOfObject(t))for(const o in t)this.keydown[o]&&this.checkKeybind(t[o],e,o)}keyMode(t,e,o,i){let n=!1;if(this.isKeybind(t)&&(t.action&&"function"==typeof t.action&&(t.action(),n=!0,i.preventDefault()),t.mode&&this.currentKeybind.push(o)),e<this.currentKeybind.length){const n=this.currentKeybind[e];this.isRecordOfObject(t[n])&&this.keyMode(t[n],e+1,o,i)}n&&(this.currentKeybind=[])}addEventListener(){window.addEventListener("keyup",(t=>{this.keydown[t.key]=!1})),window.addEventListener("keydown",(t=>{this.keydown[t.key]=!0,"F5"!==t.key&&(this.currentKeybind.length>0?this.keyMode(this.keymaps,0,t.key,t):this.checkKeybind(this.keymaps,t),"Escape"===t.key&&(this.actions.closeMenuNewElement(),this.bihavior.closePopovers(),this.currentKeybind=[]))}))}},s=class{constructor(s,r,c,a,l){var d,h;this.W_WIDTH=window.innerWidth,this.W_HEIGHT=window.innerHeight,this.JUMP_SCROLL_MOVE=50,this.M_X=0,this.M_Y=0,this.M_INIT_X=0,this.M_INIT_Y=0,this.M_DELTA_X=0,this.M_DELTA_Y=0,this.M_BUTTON_LEFT=!1,this.M_BUTTON_MIDDLE=!1,this.M_BUTTON_RIGHT=!1,this.SCROLL_STATE="STOP",this.SCALE_JUMP=.1,this.isScrolling=0,this.drawRect=document.getElementById("project_draw_rect"),this.sideBars=document.getElementsByClassName("side_bar_border"),this.sideBarLeft=null===(h=null===(d=document.getElementById("side_bar_right"))||void 0===d?void 0:d.parentElement)||void 0===h?void 0:h.querySelector("[is_open]"),this.mainProjectManager=r,this.actions=c,this.bihavior=a,this.main=s,this.move=new e(this,l),this.zoom=new i(this,l),this.keybinds=new n(c,a),this.selectionBox=new t(this,this.move),this.modes=new o(this.selectionBox,c,this.zoom,this.move,a,l),this.addEventListeners()}addEventListeners(){var t,e;window.addEventListener("keydown",this.handleKeyDown.bind(this)),window.addEventListener("keyup",this.handleKeyUp.bind(this)),window.addEventListener("mousemove",this.handleMouseMove.bind(this)),window.addEventListener("wheel",this.handleScroll.bind(this),{passive:!1}),window.addEventListener("mouseup",this.handleMouseUp.bind(this)),null===(t=this.drawRect)||void 0===t||t.addEventListener("mousedown",this.handleMouseDown.bind(this)),window.addEventListener("contextmenu",(t=>t.preventDefault())),null===(e=this.drawRect)||void 0===e||e.addEventListener("click",this.handleClick.bind(this))}handleClick(t){this.mainProjectManager.cleanAllSelectables()}handleKeyDown(t){var e;if(t.altKey&&"1"===t.key&&(this.actions.toggleWithDrawAndPropsFocus(),t.preventDefault()),t.ctrlKey&&"\\"==t.key){if(this.sideBars&&this.sideBars.length>0){const t=null===(e=this.sideBarLeft)||void 0===e?void 0:e.getAttribute("is_open");Array.from(this.sideBars).forEach((e=>{"false"===t?e.setAttribute("is_open","true"):e.setAttribute("is_open","false")}))}}else"SELECTION"===this.actions.EDIT_MODE&&("PROPS"===this.main.FOCUS||"DRAW"===this.main.FOCUS&&this.modes.onSelectionModeActionsKeyDown(t))}handleKeyUp(t){this.modes.onActionsKeyUp(t)}handleMouseMove(t){switch(this.M_X=t.clientX,this.M_Y=t.clientY,this.M_DELTA_X=this.M_X-this.M_INIT_X,this.M_DELTA_Y=this.M_Y-this.M_INIT_Y,this.actions.EDIT_MODE){case"SELECTION":this.selectionBox.updateSelectionBox();break;case"MOVE":this.move.moveProject(t)}}handleScroll(t){switch(this.SCROLL_STATE=t.deltaY<0?"UP":"DOWN",clearTimeout(this.isScrolling),this.isScrolling=setTimeout((()=>{this.SCROLL_STATE="STOP"}),300),this.actions.EDIT_MODE){case"SELECTION":this.move.moveProjectOnOneDirection(t),this.selectionBox.updateSelectionBox();break;case"ZOOM":this.zoom.updateZoomState()}t.preventDefault()}handleMouseUp(t){switch(this.updateMouseButtons(t,!1),this.actions.EDIT_MODE){case"SELECTION":this.selectionBox.finishSelectionBox();break;case"MOVE":this.move.finishMove()}this.resetMousePosition()}handleMouseDown(t){this.updateMouseButtons(t,!0),this.M_INIT_X=t.clientX,this.M_INIT_Y=t.clientY,"SELECTION"===this.actions.EDIT_MODE&&this.M_BUTTON_LEFT&&0===t.button&&(this.selectionBox.initSelectionBox(),t.preventDefault())}updateMouseButtons(t,e){0===t.button?this.M_BUTTON_LEFT=e:1===t.button?this.M_BUTTON_MIDDLE=e:2===t.button&&(this.M_BUTTON_RIGHT=e)}resetMousePosition(){this.M_INIT_X=0,this.M_INIT_Y=0,this.M_DELTA_X=0,this.M_DELTA_Y=0}};Element.prototype.getComponentId=function(){var t;return null!==(t=this.getAttribute(`${a.RENDER_LABEL}id`))&&void 0!==t?t:""};class r{static getElementByComponent(t){return document.querySelector(`[${a.RENDER_LABEL}id=${t.id}]`)}static generateSlug(){let t=r.tryGenerateSlug();for(;r.getElementByComponentId(t);)t=r.tryGenerateSlug();return t}static getElementByComponentId(t){return document.querySelector(`[${a.RENDER_LABEL}id=${t}]`)}static stringToProps(t){return t.split(";").map((t=>t.trim())).filter((t=>t)).map((t=>{const[e,o]=t.split(":").map((t=>t.trim()));return{name:e,value:o}}))}static getProp(t,e){return t.find((t=>t.name===e))}static addProp(t,e){var o;let i=!1;const n=Object.assign(Object.assign({},e),{id:null!==(o=e.id)&&void 0!==o?o:this.generateSlug()}),s=t.map((t=>t.name===n.name?(i=!0,n):t));return i||s.push(n),s}static updateCssProp(t,e,o){const i=new RegExp(`${e}:\\s*[^;]+;`,"g"),n=`${e}: ${o};`;return i.test(t)?t.replace(i,n):`${t} ${n}`}static cssSanitize(t){const e=document.createElement("div"),o=t.split(";").filter((t=>""!==t.trim())),i=[];for(let t of o){const[o,n]=t.split(":").map((t=>t.trim()));if(o&&n){const t=e.style.getPropertyValue(o);e.style.setProperty(o,null!=n?n:"auto"),""!==e.style.getPropertyValue(o)&&i.push(`${o}: ${n}`),e.style.setProperty(o,t)}}return i.join("; ")}static isValidTagName(t){return/^[a-zA-Z][a-zA-Z0-9:-]*$/.test(t)}static propsTosString(t){return t.map((t=>`${t.name}="${t.value}"`)).join(" ")}static propsTosStringCss(t){return t.map((t=>`${t.name}: ${t.value};`)).join(" ")}static tryGenerateSlug(){return"pab__id__xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))}static findComponentById(t,e){if(t){if(t.id===e)return t;if(Array.isArray(t.content))for(const o of t.content){const t=this.findComponentById(o,e);if(t)return t}}}}class c{constructor(t){var e,o,i;this.id=null!==(e=t.id)&&void 0!==e?e:r.generateSlug(),this.selected=null!==(o=t.selected)&&void 0!==o&&o,this.name=t.name,this.is_view=t.is_view,this.tag=t.tag,this.template=null!==(i=t.template)&&void 0!==i?i:"",this.props=t.props,this.styles=t.styles,this.content=t.content,this._zoom=t.zoom,this.position=t.position}get zoom(){var t;return null!==(t=this._zoom)&&void 0!==t?t:a.SCALE_DEFAULT}set zoom(t){this._zoom=t}}class a{}a.translations={en:{project_name:"Project Name",user_name:"Username",html:"Html",css:"Css",javascript:"javascript",assets:"Assets",design:"Design",prototype:"Prototype"},pt_br:{project_name:"Nome do Projeto",user_name:"Nome de usuário",html:"Html",css:"Css",javascript:"javascript",assets:"Assets",design:"Design",prototype:"Prototipo"}},a.base_json_template=new c({id:"html",name:"",is_view:!1,tag:"html",template:"",position:{x:0,y:0},zoom:1,props:[{name:"lang",value:"pt-BR"}],styles:[],content:[new c({id:"head",name:"",is_view:!1,tag:"head",template:"",position:{x:0,y:0},props:[],styles:[],content:[new c({name:"",is_view:!1,tag:"meta",template:"",position:{x:0,y:0},props:[{name:"charset",value:"UTF-8"}],styles:[],content:[]}),new c({name:"",is_view:!1,tag:"meta",template:"",position:{x:0,y:0},props:[{name:"name",value:"viewport"},{name:"content",value:"width=device-width, initial-scale=1.0"}],styles:[],content:[]}),new c({name:"",is_view:!1,tag:"title",template:"",position:{x:0,y:0},props:[],styles:[],content:"My Site"})]}),new c({name:"",is_view:!0,tag:"body",id:"body",template:"",position:{x:-250,y:-250},props:[],styles:[],content:[new c({name:"",is_view:!0,id:"teste_h1",tag:"h1",template:"",position:{x:0,y:0},props:[],styles:[{name:"color",value:"red"}],content:"Teste"})]})]}),a.base_view_body=new c({id:"body",tag:"div",name:"body",is_view:!0,selected:!0,props:[],styles:[{name:"width",value:"500px"},{name:"height",value:"500px"},{name:"background",value:"#fff"},{name:"position",value:"absolute"}],content:[],zoom:0,position:{x:-250,y:-250}}),a.text_json_template=new c({name:"text",is_view:!0,tag:"h4",template:"",position:{x:0,y:0},props:[],styles:[{name:"color",value:"black"}],content:"Text"}),a.rect_json_template=new c({name:"rect",is_view:!0,tag:"div",template:"",position:{x:0,y:0},props:[],styles:[{name:"width",value:"100px"},{name:"height",value:"100px"},{name:"background",value:"white"}],content:[]}),a.oval_json_template=new c({name:"oval",is_view:!0,tag:"div",template:"",position:{x:0,y:0},props:[],styles:[{name:"width",value:"100px"},{name:"height",value:"100px"},{name:"border-radius",value:"50%"},{name:"background",value:"white"}],content:[]}),a.RENDER_LABEL="bab_project__",a.SCALE_DEFAULT=1;const l=class{constructor(t){this.translations=a.translations,this.setLanguage(t)}setLanguage(t){const e=Array.from(document.querySelectorAll("[data-translate]"));if(e)for(const o of e){const e=o.getAttribute("data-translate");e&&this.translations[t][e]&&(o.textContent=this.translations[t][e])}}},d=class{constructor(t,e,o){this.EDIT_MODE="SELECTION",this.projectDrawScope=document.getElementById("project_draw_rect"),this.drawRect=document.getElementById("project_draw_rect"),this.sideRight=document.getElementById("side_bar_right"),this.mainProjectManager=t,this.bihavior=o,this.main=e}toggleWithDrawAndPropsFocus(){var t,e,o,i,n,s,r;"DRAW"===this.main.FOCUS?(this.main.FOCUS="PROPS",null===(t=this.drawRect)||void 0===t||t.setAttribute("pab_project__focus","false"),null===(e=this.sideRight)||void 0===e||e.setAttribute("pab_project__focus","true"),null===(n=null===(i=null===(o=this.sideRight)||void 0===o?void 0:o.parentElement)||void 0===i?void 0:i.querySelector("[is_open]"))||void 0===n||n.setAttribute("is_open","true")):(this.main.FOCUS="DRAW",null===(s=this.drawRect)||void 0===s||s.setAttribute("pab_project__focus","true"),null===(r=this.sideRight)||void 0===r||r.setAttribute("pab_project__focus","false"))}openMenuFile(){console.log("TODO")}openRecentProjects(){console.log("TODO")}openMenuNewElement(){const t=document.getElementById("menu_new_element");t&&(this.bihavior.selectElement(t),this.bihavior.toggleIsOpen(t))}closeMenuNewElement(){const t=document.getElementById("menu_new_element");t&&(this.bihavior.decelElement(t),t.setAttribute("is_open","false"))}toPrevComponent(){this.mainProjectManager.toPrevComponent()}toNextComponent(){this.mainProjectManager.toNextComponent()}toInnerComponent(){this.mainProjectManager.toInnerComponent()}removeSelectedComponent(){this.mainProjectManager.removeSelectedComponent()}addNewElement(t){switch(t){case"OVAL":this.mainProjectManager.setComponentProjectInSelectedComponent(a.oval_json_template),this.main.buildProject(!0);break;case"RECT":this.mainProjectManager.setComponentProjectInSelectedComponent(a.rect_json_template),this.main.buildProject(!0);break;case"TEXT":this.mainProjectManager.setComponentProjectInSelectedComponent(a.text_json_template),this.main.buildProject(!0);break;case"FRAME":case"IMAGE":console.log("TODO")}this.closeMenuNewElement()}setSelectionMode(){const t=document.getElementById("btn_selection_mode");t&&(this.bihavior.selectElement(t),this.EDIT_MODE="SELECTION")}setMoveMode(){const t=document.getElementById("btn_move_mode");t&&this.projectDrawScope&&(this.bihavior.selectElement(t),this.EDIT_MODE="MOVE",this.projectDrawScope.setAttribute("selected","move"))}setZoomMode(){const t=document.getElementById("btn_zoom_mode");t&&this.projectDrawScope&&(this.bihavior.selectElement(t),this.EDIT_MODE="ZOOM",this.projectDrawScope.setAttribute("selected","zoom"))}openMenuPlugins(){const t=document.getElementById("btn_plugin");t&&this.bihavior.selectElement(t)}openFolder(t){console.log("TODO")}setEditMode(t){switch(t){case"DESIGN":case"PROTOTYPE":console.log("TODO")}}addNewProp(t,e){switch(t){case"HTML":this.bihavior.addPropertieHTML(e);break;case"CSS":this.bihavior.addPropertieCSS(e)}}removePropretie(t){const e=document.getElementById(t);e&&this.bihavior.removeUiPropretie(e)}},h=class{constructor(t,e){this.mainProjectManager=t,this.main=e,document.addEventListener("click",(e=>{const o=document.querySelector(".popover");o&&e.target instanceof Node&&!o.contains(e.target)&&(t.actions.closeMenuNewElement(),this.closePopovers())}))}toggleIsOpen(t){const e="is_open";"true"===t.getAttribute(e)?t.setAttribute(e,"false"):t.setAttribute(e,"true")}selectElement(t){this.decelAllElement(),t.setAttribute("selected","true")}decelAllElement(){const t=Array.from(document.querySelectorAll(".selection"));for(const e of t)this.decelElement(e)}decelElement(t){t.setAttribute("selected","false")}newPropertie(t){var e,o;const i=null===(e=document.getElementById("item_prop_template"))||void 0===e?void 0:e.cloneNode(!0);return i&&(i.removeAttribute("pab_project__visible"),i.setAttribute("id",null!==(o=null==t?void 0:t.id)&&void 0!==o?o:r.generateSlug())),i}loadPropertieInput(t,e,o){const i=t.querySelector(".pab_project__prop_input_name input"),n=t.querySelector(".pab_project__prop_input_value input");null==i||i.addEventListener("input",(i=>{var n;const s=i.target;this.mainProjectManager.setPropertyInSelectedComponent(null!==(n=null==o?void 0:o.id)&&void 0!==n?n:t.id,"name",s.value,e)})),null==n||n.addEventListener("keydown",(i=>{var s;let r=n.value.trim(),c=parseFloat(r);if(!isNaN(c)){const a=i.shiftKey?10:1,l="ArrowUp"===i.key?a:"ArrowDown"===i.key?-a:void 0;if(l){c+=l;const i=r.replace(/-?[0-9.]+/g,"").trim();n.value=c+i,this.mainProjectManager.setPropertyInSelectedComponent(null!==(s=null==o?void 0:o.id)&&void 0!==s?s:t.id,"value",n.value,e)}}})),null==n||n.addEventListener("input",(i=>{var n;const s=i.target;this.mainProjectManager.setPropertyInSelectedComponent(null!==(n=null==o?void 0:o.id)&&void 0!==n?n:t.id,"value",s.value,e)})),o&&(i.value=o.name,n.value=o.value)}addPropertieHTML(t){var e;const o=t?Object.assign(Object.assign({},t),{id:null!==(e=t.id)&&void 0!==e?e:r.generateSlug()}):void 0,i=document.getElementById("list_props_html"),n=this.newPropertie(o);n&&(null==i||i.appendChild(n),this.loadPropertieInput(n,"HTML",o))}addPropertieCSS(t){var e;const o=t?Object.assign(Object.assign({},t),{id:null!==(e=t.id)&&void 0!==e?e:r.generateSlug()}):void 0,i=document.getElementById("list_props_css"),n=this.newPropertie(o);n&&(null==i||i.appendChild(n),this.loadPropertieInput(n,"CSS",o))}removeProprety(t){this.mainProjectManager.removeProprety(t)}removeUiPropretie(t){t&&(this.removeProprety(t.id),t.remove(),this.main.buildProject(!0))}closePopovers(){const t=document.querySelector(".popover");t&&t.setAttribute("is_open","false")}},p=class{constructor(t){this.past=[],this.future=[],this.main=t}set current_project(t){this._current_project=t,this._current_project&&this.updateText(this._current_project)}get current_project(){return JSON.parse(JSON.stringify(this._current_project))}updateText(t,e=!0){this._current_project&&e&&this.past.push(this._current_project),this._current_project=t,e&&(this.future=[])}undo(){this.past.length>0&&(this._current_project&&this.future.push(this._current_project),this._current_project=this.past.pop(),this.main.buildProject(!0,!0,!1))}redo(){this.future.length>0&&(this._current_project&&this.past.push(this._current_project),this._current_project=this.future.pop(),this.main.buildProject(!0,!0,!1))}};class u{constructor(t){this.nameField=document.querySelector("#comp_name input"),this.tagField=document.querySelector("#comp_tag input"),this.textField=document.querySelector("#comp_text input"),this.propListHtml=document.getElementById("list_props_html"),this.propListCSS=document.getElementById("list_props_css"),this.projectHistory=new p(t),this.bihavior=new h(this,t),this.actions=new d(this,t,this.bihavior),this.main=t,this.updateNameAndTagOfSelectedComponent()}getPreviousComponent(t,e=void 0){if(!e)return this.getPreviousComponent(t,this.projectHistory.current_project);if(Array.isArray(e.content))for(const o of e.content){if(o.id===t)return e;const i=this.getPreviousComponent(t,o);if(i)return i}}updateNameAndTagOfSelectedComponent(){this.nameField.addEventListener("input",(t=>{const e=this.getComponentSelected(),o=t.target;if(e){const t=r.findComponentById(this.projectHistory.current_project,e.getComponentId());t&&(t.name=o.value,t.id&&this.setComponentProjectById(t.id,t,!1),this.main.buildProject(!0))}t.preventDefault()})),this.tagField.addEventListener("input",(t=>{const e=this.getComponentSelected(),o=t.target;if(e){const t=r.findComponentById(this.projectHistory.current_project,e.getComponentId());t&&r.isValidTagName(o.value)&&(t.tag=o.value,t.id&&this.setComponentProjectById(t.id,t,!1),this.main.buildProject(!0))}})),this.textField.addEventListener("input",(t=>{const e=this.getComponentSelected(),o=t.target;if(e){const t=r.findComponentById(this.projectHistory.current_project,e.getComponentId());t&&(t.content=o.value,t.id&&this.setComponentProjectById(t.id,t,!1),this.main.buildProject(!0))}}))}getNextBrotherComponent(t){if(!t.id)return;const e=this.getPreviousComponent(t.id);if(!e)return;if(!Array.isArray(e.content))return;const o=e.content.findIndex((e=>e.id===t.id));return o>=0&&o+1<e.content.length?e.content[o+1]:void 0}getPrevBrotherComponent(t){if(!t.id)return;const e=this.getPreviousComponent(t.id);if(!e)return;if(!Array.isArray(e.content))return;const o=e.content.findIndex((e=>e.id===t.id));return o>0&&o<e.content.length?e.content[o-1]:void 0}toPrevComponent(t=this.getComponentSelected()){if(!t)return;const e=r.findComponentById(this.projectHistory.current_project,t.getComponentId());if(!e||!e.id)return;const o=this.getPrevBrotherComponent(e);if(o&&o.id){const t=r.getElementByComponent(o);return void(t&&this.onSelectComponente(t))}const i=this.getPreviousComponent(e.id);if(i&&i.id){const t=r.getElementByComponent(i);t&&this.onSelectComponente(t)}}toInnerComponent(t=this.getComponentSelected()){if(!t)return;const e=r.findComponentById(this.projectHistory.current_project,t.getComponentId());if(e&&Array.isArray(e.content)&&e.content.length>0){const t=e.content[0];if(t&&t.id){const e=r.getElementByComponent(t);return void(e&&this.onSelectComponente(e))}}}toNextComponent(t=this.getComponentSelected()){if(!t){const t=r.findComponentById(this.projectHistory.current_project,"body");if(!t||!t.id)return;const e=r.getElementByComponent(t);if(!e)return;return void this.onSelectComponente(e)}const e=r.findComponentById(this.projectHistory.current_project,t.getComponentId());if(!e)return;const o=this.getNextBrotherComponent(e);if(o&&o.id){const t=r.getElementByComponent(o);if(t)return void this.onSelectComponente(t)}if(Array.isArray(e.content)&&e.content.length>0){const t=e.content[0];if(t&&t.id){const e=r.getElementByComponent(t);return void(e&&this.onSelectComponente(e))}}}setComponentProjectInSelectedComponent(t){const e=this.getComponentSelected();if(!e)return;const o=r.findComponentById(this.projectHistory.current_project,e.getComponentId());if(!o||!o.id)return;Array.isArray(o.content)||(o.content=[]);const i=JSON.parse(JSON.stringify(t));i.id=r.generateSlug(),o.content.push(i),this.setComponentProjectById(o.id,o,!1),this.main.buildProject(!0)}removeSelectedComponent(){const t=this.getComponentSelected();if(!t)return;const e=r.findComponentById(this.projectHistory.current_project,t.getComponentId());if(!e||!e.id)return;const o=this.getPreviousComponent(e.id);Array.isArray(null==o?void 0:o.content)&&(o.content=o.content.filter((t=>t.id!==e.id))),o&&o.id&&(this.setComponentProjectById(o.id,o,!1),this.main.buildProject(!0))}setComponentProjectById(t,e,o=!0,i=this.projectHistory.current_project,n=(t,e)=>{this.projectHistory.updateText(t,e)},s=!0){if(i){if(i.id===t&&n(e,o),Array.isArray(i.content))for(let n=0;n<i.content.length;n++)this.setComponentProjectById(t,e,o,i.content[n],(t=>{Array.isArray(i.content)&&(i.content[n]=t)}),!1);s&&this.projectHistory.updateText(i,o)}}removeProprety(t){const e=this.getComponentSelected();if(!e)return;const o=r.findComponentById(this.projectHistory.current_project,e.getComponentId());o&&(o.props=o.props.filter((e=>e.id!==t)),o.styles=o.styles.filter((e=>e.id!==t)),this.setComponentProjectById(o.id,o))}setPropertyInSelectedComponent(t,e,o,i){var n;const s=this.getComponentSelected();if(!s)return;const c=r.findComponentById(this.projectHistory.current_project,s.getComponentId());if(!c||!c.id)return;const a=c.props;if("HTML"===i){let i=a.find((e=>e.id===t))||{name:"",value:"",id:t};"name"===e&&(i.name&&s.removeAttribute(i.name),i.name=o),"value"===e&&(i.value=o),a.includes(i)||a.push(i)}if("CSS"===i){const i=r.getProp(a,"style"),s=r.stringToProps(null!==(n=null==i?void 0:i.value)&&void 0!==n?n:""),l=c.styles;for(const t of s)l.push(t);let d=l.find((e=>e.id===t))||{name:"",value:"auto",id:t};"name"===e&&(d.name=o),"value"===e&&(d.value=o),l.includes(d)||l.push(d);let h=r.propsTosStringCss(l);h=r.cssSanitize(h)}this.setComponentProjectById(c.id,c,!1),this.main.buildProject(!0,!1)}cleanAllSelectables(t=!0){const e=document.querySelectorAll(`[${a.RENDER_LABEL}selectable]`);e&&e.forEach((t=>{t.setAttribute(`${a.RENDER_LABEL}selected`,"false");const e=r.findComponentById(this.projectHistory.current_project,t.getComponentId());e&&(e.selected=!1,e.id&&this.setComponentProjectById(e.id,e,!1))})),t&&(this.propListHtml&&(this.propListHtml.innerHTML=""),this.propListCSS&&(this.propListCSS.innerHTML=""),this.nameField.value="",this.tagField.value="",this.textField.value="")}onSelectComponente(t,e=!0){if(!t)return;if("SELECTION"!==this.actions.EDIT_MODE)return;this.cleanAllSelectables(e),t.setAttribute(`${a.RENDER_LABEL}selected`,"true");const o=r.findComponentById(this.projectHistory.current_project,t.getComponentId());if(o){if(o.selected=!0,this.nameField.value=o.name,this.tagField.value=o.tag,"string"==typeof o.content&&(this.textField.value=o.content),e){for(const t of o.props)t.name.toLowerCase().startsWith(a.RENDER_LABEL.toLowerCase())||"style"===t.name||this.actions.addNewProp("HTML",t);const t=o.styles.filter((t=>!("body"===o.id&&["left","top","position"].includes(t.name))));for(const e of t)this.actions.addNewProp("CSS",e)}o.id&&this.setComponentProjectById(o.id,o,!1)}}getComponentSelected(){return document.querySelector(`[${a.RENDER_LABEL}selected="true"]`)}}const m=new class{constructor(){this.FOCUS="DRAW",this.translations=new l("pt_br"),this.mainProjectManager=new u(this),this.controls=new s(this,this.mainProjectManager,this.mainProjectManager.actions,this.mainProjectManager.bihavior,this.mainProjectManager.projectHistory),this.projectHistory=this.mainProjectManager.projectHistory,this.actions=this.mainProjectManager.actions}initNewProject(){this.projectHistory.updateText(a.base_json_template)}loadOnclickEvents(){const t=document.querySelectorAll(`[${a.RENDER_LABEL}selectable]`);t&&t.forEach((t=>{t.onclick=t=>{const e=t.target;this.mainProjectManager.onSelectComponente(e),t.stopPropagation()}}))}buildBodyRenderMode(t){var e;const o=JSON.parse(JSON.stringify(a.base_view_body)),i=null!==(e=t.position)&&void 0!==e?e:o.position;return i&&(o.styles.push({name:"left",value:`${i.x}px`,id:r.generateSlug()}),o.styles.push({name:"top",value:`${i.y}px`,id:r.generateSlug()})),o.props=t.props.concat(o.props),o.props.push({name:`${a.RENDER_LABEL}body`,value:"",id:r.generateSlug()}),o.styles=t.props.concat(o.styles),o.content=t.content,o}generateTag(t,e,o=!0){var i;const n=t.tag;let s=[...t.props];return e?(s=s.map((t=>("class"===t.name&&(t.value=t.value.split(" ").map((t=>t.startsWith(a.RENDER_LABEL)?t:`${a.RENDER_LABEL}${t}`)).join(" ")),t))),s.push({name:`${a.RENDER_LABEL}selectable`,value:""}),s.push({name:`${a.RENDER_LABEL}selected`,value:String(t.selected)}),s.push({name:`${a.RENDER_LABEL}id`,value:null!==(i=t.id)&&void 0!==i?i:""})):s=s.filter((t=>!t.name.startsWith(a.RENDER_LABEL))),t.styles=t.styles.map((t=>(t.id||(t.id=r.generateSlug()),t))),t.id&&this.mainProjectManager.setComponentProjectById(t.id,t,!1),s.push({name:"style",value:r.propsTosStringCss(t.styles),id:r.generateSlug()}),`<${n} ${r.propsTosString(s)}>${t.content?Array.isArray(t.content)?t.content.map((t=>this.buildTag(t,e,o))).join("\n"):t.content:""}</${n}>`}buildTag(t,e=!1,o=!0){if("string"==typeof t)return t;let i=t;return e&&"body"===i.tag&&(i=this.buildBodyRenderMode(i)),i.id&&this.mainProjectManager.setComponentProjectById(i.id,i,o),this.generateTag(i,e,o)}buildItemTheeWithComponent(t,e){const o=e.cloneNode();if(o.removeAttribute("id"),o.setAttribute("pab_project__visible","true"),Array.isArray(t.content)&&t.content.length>0)for(const i of t.content){const t=o.querySelector(".content");t&&t.appendChild(this.buildItemTheeWithComponent(i,e))}return o}buildProject(t=!1,e=!0,o=!0){let i="";if(this.projectHistory.current_project)if(t){const t=document.getElementById("project_draw");i+=this.buildTag(this.projectHistory.current_project.content[1],!0,o),t.innerHTML=i,this.loadOnclickEvents(),this.mainProjectManager.onSelectComponente(this.mainProjectManager.getComponentSelected(),e)}else i="<!DOCTYPE html>",i+=this.buildTag(this.projectHistory.current_project,!1,o);return i}exportProject(){this.initNewProject();const t=new Blob([this.buildProject()],{type:"text/html"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download="index.html",e.click(),URL.revokeObjectURL(e.href)}};m.initNewProject(),m.buildProject(!0),window.main=m})();
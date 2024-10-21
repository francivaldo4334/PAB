(()=>{"use strict";const t=class{constructor(){this.past=[],this.future=[]}updateText(t){this.current_project&&this.past.push(this.current_project),this.current_project=t,this.future=[]}undo(){this.past.length>0&&(this.current_project&&this.future.push(this.current_project),this.current_project=this.past.pop())}redo(){this.future.length>0&&(this.current_project&&this.past.push(this.current_project),this.current_project=this.future.pop())}},e=class{constructor(t,e){this.isSelecting=!1,this.selectionBox=document.getElementById("selection_box"),this.selectionBoxX=0,this.selectionBoxY=0,this.controls=t,this.move=e}initSelectionBox(){this.selectionBox&&(this.isSelecting=!0,this.selectionBoxX=this.move.calcPositionCursorX(this.controls.M_INIT_X),this.selectionBoxY=this.move.calcPositionCursorY(this.controls.M_INIT_Y),this.selectionBox.style.left=`${this.selectionBoxX}`,this.selectionBox.style.top=`${this.selectionBoxY}`,this.selectionBox.style.width="0px",this.selectionBox.style.height="0px",this.selectionBox.style.display="block")}updateSelectionBox(){if(this.selectionBox&&this.isSelecting){const t=this.move.calcPositionCursorX(this.controls.M_X),e=this.move.calcPositionCursorY(this.controls.M_Y),o=Math.abs(t-this.selectionBoxX),i=Math.abs(e-this.selectionBoxY),n=Math.min(t,this.selectionBoxX),s=Math.min(e,this.selectionBoxY);this.selectionBox.style.left=`${n}px`,this.selectionBox.style.top=`${s}px`,this.selectionBox.style.width=`${o}px`,this.selectionBox.style.height=`${i}px`}}finishSelectionBox(){this.isSelecting&&!this.controls.M_BUTTON_LEFT&&this.selectionBox&&(this.selectionBox.style.display="none",this.isSelecting=!1)}},o=class{constructor(t,e){this.drawPosition=document.getElementById("project_draw_position"),this.drawRect=document.getElementById("project_draw_rect"),this.controls=t,this.projectHistory=e}setPositionDraw(t,e){this.drawPosition&&(this.drawPosition.style.transform=`translate(${t}px, ${e}px)`)}setPosition(t,e){this.setPositionDraw(t,e),this.setPositionProject(t,e)}getPositionDrawX(){var t;const e=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return e?e.left:0}getPositionDrawY(){var t;const e=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return e?e.top:0}getPositionDrawPoint(){var t,e,o;const i=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return{x:null!==(e=null==i?void 0:i.left)&&void 0!==e?e:0,y:null!==(o=null==i?void 0:i.top)&&void 0!==o?o:0}}getPositionDrawPointXY(){var t,e,o;const i=null===(t=this.drawPosition)||void 0===t?void 0:t.getBoundingClientRect();return{x:null!==(e=null==i?void 0:i.x)&&void 0!==e?e:0,y:null!==(o=null==i?void 0:i.y)&&void 0!==o?o:0}}getPositionProjectPoint(){var t,e;return null!==(e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.position)&&void 0!==e?e:{x:0,y:0}}setPositionProject(t,e){var o;const i=null===(o=this.projectHistory.current_project)||void 0===o?void 0:o.position;i&&(i.x=t,i.y=e)}calcPositionCursorX(t){var e,o;const i=null===(e=this.drawPosition)||void 0===e?void 0:e.getBoundingClientRect();return t-(null!==(o=null==i?void 0:i.left)&&void 0!==o?o:0)}calcPositionCursorY(t){var e,o;const i=null===(e=this.drawPosition)||void 0===e?void 0:e.getBoundingClientRect();return t-(null!==(o=null==i?void 0:i.top)&&void 0!==o?o:0)}moveProject(t){var e;const o=null===(e=this.drawRect)||void 0===e?void 0:e.getBoundingClientRect(),i=o&&t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom;if(this.controls.M_BUTTON_LEFT&&i){const t=this.getPositionProjectPoint();this.setPositionDraw(t.x+this.controls.M_DELTA_X,t.y+this.controls.M_DELTA_Y)}}moveProjectOnOneDirection(t){var e;const o="UP"===this.controls.SCROLL_STATE?this.controls.JUMP_SCROLL_MOVE:-this.controls.JUMP_SCROLL_MOVE,i=null===(e=this.projectHistory.current_project)||void 0===e?void 0:e.position;i&&(t.shiftKey?this.setPosition(i.x+o,i.y):this.setPosition(i.x,i.y+o))}initMove(){}finishMove(){var t;const e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.position;e&&this.setPositionProject(e.x+this.controls.M_DELTA_X,e.y+this.controls.M_DELTA_Y)}},i=class{constructor(t){this.body=document.querySelector("body"),this.selectionBox=t.selectionBox,this.actions=t.actions,this.zoom=t.zoom,this.move=t.move,this.bihavior=t.bihavior}onSelectionModeActionsKeyDown(t){t.shiftKey&&this.body&&this.body.setAttribute("selected","move-h")," "!==t.key||this.selectionBox.isSelecting||(this.actions.setMoveMode(),this.move.initMove()),t.ctrlKey&&!this.selectionBox.isSelecting&&(this.actions.setZoomMode(),this.zoom.initZoomMode()),"Tab"===t.key&&(t.shiftKey?this.actions.toPrevComponent():this.actions.toNextComponent(),t.preventDefault()),"Enter"===t.key&&this.actions.toInnerComponent()}onActionsKeyUp(t){"ZOOM"===this.actions.EDIT_MODE&&this.zoom.finishZoomMode(),this.bihavior.decelAllElement(),this.actions.setSelectionMode(),t.preventDefault()}},n=class{constructor(t,e){this.MIN_ZOOM=.1,this.MAX_ZOOM=3,this.NORMAL_SCALE=1,this.point={x:0,y:0},this.elPoint={x:0,y:0},this.deltaPoint={x:0,y:0},this.controls=t,this.projectHistory=e,this.draw=document.getElementById("project_draw")}initZoomMode(){}finishZoomMode(){}updateZoomState(){const{move:t}=this.controls,e="UP"===this.controls.SCROLL_STATE?this.controls.SCALE_JUMP:-this.controls.SCALE_JUMP,o=this.getScale()+e;this.setScale(o)}setScaleDraw(t){this.draw&&t<=this.MAX_ZOOM&&t>=this.MIN_ZOOM&&(this.draw.style.transform=`scale(${t})`)}setScaleProject(t){this.projectHistory.current_project&&t<=this.MAX_ZOOM&&t>=this.MIN_ZOOM&&(this.projectHistory.current_project.zoom=t)}setScale(t){this.setScaleDraw(t),this.setScaleProject(t)}getScale(){var t,e;return null!==(e=null===(t=this.projectHistory.current_project)||void 0===t?void 0:t.zoom)&&void 0!==e?e:this.NORMAL_SCALE}},s=class{constructor(t){this.W_WIDTH=window.innerWidth,this.W_HEIGHT=window.innerHeight,this.JUMP_SCROLL_MOVE=50,this.M_X=0,this.M_Y=0,this.M_INIT_X=0,this.M_INIT_Y=0,this.M_DELTA_X=0,this.M_DELTA_Y=0,this.M_BUTTON_LEFT=!1,this.M_BUTTON_MIDDLE=!1,this.M_BUTTON_RIGHT=!1,this.FOCUS="DRAW",this.SCROLL_STATE="STOP",this.SCALE_JUMP=.1,this.isScrolling=0,this.drawRect=document.getElementById("project_draw_rect"),this.main=t,this.actions=t.actions,this.move=new o(this,t.projectHistory),this.zoom=new n(this,t.projectHistory),this.selectionBox=new e(this,this.move),this.bihavior=t.bihavior,this.modes=new i(this),this.addEventListeners()}addEventListeners(){var t,e;window.addEventListener("keydown",this.handleKeyDown.bind(this)),window.addEventListener("keyup",this.handleKeyUp.bind(this)),window.addEventListener("mousemove",this.handleMouseMove.bind(this)),window.addEventListener("wheel",this.handleScroll.bind(this),{passive:!1}),window.addEventListener("mouseup",this.handleMouseUp.bind(this)),null===(t=this.drawRect)||void 0===t||t.addEventListener("mousedown",this.handleMouseDown.bind(this)),window.addEventListener("contextmenu",(t=>t.preventDefault())),null===(e=this.drawRect)||void 0===e||e.addEventListener("click",this.handleClick.bind(this))}handleClick(t){this.main.cleanAllSelectables()}handleKeyDown(t){t.altKey&&"1"===t.key&&(this.actions.toggleWithDrawAndPropsFocus(),t.preventDefault()),"SELECTION"===this.actions.EDIT_MODE&&("PROPS"===this.FOCUS||"DRAW"===this.FOCUS&&this.modes.onSelectionModeActionsKeyDown(t))}handleKeyUp(t){this.modes.onActionsKeyUp(t)}handleMouseMove(t){switch(this.M_X=t.clientX,this.M_Y=t.clientY,this.M_DELTA_X=this.M_X-this.M_INIT_X,this.M_DELTA_Y=this.M_Y-this.M_INIT_Y,this.actions.EDIT_MODE){case"SELECTION":this.selectionBox.updateSelectionBox();break;case"MOVE":this.move.moveProject(t)}}handleScroll(t){switch(this.SCROLL_STATE=t.deltaY<0?"UP":"DOWN",clearTimeout(this.isScrolling),this.isScrolling=setTimeout((()=>{this.SCROLL_STATE="STOP"}),300),this.actions.EDIT_MODE){case"SELECTION":this.move.moveProjectOnOneDirection(t),this.selectionBox.updateSelectionBox();break;case"ZOOM":this.zoom.updateZoomState()}t.preventDefault()}handleMouseUp(t){switch(this.updateMouseButtons(t,!1),this.actions.EDIT_MODE){case"SELECTION":this.selectionBox.finishSelectionBox();break;case"MOVE":this.move.finishMove()}this.resetMousePosition()}handleMouseDown(t){this.updateMouseButtons(t,!0),this.M_INIT_X=t.clientX,this.M_INIT_Y=t.clientY,"SELECTION"===this.actions.EDIT_MODE&&this.M_BUTTON_LEFT&&0===t.button&&(this.selectionBox.initSelectionBox(),t.preventDefault())}updateMouseButtons(t,e){0===t.button?this.M_BUTTON_LEFT=e:1===t.button?this.M_BUTTON_MIDDLE=e:2===t.button&&(this.M_BUTTON_RIGHT=e)}resetMousePosition(){this.M_INIT_X=0,this.M_INIT_Y=0,this.M_DELTA_X=0,this.M_DELTA_Y=0}},r=class{constructor(t){this.EDIT_MODE="SELECTION",this.projectDrawScope=document.getElementById("project_draw_rect"),this.bihavior=t}toggleWithDrawAndPropsFocus(){"DRAW"===this.bihavior.main.controls.FOCUS?this.bihavior.main.controls.FOCUS="PROPS":this.bihavior.main.controls.FOCUS="DRAW"}openMenuFile(){console.log("TODO")}openRecentProjects(){console.log("TODO")}openMenuNewElement(){const t=document.getElementById("menu_new_element");t&&(this.bihavior.selectElement(t),this.bihavior.toggleIsOpen(t))}closeMenuNewElement(){const t=document.getElementById("menu_new_element");t&&(this.bihavior.decelElement(t),t.setAttribute("is_open","false"))}toPrevComponent(){this.bihavior.main.toPrevComponent()}toNextComponent(){this.bihavior.main.toNextComponent()}toInnerComponent(){this.bihavior.main.toInnerComponent()}addNewElement(t){switch(t){case"OVAL":this.bihavior.main.setComponentProjectInSelectedComponent(this.bihavior.main.common.oval_json_template),this.bihavior.main.buildProject(!0);break;case"RECT":this.bihavior.main.setComponentProjectInSelectedComponent(this.bihavior.main.common.rect_json_template),this.bihavior.main.buildProject(!0);break;case"TEXT":this.bihavior.main.setComponentProjectInSelectedComponent(this.bihavior.main.common.text_json_template),this.bihavior.main.buildProject(!0);break;case"FRAME":case"IMAGE":console.log("TODO")}this.closeMenuNewElement()}setSelectionMode(){const t=document.getElementById("btn_selection_mode");t&&(this.bihavior.selectElement(t),this.EDIT_MODE="SELECTION")}setMoveMode(){const t=document.getElementById("btn_move_mode");t&&this.projectDrawScope&&(this.bihavior.selectElement(t),this.EDIT_MODE="MOVE",this.projectDrawScope.setAttribute("selected","move"))}setZoomMode(){const t=document.getElementById("btn_zoom_mode");t&&this.projectDrawScope&&(this.bihavior.selectElement(t),this.EDIT_MODE="ZOOM",this.projectDrawScope.setAttribute("selected","zoom"))}openMenuPlugins(){const t=document.getElementById("btn_plugin");t&&this.bihavior.selectElement(t)}openFolder(t){console.log("TODO")}setEditMode(t){switch(t){case"DESIGN":case"PROTOTYPE":console.log("TODO")}}addNewProp(t,e){switch(t){case"HTML":this.bihavior.addPropertieHTML(e);break;case"CSS":this.bihavior.addPropertieCSS(e)}}removePropretie(t){const e=document.getElementById(t);e&&this.bihavior.removeUiPropretie(e)}},c=class{constructor(t,e){this.currentKeybind=[],this.newElement={action:()=>{this.actions.openMenuNewElement()},o:{action:()=>{this.actions.addNewElement("OVAL")}},r:{action:()=>{this.actions.addNewElement("RECT")}},t:{action:()=>{this.actions.addNewElement("TEXT")}}},this.keymaps={Control:{n:Object.assign({mode:!0},this.newElement)},Insert:Object.assign({mode:!0},this.newElement)},this.keydown={},this.actions=t,this.bihavior=e,this.addEventListener()}isKeybind(t){return void 0===t.action||"function"==typeof t.action&&void 0===t.mode||"boolean"==typeof t.mode}isRecordOfObject(t){return"object"==typeof t&&null!==t&&!Array.isArray(t)}checkKeybind(t,e,o=""){if(t.action&&"function"==typeof t.action&&(t.action(),e.preventDefault()),t.mode&&this.currentKeybind.push(o),this.isRecordOfObject(t))for(const o in t)this.keydown[o]&&this.checkKeybind(t[o],e,o)}keyMode(t,e,o){let i=!1;if(this.isKeybind(t)&&(t.action&&"function"==typeof t.action&&(t.action(),i=!0),t.mode&&this.currentKeybind.push(o)),e<this.currentKeybind.length){const i=this.currentKeybind[e];this.isRecordOfObject(t[i])&&this.keyMode(t[i],e+1,o)}i&&(this.currentKeybind=[])}addEventListener(){window.addEventListener("keydown",(t=>{this.keydown[t.key]=!0})),window.addEventListener("keyup",(t=>{this.keydown[t.key]=!1})),window.addEventListener("keydown",(t=>{"F5"!==t.key&&(this.currentKeybind.length>0?this.keyMode(this.keymaps,0,t.key):this.checkKeybind(this.keymaps,t),"Escape"===t.key&&(this.actions.closeMenuNewElement(),this.bihavior.closePopovers(),this.currentKeybind=[]))}))}},l=class{constructor(t){this.main=t,document.addEventListener("click",(e=>{const o=document.querySelector(".popover");o&&e.target instanceof Node&&!o.contains(e.target)&&(t.actions.closeMenuNewElement(),this.closePopovers())}))}tryGenerateSlug(){return"pab__id__xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=16*Math.random()|0;return("x"===t?e:3&e|8).toString(16)}))}generateSlug(){let t=this.tryGenerateSlug();for(;this.main.getElementByComponentId(t);)t=this.tryGenerateSlug();return t}toggleIsOpen(t){const e="is_open";"true"===t.getAttribute(e)?t.setAttribute(e,"false"):t.setAttribute(e,"true")}selectElement(t){this.decelAllElement(),t.setAttribute("selected","true")}decelAllElement(){const t=Array.from(document.querySelectorAll(".selection"));for(const e of t)this.decelElement(e)}decelElement(t){t.setAttribute("selected","false")}newPropertie(t){var e,o;const i=null===(e=document.getElementById("item_prop_template"))||void 0===e?void 0:e.cloneNode(!0);return i&&(i.removeAttribute("visible"),i.setAttribute("id",null!==(o=null==t?void 0:t.id)&&void 0!==o?o:this.generateSlug())),i}loadPropertieInput(t,e,o){const i=t.querySelector(".prop_input_name input"),n=t.querySelector(".prop_input_value input");null==i||i.addEventListener("input",(i=>{var n;const s=i.target;this.main.setPropertyInSelectedComponent(null!==(n=null==o?void 0:o.id)&&void 0!==n?n:t.id,"name",s.value,e)})),null==n||n.addEventListener("input",(i=>{var n;const s=i.target;this.main.setPropertyInSelectedComponent(null!==(n=null==o?void 0:o.id)&&void 0!==n?n:t.id,"value",s.value,e)})),o&&(i.value=o.name,n.value=o.value)}addPropertieHTML(t){var e;const o=t?Object.assign(Object.assign({},t),{id:null!==(e=t.id)&&void 0!==e?e:this.generateSlug()}):void 0,i=document.getElementById("list_props_html"),n=this.newPropertie(o);n&&(null==i||i.appendChild(n),this.loadPropertieInput(n,"HTML",o))}addPropertieCSS(t){var e;const o=t?Object.assign(Object.assign({},t),{id:null!==(e=t.id)&&void 0!==e?e:this.generateSlug()}):void 0,i=document.getElementById("list_props_css"),n=this.newPropertie(o);n&&(null==i||i.appendChild(n),this.loadPropertieInput(n,"CSS",o))}removeProprety(t){this.main.removeProprety(t)}removeUiPropretie(t){t&&(this.removeProprety(t.id),t.remove(),this.main.buildProject(!0))}closePopovers(){const t=document.querySelector(".popover");t&&t.setAttribute("is_open","false")}};class a{constructor(){this.translations={en:{project_name:"Project Name",user_name:"Username",html:"Html",css:"Css",javascript:"javascript",assets:"Assets",design:"Design",prototype:"Prototype"},pt_br:{project_name:"Nome do Projeto",user_name:"Nome de usuário",html:"Html",css:"Css",javascript:"javascript",assets:"Assets",design:"Design",prototype:"Prototipo"}},this.base_view_body={id:"body",name:"body",is_view:!0,tag:"div",template:"",position:{x:-250,y:-250},props:[],styles:[{name:"width",value:"500px"},{name:"height",value:"500px"},{name:"background",value:"#fff"},{name:"position",value:"absolute"}],content:[]},this.base_json_template={id:"html",name:"",is_view:!1,tag:"html",template:"",position:{x:0,y:0},zoom:1,props:[{name:"lang",value:"pt-BR"}],styles:[],content:[{id:"head",name:"",is_view:!1,tag:"head",template:"",props:[],styles:[],content:[{name:"",is_view:!1,tag:"meta",template:"",props:[{name:"charset",value:"UTF-8"}],styles:[],content:[]},{name:"",is_view:!1,tag:"meta",template:"",props:[{name:"name",value:"viewport"},{name:"content",value:"width=device-width, initial-scale=1.0"}],styles:[],content:[]},{name:"",is_view:!1,tag:"title",template:"",props:[],styles:[],content:"My Site"}]},{name:"",is_view:!0,tag:"body",id:"body",template:"",props:[],styles:[],content:[{name:"",is_view:!0,id:"teste_h1",tag:"h1",template:"",props:[],styles:[{name:"color",value:"red"}],content:"Teste"}]}]},this.text_json_template={name:"text",is_view:!0,tag:"h4",template:"",props:[],styles:[{name:"color",value:"black"}],content:"Text"},this.rect_json_template={name:"rect",is_view:!0,tag:"div",template:"",props:[],styles:[{name:"width",value:"100px"},{name:"height",value:"100px"},{name:"background",value:"white"}],content:[]},this.oval_json_template={name:"oval",is_view:!0,tag:"div",template:"",props:[],styles:[{name:"width",value:"100px"},{name:"height",value:"100px"},{name:"border-radius",value:"50%"},{name:"background",value:"white"}],content:[]}}}const h=class{constructor(t,e){this.translations=t.translations,this.setLanguage(e)}setLanguage(t){const e=Array.from(document.querySelectorAll("[data-translate]"));if(e)for(const o of e){const e=o.getAttribute("data-translate");e&&this.translations[t][e]&&(o.textContent=this.translations[t][e])}}},d=new class{constructor(){this.propListHtml=document.getElementById("list_props_html"),this.propListCSS=document.getElementById("list_props_css"),this.RENDER_LABEL="BAB_project__",this.common=new a,this.bihavior=new l(this),this.actions=new r(this.bihavior),this.keybinds=new c(this.actions,this.bihavior),this.projectHistory=new t,this.controls=new s(this),this.translations=new h(this.common,"pt_br"),this.updateNameAndTagOfSelectedComponent()}getElementByComponentId(t){return document.querySelector(`[${this.RENDER_LABEL}id=${t}]`)}getPreviousComponent(t,e=void 0){if(!e)return this.getPreviousComponent(t,this.projectHistory.current_project);if(Array.isArray(e.content))for(const o of e.content){if(o.id===t)return e;const i=this.getPreviousComponent(t,o);if(i)return i}}updateNameAndTagOfSelectedComponent(){const t=this.getComponentNameInput(),e=this.getComponentTagInput();t.addEventListener("input",(t=>{var e;const o=this.getComponentSelected(),i=t.target;if(o){const t=this.getComponentProjectById(null!==(e=o.getAttribute(`${this.RENDER_LABEL}id`))&&void 0!==e?e:"");t&&(t.name=i.value,this.buildProject(!0))}})),e.addEventListener("input",(t=>{var e;const o=this.getComponentSelected(),i=t.target;if(o){const t=this.getComponentProjectById(null!==(e=o.getAttribute(`${this.RENDER_LABEL}id`))&&void 0!==e?e:"");t&&(t.tag=i.value,this.buildProject(!0))}}))}getNextBrotherComponent(t){if(!t.id)return;const e=this.getPreviousComponent(t.id);if(!e)return;if(!Array.isArray(e.content))return;const o=e.content.findIndex((e=>e.id===t.id));return o>=0&&o+1<e.content.length?e.content[o+1]:void 0}getComponentNameInput(){return document.querySelector("#comp_name input")}getComponentTagInput(){return document.querySelector("#comp_tag input")}getPrevBrotherComponent(t){if(!t.id)return;const e=this.getPreviousComponent(t.id);if(!e)return;if(!Array.isArray(e.content))return;const o=e.content.findIndex((e=>e.id===t.id));return o>0&&o<e.content.length?e.content[o-1]:void 0}toPrevComponent(t=this.getComponentSelected()){if(!t)return;const e=this.getComponentProjectById(this.getComponentId(t));if(!e||!e.id)return;const o=this.getPrevBrotherComponent(e);if(o&&o.id){const t=this.getElementByComponentId(o.id);return void(t&&this.onSelectComponente(t))}const i=this.getPreviousComponent(e.id);if(i&&i.id){const t=this.getElementByComponentId(i.id);t&&this.onSelectComponente(t)}}toInnerComponent(t=this.getComponentSelected()){if(!t)return;const e=this.getComponentProjectById(this.getComponentId(t));if(e&&Array.isArray(e.content)&&e.content.length>0){const t=e.content[0];if(t&&t.id){const e=this.getElementByComponentId(t.id);return void(e&&this.onSelectComponente(e))}}}toNextComponent(t=this.getComponentSelected()){if(!t){const t=this.getComponentProjectById("body");if(!t||!t.id)return;const e=this.getElementByComponentId(t.id);if(!e)return;return void this.onSelectComponente(e)}const e=this.getComponentProjectById(this.getComponentId(t));if(!e)return;const o=this.getNextBrotherComponent(e);if(o&&o.id){const t=this.getElementByComponentId(o.id);if(t)return void this.onSelectComponente(t)}if(Array.isArray(e.content)&&e.content.length>0){const t=e.content[0];if(t&&t.id){const e=this.getElementByComponentId(t.id);return void(e&&this.onSelectComponente(e))}}}getComponentProjectById(t,e){if(!e)return this.getComponentProjectById(t,this.projectHistory.current_project);if(e.id===t)return e;if(Array.isArray(e.content))for(const o of e.content){const e=this.getComponentProjectById(t,o);if(e)return e}}getComponentId(t){var e;return null!==(e=t.getAttribute(`${this.RENDER_LABEL}id`))&&void 0!==e?e:""}setComponentProjectInSelectedComponent(t){const e=this.getComponentSelected();if(!e)return;const o=this.getComponentProjectById(this.getComponentId(e));if(o&&Array.isArray(o.content)){const e=JSON.parse(JSON.stringify(t));return e.id=this.bihavior.generateSlug(),void o.content.push(e)}}setComponentProjectById(t,e,o=this.projectHistory.current_project,i=t=>{this.projectHistory.updateText(t)}){if(o&&(o.id===t&&i(e),Array.isArray(o.content)))for(let i=0;i<o.content.length;i++)this.setComponentProjectById(t,e,o.content[i],(t=>{Array.isArray(o.content)&&(o.content[i]=t)}))}removeProprety(t){var e;const o=this.getComponentSelected();if(!o)return;const i=this.getComponentProjectById(null!==(e=o.getAttribute(`${this.RENDER_LABEL}id`))&&void 0!==e?e:"");i&&(i.props=i.props.filter((e=>e.id!==t)),i.styles=i.styles.filter((e=>e.id!==t)))}cssSanitize(t){const e=document.createElement("div"),o=t.split(";").filter((t=>""!==t.trim())),i=[];for(let t of o){const[o,n]=t.split(":").map((t=>t.trim()));if(o&&n){const t=e.style.getPropertyValue(o);e.style.setProperty(o,null!=n?n:"auto"),""!==e.style.getPropertyValue(o)&&i.push(`${o}: ${n}`),e.style.setProperty(o,t)}}return i.join("; ")}setPropertyInSelectedComponent(t,e,o,i){var n;const s=this.getComponentSelected();if(!s)return;const r=this.getComponentProjectById(this.getComponentId(s));if(!r)return;const c=r.props;if("HTML"===i){let i=c.find((e=>e.id===t))||{name:"",value:"",id:t};"name"===e&&(i.name&&s.removeAttribute(i.name),i.name=o),"value"===e&&(i.value=o),c.includes(i)||c.push(i),s.setAttribute(i.name,i.value)}if("CSS"===i){const i=this.getProp(c,"style"),l=this.stringToProps(null!==(n=null==i?void 0:i.value)&&void 0!==n?n:""),a=r.styles;for(const t of l)a.push(t);let h=a.find((e=>e.id===t))||{name:"",value:"auto",id:t};"name"===e&&(h.name=o),"value"===e&&(h.value=o),a.includes(h)||a.push(h);let d=this.propsTosStringCss(a);d=this.cssSanitize(d),s.setAttribute("style",d)}}initNewProject(){this.projectHistory.updateText(this.common.base_json_template)}cleanAllSelectables(){const t=document.querySelectorAll(`[${this.RENDER_LABEL}selectable]`);t&&t.forEach((t=>{t.setAttribute(`${this.RENDER_LABEL}selected`,"false");const e=this.getComponentProjectById(this.getComponentId(t));e&&(e.selected=!1)})),this.propListHtml&&(this.propListHtml.innerHTML=""),this.propListCSS&&(this.propListCSS.innerHTML="");const e=this.getComponentNameInput(),o=this.getComponentTagInput();e.value="",o.value=""}onSelectComponente(t){var e;if("SELECTION"!==this.actions.EDIT_MODE)return;this.cleanAllSelectables(),t.setAttribute(`${this.RENDER_LABEL}selected`,"true");const o=this.getComponentNameInput(),i=this.getComponentTagInput(),n=this.getComponentProjectById(null!==(e=t.getAttribute(`${this.RENDER_LABEL}id`))&&void 0!==e?e:"");if(n){n.selected=!0,o.value=n.name,i.value=n.tag;for(const t of n.props)t.name.toLowerCase().startsWith(this.RENDER_LABEL.toLowerCase())||"style"===t.name||this.actions.addNewProp("HTML",t);for(const t of n.styles)this.actions.addNewProp("CSS",t)}}loadOnclickEvents(){const t=document.querySelectorAll(`[${this.RENDER_LABEL}selectable]`);t&&t.forEach((t=>{t.onclick=t=>{const e=t.target;this.onSelectComponente(e),t.stopPropagation()}}))}updateCssProp(t,e,o){const i=new RegExp(`${e}:\\s*[^;]+;`,"g"),n=`${e}: ${o};`;return i.test(t)?t.replace(i,n):`${t} ${n}`}stringToProps(t){return t.split(";").map((t=>t.trim())).filter((t=>t)).map((t=>{const[e,o]=t.split(":").map((t=>t.trim()));return{name:e,value:o}}))}getProp(t,e){return t.find((t=>t.name===e))}addProp(t,e){var o;let i=!1;const n=Object.assign(Object.assign({},e),{id:null!==(o=e.id)&&void 0!==o?o:this.bihavior.generateSlug()}),s=t.map((t=>t.name===n.name?(i=!0,n):t));return i||s.push(n),s}getComponentSelected(){return document.querySelector(`[${this.RENDER_LABEL}selected="true"]`)}buildBodyRenderMode(t){var e;const o=Object.assign({},this.common.base_view_body),i=null!==(e=t.position)&&void 0!==e?e:o.position;return i&&(o.styles.push({name:"left",value:`${i.x}px`,id:this.bihavior.generateSlug()}),o.styles.push({name:"top",value:`${i.y}px`,id:this.bihavior.generateSlug()})),o.props=t.props.concat(o.props),o.props.push({name:`${this.RENDER_LABEL}body`,value:"",id:this.bihavior.generateSlug()}),o.styles=t.props.concat(o.styles),o.content=t.content,o}propsTosString(t){return t.map((t=>`${t.name}="${t.value}"`)).join(" ")}propsTosStringCss(t){return t.map((t=>`${t.name}: ${t.value};`)).join(" ")}generateTag(t,e){var o;const i=t.tag;let n=[...t.props];return e?(n=n.map((t=>("class"===t.name&&(t.value=t.value.split(" ").map((t=>t.startsWith(this.RENDER_LABEL)?t:`${this.RENDER_LABEL}${t}`)).join(" ")),t))),n.push({name:`${this.RENDER_LABEL}selectable`,value:""}),n.push({name:`${this.RENDER_LABEL}selected`,value:String(t.selected)}),n.push({name:`${this.RENDER_LABEL}id`,value:null!==(o=t.id)&&void 0!==o?o:""})):n=n.filter((t=>!t.name.startsWith(this.RENDER_LABEL))),t.styles=t.styles.map((t=>(t.id||(t.id=this.bihavior.generateSlug()),t))),n.push({name:"style",value:this.propsTosStringCss(t.styles),id:this.bihavior.generateSlug()}),`<${i} ${this.propsTosString(n)}>${t.content?Array.isArray(t.content)?t.content.map((t=>this.buildTag(t,e))).join("\n"):t.content:""}</${i}>`}buildTag(t,e=!1){if("string"==typeof t)return t;let o=t;return e&&"body"===o.tag&&(o=this.buildBodyRenderMode(o),o.id&&this.setComponentProjectById(o.id,o)),this.generateTag(o,e)}buildItemTheeWithComponent(t,e){const o=e.cloneNode();if(o.removeAttribute("id"),o.setAttribute("visible","true"),Array.isArray(t.content)&&t.content.length>0)for(const i of t.content){const t=o.querySelector(".content");t&&t.appendChild(this.buildItemTheeWithComponent(i,e))}return o}loadThee(t,e){if(!e||!t){const t=document.getElementById("item_thee_template"),e=document.getElementById("components_three");if(!e||!t)return;return void this.loadThee(t,e)}const o=this.getComponentProjectById("body");if(o){const i=this.buildItemTheeWithComponent(o,t);e.appendChild(i)}}buildProject(t=!1){let e="";if(this.projectHistory.current_project)if(t){const t=document.getElementById("project_draw");e+=this.buildTag(this.projectHistory.current_project.content[1],!0),t.innerHTML=e,this.loadOnclickEvents()}else e="<!DOCTYPE html>",e+=this.buildTag(this.projectHistory.current_project);return this.loadThee(),e}exportProject(){this.initNewProject();const t=new Blob([this.buildProject()],{type:"text/html"}),e=document.createElement("a");e.href=URL.createObjectURL(t),e.download="index.html",e.click(),URL.revokeObjectURL(e.href)}};d.initNewProject(),d.buildProject(!0),window.main=d})();
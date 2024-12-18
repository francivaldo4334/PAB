import { Common, Component, Prop } from "../common";
import MainControls from "../controls/main";
import Main from "../main";
import { Utils } from "../utils";
import Actions from "./actions";
import Bihavior from "./bihavior";
import ProjectHistory from "./project-history";

export class MainProjectManager {
  projectHistory: ProjectHistory;
  main: Main;
  actions: Actions;
  bihavior: Bihavior;
  nameField: HTMLInputElement = document.querySelector("#comp_name input")!!;
  tagField: HTMLInputElement = document.querySelector("#comp_tag input")!!;
  textField: HTMLInputElement = document.querySelector("#comp_text input")!!;
  propListHtml = document.getElementById("list_props_html");
  propListCSS = document.getElementById("list_props_css");
  constructor(main: Main) {
    this.projectHistory = new ProjectHistory(main);
    this.bihavior = new Bihavior(this, main);
    this.actions = new Actions(this, main, this.bihavior);
    this.main = main;
    this.updateNameAndTagOfSelectedComponent();
  }
  getPreviousComponent(id: string, component: Component | undefined = undefined): Component | undefined {
    if (!component) return this.getPreviousComponent(id, this.projectHistory.current_project)
    if (Array.isArray(component.content)) {
      for (const item of component.content as Component[]) {
        if (item.id === id) return component
        const res = this.getPreviousComponent(id, item)
        if (res) return res
      }
    }
    return undefined
  }
  updateNameAndTagOfSelectedComponent() {
    this.nameField.addEventListener("input", (e) => {
      const component = this.getComponentSelected()
      const target = e.target as HTMLInputElement
      if (component) {
        const componentProject = Utils.findComponentById(this.projectHistory.current_project, component.getComponentId())
        if (componentProject) {
          componentProject.name = target.value
          if (componentProject.id) {
            this.setComponentProjectById(componentProject.id, componentProject, false)
          }
          this.main.buildProject(true);
        }
      }
      e.preventDefault();
    })
    this.tagField.addEventListener("input", (e) => {
      const component = this.getComponentSelected()
      const target = e.target as HTMLInputElement
      if (component) {
        const componentProject = Utils.findComponentById(this.projectHistory.current_project, component.getComponentId()); if (componentProject && Utils.isValidTagName(target.value)) {
          componentProject.tag = target.value
          if (componentProject.id) {
            this.setComponentProjectById(componentProject.id, componentProject, false)
          }
          this.main.buildProject(true);
        }
      }
    })
    this.textField.addEventListener("input", (e) => {
      const component = this.getComponentSelected()
      const target = e.target as HTMLInputElement
      if (component) {
        const componentProject = Utils.findComponentById(this.projectHistory.current_project, component.getComponentId());
        if (componentProject) {
          componentProject.content = target.value
          if (componentProject.id) {
            this.setComponentProjectById(componentProject.id, componentProject, false)
          }
          this.main.buildProject(true);
        }
      }
    })
  }
  getNextBrotherComponent(component: Component): Component | undefined {
    if (!component.id) return undefined;
    const prevComponent = this.getPreviousComponent(component.id);
    if (!prevComponent) return undefined;
    if (!Array.isArray(prevComponent.content)) return;
    const compIndex = (prevComponent.content as Component[]).findIndex(it => it.id === component.id)
    if (compIndex >= 0 && compIndex + 1 < prevComponent.content.length) {
      const result = prevComponent.content[compIndex + 1] as Component
      return result
    }
    return undefined;
  }
  getPrevBrotherComponent(component: Component): Component | undefined {
    if (!component.id) return undefined;
    const prevComponent = this.getPreviousComponent(component.id);
    if (!prevComponent) return undefined;
    if (!Array.isArray(prevComponent.content)) return;
    const compIndex = (prevComponent.content as Component[]).findIndex(it => it.id === component.id)
    if (compIndex > 0 && compIndex < prevComponent.content.length) {
      const result = prevComponent.content[compIndex - 1] as Component
      return result
    }
    return undefined;
  }
  toPrevComponent(currentComponent: HTMLElement | null = this.getComponentSelected()) {
    if (!currentComponent) return;
    const currentComponentProject = Utils.findComponentById(this.projectHistory.current_project, currentComponent.getComponentId());
    if (!currentComponentProject || !currentComponentProject.id) return;
    const prevBrotherComponent = this.getPrevBrotherComponent(currentComponentProject);
    if (prevBrotherComponent && prevBrotherComponent.id) {
      const prevComponent = Utils.getElementByComponent(prevBrotherComponent)
      if (prevComponent) {
        this.onSelectComponente(prevComponent as HTMLElement);
      }
      return;
    }
    const prevComponentProject = this.getPreviousComponent(currentComponentProject.id)
    if (prevComponentProject && prevComponentProject.id) {
      const prevComponent = Utils.getElementByComponent(prevComponentProject)
      if (prevComponent) {
        this.onSelectComponente(prevComponent as HTMLElement);
      }
      return;
    }
  }
  toInnerComponent(currentComponent: HTMLElement | null = this.getComponentSelected()) {
    if (!currentComponent) return;
    const currentComponentProject = Utils.findComponentById(this.projectHistory.current_project, currentComponent.getComponentId());
    if (!currentComponentProject) return;
    if (Array.isArray(currentComponentProject.content) && currentComponentProject.content.length > 0) {
      const nextComponentProject = currentComponentProject.content[0] as Component;
      if (nextComponentProject && nextComponentProject.id) {
        const nextComponent = Utils.getElementByComponent(nextComponentProject);
        if (nextComponent) {
          this.onSelectComponente(nextComponent as HTMLElement);
        }
        return;
      }
    }
  }
  toNextComponent(currentComponent: HTMLElement | null = this.getComponentSelected()) {
    if (!currentComponent) {
      const mainComponenProject = Utils.findComponentById(this.projectHistory.current_project, "body");
      if (!mainComponenProject || !mainComponenProject.id) return;
      const mainComponent = Utils.getElementByComponent(mainComponenProject)
      if (!mainComponent) return;
      this.onSelectComponente(mainComponent as HTMLElement);
      return;
    }
    const currentComponentProject = Utils.findComponentById(this.projectHistory.current_project, currentComponent.getComponentId());
    if (!currentComponentProject) return;
    const brotherComponent = this.getNextBrotherComponent(currentComponentProject);
    if (brotherComponent && brotherComponent.id) {
      const brotherComponentEl = Utils.getElementByComponent(brotherComponent);
      if (brotherComponentEl) {
        this.onSelectComponente(brotherComponentEl as HTMLElement);
        return;
      }
    }
    if (Array.isArray(currentComponentProject.content) && currentComponentProject.content.length > 0) {
      const nextComponentProject = currentComponentProject.content[0] as Component;
      if (nextComponentProject && nextComponentProject.id) {
        const nextComponent = Utils.getElementByComponent(nextComponentProject)
        if (nextComponent) {
          this.onSelectComponente(nextComponent as HTMLElement);
        }
        return;
      }
    }
  }
  setComponentProjectInSelectedComponent(componentTemplate: Component) {
    const selectedComponent = this.getComponentSelected();
    if (!selectedComponent) return;
    const selectedComponentProject = Utils.findComponentById(this.projectHistory.current_project, selectedComponent.getComponentId());
    if (!selectedComponentProject || !selectedComponentProject.id) return;
    if (!Array.isArray(selectedComponentProject.content)) {
      selectedComponentProject.content = []
    }
    const newComponent = JSON.parse(JSON.stringify(componentTemplate))
    newComponent.id = Utils.generateSlug();
    selectedComponentProject.content.push(newComponent);
    this.setComponentProjectById(selectedComponentProject.id, selectedComponentProject, false)
    this.main.buildProject(true)
  }
  removeSelectedComponent() {
    const selectedComponent = this.getComponentSelected();
    if (!selectedComponent) return;
    const selectedComponentProject = Utils.findComponentById(this.projectHistory.current_project, selectedComponent.getComponentId());
    if (!selectedComponentProject || !selectedComponentProject.id) return;
    const parentComponent = this.getPreviousComponent(selectedComponentProject.id)
    if (Array.isArray(parentComponent?.content)) {
      parentComponent.content = parentComponent.content.filter(it => it.id !== selectedComponentProject.id)
    }
    if (!parentComponent || !parentComponent.id) return;
    this.setComponentProjectById(parentComponent.id, parentComponent, false)
    this.main.buildProject(true)
  }
  setComponentProjectById(
    id: string,
    component: Component,
    setUndo = true,
    localComponent: Component | undefined = this.projectHistory.current_project,
    add: (it: Component, undo: boolean) => void = (cmp, undo) => {
      this.projectHistory.updateText(cmp, undo)
    },
    isMain = true,
  ) {
    if (!localComponent) return
    if (localComponent.id === id) {
      add(component, setUndo);
    }
    if (Array.isArray(localComponent.content)) {
      for (let i = 0; i < localComponent.content.length; i++) {
        this.setComponentProjectById(id, component, setUndo, localComponent.content[i] as Component, (it) => {
          if (Array.isArray(localComponent.content))
            localComponent.content[i] = it
        }, false);
      }
    }
    if (isMain) {
      this.projectHistory.updateText(localComponent, setUndo)
    }
  }
  removeProprety(propId: string) {
    const selectedComponent = this.getComponentSelected();
    if (!selectedComponent) return;
    const selectedComponentProject = Utils.findComponentById(this.projectHistory.current_project, selectedComponent.getComponentId());
    if (!selectedComponentProject) return;
    selectedComponentProject.props = selectedComponentProject.props.filter((prop) => prop.id !== propId)
    selectedComponentProject.styles = selectedComponentProject.styles.filter((prop) => prop.id !== propId)
    this.setComponentProjectById(selectedComponentProject.id, selectedComponentProject)
  }
  setPropertyInSelectedComponent(id: string, fieldName: string, newValue: string, listProp: string) {
    const selectedComponent = this.getComponentSelected();
    if (!selectedComponent) return;
    const selectedComponentProject = Utils.findComponentById(this.projectHistory.current_project, selectedComponent.getComponentId());
    if (!selectedComponentProject || !selectedComponentProject.id) return;
    const props = selectedComponentProject.props;
    if (listProp === "HTML") {
      let prop = props.find(it => it.id === id) || { name: "", value: "", id: id };
      if (fieldName === "name") {
        if (newValue === "style") return;
        if (prop.name) { selectedComponent.removeAttribute(prop.name); } prop.name = newValue;
      }
      if (fieldName === "value") { prop.value = newValue; }
      if (!props.includes(prop)) { props.push(prop); }
    }
    if (listProp === "CSS") {
      const propStyle = Utils.getProp(props, "style");
      const listStyle = Utils.stringToProps(propStyle?.value ?? "");
      const styles = selectedComponentProject.styles;
      for (const it of listStyle) {
        styles.push(it);
      }
      let prop = styles.find(it => it.id === id) || { name: "", value: "auto", id: id };
      if (fieldName === "name") { prop.name = newValue; }
      if (fieldName === "value") { prop.value = newValue; }
      if (!styles.includes(prop)) {
        styles.push(prop);
      }
      let css: string = Utils.propsTosStringCss(styles)
      css = Utils.cssSanitize(css);
    }
    this.setComponentProjectById(selectedComponentProject.id, selectedComponentProject, false);
    this.main.buildProject(true, false)
  }
  cleanAllSelectables(updateLispOfProps = true) {
    const allElementsOfProject = document.querySelectorAll(`[${Common.RENDER_LABEL}selectable]`);
    if (allElementsOfProject) {
      allElementsOfProject.forEach((element) => {

        element.setAttribute(`${Common.RENDER_LABEL}selected`, "false");
        const component = Utils.findComponentById(this.projectHistory.current_project, element.getComponentId());
        if (component) {
          component.selected = false;
          if (component.id) {
            this.setComponentProjectById(component.id, component, false);
          }
        }
      });
    }
    if (updateLispOfProps) {
      if (this.propListHtml)
        this.propListHtml.innerHTML = "";
      if (this.propListCSS)
        this.propListCSS.innerHTML = "";
      this.nameField.value = "";
      this.tagField.value = "";
      this.textField.value = "";
    }
  }
  onSelectComponente(component: HTMLElement | null, updateLispOfProps = true) {
    if (!component) return;
    if (this.actions.EDIT_MODE !== "SELECTION") {
      return;
    }
    this.cleanAllSelectables(updateLispOfProps);
    component.setAttribute(`${Common.RENDER_LABEL}selected`, "true");
    const componentProject = Utils.findComponentById(this.projectHistory.current_project, component.getComponentId())
    if (componentProject) {
      componentProject.selected = true;
      this.nameField.value = componentProject.name
      this.tagField.value = componentProject.tag
      if (typeof componentProject.content === "string") {
        this.textField.value = componentProject.content
      }
      if (updateLispOfProps) {
        for (const attr of componentProject.props) {
          if (!attr.name.toLowerCase().startsWith(Common.RENDER_LABEL.toLowerCase()) && attr.name !== "style") {
            this.actions.addNewProp("HTML", attr)
          }
        }
        const styles = componentProject.styles.filter(it => !(componentProject.id === "body" && ["left", "top", "position"].includes(it.name)))
        for (const attr of styles) {
          this.actions.addNewProp("CSS", attr)
        }
      }
      if (componentProject.id) {
        this.setComponentProjectById(componentProject.id, componentProject, false);
      }
    }
  }
  getComponentSelected(): HTMLElement {
    return document.querySelector(`[${Common.RENDER_LABEL}selected="true"]`) as HTMLElement
  }
  getSelectedComponentJson(): string {
    const selectedComponentId = this.getComponentSelected()?.getComponentId()
    if (!selectedComponentId) return "";
    const componentProject = Utils.findComponentById(this.projectHistory.current_project, selectedComponentId)
    if (!componentProject) return "";
    return JSON.stringify(componentProject)
  }
  setComponetJsonInSelectedComponent(componentJson: string) {
    const selectedComponentId = this.getComponentSelected()?.getComponentId()
    if (!selectedComponentId) return;
    try {
      const componentProject = JSON.parse(componentJson);
      this.setComponentProjectInSelectedComponent(componentProject)
    } catch (err) {
      throw err;
    }
  }
  duplicateSelectedComponent() {
    const selectedComponentId = this.getComponentSelected()?.getComponentId();
    if (!selectedComponentId) return;
    const parentComponent = this.getPreviousComponent(selectedComponentId)
    if (!parentComponent) return;
    const selectedComponent = Utils.findComponentById(this.projectHistory.current_project, selectedComponentId);
    if (!selectedComponent) return;
    if (!Array.isArray(parentComponent.content))
      parentComponent.content = []
    const index = parentComponent.content.findIndex(it => it.id === selectedComponentId)
    const newComponent = JSON.parse(JSON.stringify(selectedComponent))
    newComponent.id = Utils.generateSlug()
    parentComponent.content.splice(index + 1, 0, newComponent)
    this.setComponentProjectById(parentComponent.id, parentComponent)
  }
  updateOrAddPropCss(prop: Prop, component: Component) {
    let update = false;
    component.styles.map(it => {
      if (prop.name === it.name) {
        it.value = prop.value;
        update = true;
      }
      return it
    })
    if (!update) {
      component.styles.push(prop);
    }
  }
  updateOrAddProp(prop: Prop, component: Component) {
    let update = false;
    component.props.map(it => {
      if (prop.name === it.name) {
        it.value = prop.value;
        update = true;
      }
      return it
    })
    if (!update) {
      component.props.push(prop);
    }
  }
  alignItensOfSelectedComponent(alignment: "start" | "center" | "end") {
    const selectedComponentId = this.getComponentSelected()?.getComponentId();
    if (!selectedComponentId) return;
    const selectedComponent = Utils.findComponentById(this.projectHistory.current_project, selectedComponentId);
    if (!selectedComponent) return;
    this.updateOrAddPropCss({ name: "display", value: "flex" }, selectedComponent)
    this.updateOrAddPropCss({ name: "align-items", value: alignment }, selectedComponent)
    this.setComponentProjectById(selectedComponent.id, selectedComponent)
    this.main.buildProject(true)
  }
  flexDirection(flexDirection: "column" | "row") {
    const selectedComponentId = this.getComponentSelected()?.getComponentId();
    if (!selectedComponentId) return;
    const selectedComponent = Utils.findComponentById(this.projectHistory.current_project, selectedComponentId);
    if (!selectedComponent) return;
    this.updateOrAddPropCss({ name: "display", value: "flex" }, selectedComponent)
    this.updateOrAddPropCss({ name: "flex-direction", value: flexDirection }, selectedComponent)
    this.setComponentProjectById(selectedComponent.id, selectedComponent)
    this.main.buildProject(true)
  }
}

import ProjectHistory from "./project-history-manager";
import MainControls from "./controls/main";
import Actions from "./actions";
import Keybinds from "./keybinds"
import Bihavior from "./bihavior"
import { Common, Prop, Component } from "./common";
import Translation from "./translations";

class Main {
	projectHistory: ProjectHistory;
	common: Common;
	controls: MainControls;
	actions: Actions;
	keybinds: Keybinds;
	bihavior: Bihavior;
	translations: Translation;
	propListHtml = document.getElementById("list_props_html");
	propListCSS = document.getElementById("list_props_css");
	readonly RENDER_LABEL = "BAB_project__";
	constructor() {
		this.common = new Common();
		this.bihavior = new Bihavior(this);
		this.actions = new Actions(this.bihavior);
		this.keybinds = new Keybinds(this.actions, this.bihavior);
		this.projectHistory = new ProjectHistory();
		this.controls = new MainControls(this);
		this.translations = new Translation(this.common, "pt_br");
		this.updateNameAndTagOfSelectedComponent();
	}
	getElementByComponentId(id: string): Element | null {
		return document.querySelector(`[${this.RENDER_LABEL}id=${id}]`);
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
		const nameField = this.getComponentNameInput();
		const tagField = this.getComponentTagInput();
		nameField.addEventListener("input", (e) => {
			const component = this.getComponentSelected()
			const target = e.target as HTMLInputElement
			if (component) {
				const componentProject = this.getComponentProjectById(component.getAttribute(`${this.RENDER_LABEL}id`) ?? "")
				if (componentProject) {
					componentProject.name = target.value
					this.buildProject(true);
				}
			}
		})
		tagField.addEventListener("input", (e) => {
			const component = this.getComponentSelected()
			const target = e.target as HTMLInputElement
			if (component) {
				const componentProject = this.getComponentProjectById(component.getAttribute(`${this.RENDER_LABEL}id`) ?? "")
				if (componentProject && target.value.length > 0) {
					componentProject.tag = target.value
					this.buildProject(true);
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
	getComponentNameInput(): HTMLInputElement {
		return document.querySelector("#comp_name input")!!;
	}
	getComponentTagInput(): HTMLInputElement {
		return document.querySelector("#comp_tag input")!!;
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
	toPrevComponent(currentComponent: Element | null = this.getComponentSelected()) {
		if (!currentComponent) return;
		const currentComponentProject = this.getComponentProjectById(this.getComponentId(currentComponent));
		if (!currentComponentProject || !currentComponentProject.id) return;
		const prevBrotherComponent = this.getPrevBrotherComponent(currentComponentProject);
		if (prevBrotherComponent && prevBrotherComponent.id) {
			const prevComponent = this.getElementByComponentId(prevBrotherComponent.id)
			if (prevComponent) {
				this.onSelectComponente(prevComponent as HTMLElement);
			}
			return;
		}
		const prevComponentProject = this.getPreviousComponent(currentComponentProject.id)
		if (prevComponentProject && prevComponentProject.id) {
			const prevComponent = this.getElementByComponentId(prevComponentProject.id)
			if (prevComponent) {
				this.onSelectComponente(prevComponent as HTMLElement);
			}
			return;
		}
	}
	toInnerComponent(currentComponent: Element | null = this.getComponentSelected()) {
		if (!currentComponent) return;
		const currentComponentProject = this.getComponentProjectById(this.getComponentId(currentComponent));
		if (!currentComponentProject) return;
		if (Array.isArray(currentComponentProject.content) && currentComponentProject.content.length > 0) {
			const nextComponentProject = currentComponentProject.content[0] as Component;
			if (nextComponentProject && nextComponentProject.id) {
				const nextComponent = this.getElementByComponentId(nextComponentProject.id)
				if (nextComponent) {
					this.onSelectComponente(nextComponent as HTMLElement);
				}
				return;
			}
		}
	}
	toNextComponent(currentComponent: Element | null = this.getComponentSelected()) {
		if (!currentComponent) {
			const mainComponenProject = this.getComponentProjectById("body");
			if (!mainComponenProject || !mainComponenProject.id) return;
			const mainComponent = this.getElementByComponentId(mainComponenProject.id)
			if (!mainComponent) return;
			this.onSelectComponente(mainComponent as HTMLElement);
			return;
		}
		const currentComponentProject = this.getComponentProjectById(this.getComponentId(currentComponent));
		if (!currentComponentProject) return;
		const brotherComponent = this.getNextBrotherComponent(currentComponentProject);
		if (brotherComponent && brotherComponent.id) {
			const brotherComponentEl = this.getElementByComponentId(brotherComponent.id)
			if (brotherComponentEl) {
				this.onSelectComponente(brotherComponentEl as HTMLElement);
				return;
			}
		}
		if (Array.isArray(currentComponentProject.content) && currentComponentProject.content.length > 0) {
			const nextComponentProject = currentComponentProject.content[0] as Component;
			if (nextComponentProject && nextComponentProject.id) {
				const nextComponent = this.getElementByComponentId(nextComponentProject.id)
				if (nextComponent) {
					this.onSelectComponente(nextComponent as HTMLElement);
				}
				return;
			}
		}
	}
	getComponentProjectById(id: string, component?: Component): Component | undefined {
		if (component) {
			if (component.id === id) {
				return component
			}
			if (Array.isArray(component.content)) {
				for (const item of component.content) {
					const res = this.getComponentProjectById(id, item as Component);
					if (res) {
						return res
					}
				}
			}
			return undefined
		}
		return this.getComponentProjectById(id, this.projectHistory.current_project)
	}
	getComponentId(el: Element): string {
		return el.getAttribute(`${this.RENDER_LABEL}id`) ?? "";
	}
	setComponentProjectInSelectedComponent(componentTemplate: Component) {
		const selectedComponent = this.getComponentSelected();
		if (!selectedComponent) return;
		const selectedComponentProject = this.getComponentProjectById(this.getComponentId(selectedComponent));
		if (!selectedComponentProject) return;
		if (Array.isArray(selectedComponentProject.content)) {
			const newComponent = JSON.parse(JSON.stringify(componentTemplate))
			newComponent.id = this.bihavior.generateSlug();
			selectedComponentProject.content.push(newComponent);
			return;
		}
	}
	setComponentProjectById(
		id: string,
		component: Component,
		localComponent: Component | undefined = this.projectHistory.current_project,
		add: (it: Component) => void = (it) => {
			this.projectHistory.updateText(it)
		}
	) {
		if (!localComponent) return
		if (localComponent.id === id) {
			add(component);
		}
		if (Array.isArray(localComponent.content)) {
			for (let i = 0; i < localComponent.content.length; i++) {
				this.setComponentProjectById(id, component, localComponent.content[i] as Component, (it) => {
					if (Array.isArray(localComponent.content))
						localComponent.content[i] = it
				});
			}
		}
	}
	removeProprety(propId: string) {
		const selectedComponent = this.getComponentSelected();
		if (!selectedComponent) return;
		const selectedComponentProject = this.getComponentProjectById(selectedComponent.getAttribute(`${this.RENDER_LABEL}id`) ?? "");
		if (!selectedComponentProject) return;
		selectedComponentProject.props = selectedComponentProject.props.filter((prop) => prop.id !== propId)
		selectedComponentProject.styles = selectedComponentProject.styles.filter((prop) => prop.id !== propId)
	}
	cssSanitize(cssString: string): string {
		const tempElement = document.createElement('div');
		const styles = cssString.split(';').filter(style => style.trim() !== '');
		const sanitizedStyles: string[] = [];
		for (let style of styles) {
			const [property, value] = style.split(':').map(part => part.trim());
			if (property && value) {
				const originalValue = tempElement.style.getPropertyValue(property);
				tempElement.style.setProperty(property, value ?? "auto");
				if (tempElement.style.getPropertyValue(property) !== '') {
					sanitizedStyles.push(`${property}: ${value}`);
				}
				tempElement.style.setProperty(property, originalValue);
			}
		}
		return sanitizedStyles.join('; ');
	}
	setPropertyInSelectedComponent(id: string, fieldName: string, newValue: string, listProp: string) {
		const selectedComponent = this.getComponentSelected();
		if (!selectedComponent) return;
		const selectedComponentProject = this.getComponentProjectById(this.getComponentId(selectedComponent));
		if (!selectedComponentProject) return;
		const props = selectedComponentProject.props;
		if (listProp === "HTML") {
			let prop = props.find(it => it.id === id) || { name: "", value: "", id: id };
			if (fieldName === "name") { if (prop.name) { selectedComponent.removeAttribute(prop.name); } prop.name = newValue; }
			if (fieldName === "value") { prop.value = newValue; }
			if (!props.includes(prop)) { props.push(prop); }
			selectedComponent.setAttribute(prop.name, prop.value);
		}
		if (listProp === "CSS") {
			const propStyle = this.getProp(props, "style");
			const listStyle = this.stringToProps(propStyle?.value ?? "");
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
			let css: string | undefined = this.propsTosStringCss(styles)
			css = this.cssSanitize(css);
			selectedComponent.setAttribute("style", css);
		}
	}
	initNewProject() {
		this.projectHistory.updateText(this.common.base_json_template);
	}
	cleanAllSelectables() {
		const allElementsOfProject = document.querySelectorAll(`[${this.RENDER_LABEL}selectable]`);
		if (allElementsOfProject) {
			allElementsOfProject.forEach((el) => {
				el.setAttribute(`${this.RENDER_LABEL}selected`, "false");
				const component = this.getComponentProjectById(this.getComponentId(el));
				if (component) {
					component.selected = false;
				}
			});
		}
		if (this.propListHtml)
			this.propListHtml.innerHTML = "";
		if (this.propListCSS)
			this.propListCSS.innerHTML = "";
		const nameField = this.getComponentNameInput();
		const tagField = this.getComponentTagInput();
		nameField.value = "";
		tagField.value = "";
	}
	onSelectComponente(component: HTMLElement) {
		if (this.actions.EDIT_MODE !== "SELECTION") {
			return;
		}
		this.cleanAllSelectables();
		component.setAttribute(`${this.RENDER_LABEL}selected`, "true");
		const nameField = this.getComponentNameInput();
		const tagField = this.getComponentTagInput();
		const componentProject = this.getComponentProjectById(component.getAttribute(`${this.RENDER_LABEL}id`) ?? "")
		if (componentProject) {
			componentProject.selected = true;
			nameField.value = componentProject.name
			tagField.value = componentProject.tag
			for (const attr of componentProject.props) {
				if (!attr.name.toLowerCase().startsWith(this.RENDER_LABEL.toLowerCase()) && attr.name !== "style") {
					this.actions.addNewProp("HTML", attr)
				}
			}
			for (const attr of componentProject.styles) {
				this.actions.addNewProp("CSS", attr)
			}
		}
	}
	loadOnclickEvents() {
		const allElementsOfProject = document.querySelectorAll(`[${this.RENDER_LABEL}selectable]`);
		if (allElementsOfProject) {
			allElementsOfProject.forEach((el) => {
				(el as HTMLElement).onclick = (e) => {
					const target = e.target as HTMLElement;
					this.onSelectComponente(target)
					e.stopPropagation();
				}
			});
		}
	}
	updateCssProp(cssStr: string, prop: string, value: string): string {
		const regex = new RegExp(`${prop}:\\s*[^;]+;`, "g");
		const newProp = `${prop}: ${value};`;
		return regex.test(cssStr)
			? cssStr.replace(regex, newProp)
			: `${cssStr} ${newProp}`;
	}
	stringToProps(style: string): Prop[] {
		return style.split(";").map(it => it.trim()).filter(it => it).map(
			it => {
				const [name, value] = it.split(":").map(i => i.trim());
				return {
					name: name,
					value: value
				}
			}
		)
	}
	getProp(props: Prop[], name: string): Prop | undefined {
		return props.find((it) => it.name === name);
	}
	addProp(props: Prop[], _prop: Prop): Prop[] {
		let add = false
		const prop = { ..._prop, id: _prop.id ?? this.bihavior.generateSlug() }
		const result = props.map((it) => {
			if (it.name === prop.name) {
				add = true
				return prop;
			}
			return it;
		});
		if (!add) {
			result.push(prop)
		}
		return result;
	}
	getComponentSelected() {
		return document.querySelector(`[${this.RENDER_LABEL}selected="true"]`)
	}
	buildBodyRenderMode(component: Component) {
		const TEMPLATE: Component = { ...this.common.base_view_body };
		const position = component.position ?? TEMPLATE.position
		if (position) {
			TEMPLATE.styles.push({ name: "left", value: `${position.x}px`, id: this.bihavior.generateSlug() });
			TEMPLATE.styles.push({ name: "top", value: `${position.y}px`, id: this.bihavior.generateSlug() });
		}
		TEMPLATE.props = component.props.concat(TEMPLATE.props);
		TEMPLATE.props.push({ name: `${this.RENDER_LABEL}body`, value: "", id: this.bihavior.generateSlug() });
		TEMPLATE.styles = component.props.concat(TEMPLATE.styles);
		TEMPLATE.content = component.content;
		return TEMPLATE;
	}
	propsTosString(props: Prop[]): string {
		return props.map((it: Prop) => `${it.name}="${it.value}"`).join(" ")
	}
	propsTosStringCss(props: Prop[]): string {
		return props.map(it => `${it.name}: ${it.value};`).join(" ");
	}
	generateTag(component: Component, renderMode: boolean): string {
		const TAG = component.tag;
		let props = [...component.props];
		if (renderMode) {
			props = props.map((it) => {
				if (it.name === "class") {
					it.value = it.value.split(' ').map((cls) => {
						return (!cls.startsWith(this.RENDER_LABEL)) ? `${this.RENDER_LABEL}${cls}` : cls;
					}).join(" ");
				}
				return it;
			});
			props.push({
				name: `${this.RENDER_LABEL}selectable`,
				value: ""
			})
			props.push({
				name: `${this.RENDER_LABEL}selected`,
				value: String(component.selected)
			})
			props.push({
				name: `${this.RENDER_LABEL}id`,
				value: component.id ?? ""
			})
		}
		else {
			props = props.filter((prop) => !prop.name.startsWith(this.RENDER_LABEL));
		}
		component.styles = component.styles.map(it => {
			if (!it.id)
				it.id = this.bihavior.generateSlug()
			return it
		})
		props.push({ name: "style", value: this.propsTosStringCss(component.styles), id: this.bihavior.generateSlug() })
		const PROPS = this.propsTosString(props);
		const INNER = component.content
			? !Array.isArray(component.content)
				? component.content
				: component.content.map((it) => this.buildTag(it, renderMode)).join("\n")
			: "";
		return `<${TAG} ${PROPS}>${INNER}</${TAG}>`;
	}
	buildTag(content: Component | string | object, renderMode = false): string {
		if (typeof content === "string") return content;
		let component = content as Component;
		if (renderMode && component.tag === "body") {
			component = this.buildBodyRenderMode(component);
			if (component.id) this.setComponentProjectById(component.id, component)
		}
		return this.generateTag(component, renderMode);
	}
	buildItemTheeWithComponent(component: Component, templateItemThee: HTMLElement): HTMLElement {
		const newItemThee = templateItemThee.cloneNode() as HTMLElement
		newItemThee.removeAttribute("id");
		newItemThee.setAttribute("visible", "true");
		if (Array.isArray(component.content) && component.content.length > 0) {
			for (const item of component.content as Component[]) {
				const contentItemThee = newItemThee.querySelector(".content");
				if (contentItemThee) {
					contentItemThee.appendChild(this.buildItemTheeWithComponent(item, templateItemThee))
				}
			}
		}
		return newItemThee;
	}
	loadThee(templateItemThee?: HTMLElement, localThee?: HTMLElement) {
		if (!localThee || !templateItemThee) {
			const _templateItemThee = document.getElementById("item_thee_template");
			const _localThee = document.getElementById("components_three");
			if (!_localThee || !_templateItemThee) return;
			this.loadThee(_templateItemThee, _localThee);
			return
		}
		const body = this.getComponentProjectById("body");
		if (body) {
			const newItemThee = this.buildItemTheeWithComponent(body, templateItemThee);
			localThee.appendChild(newItemThee)
		}
	}
	buildProject(devMode = false) {
		let builded_project = "";
		if (this.projectHistory.current_project) {
			if (devMode) {
				const my_body = document.getElementById("project_draw") as HTMLElement;

				builded_project += this.buildTag(this.projectHistory.current_project.content[1], true);
				my_body.innerHTML = builded_project;
				this.loadOnclickEvents();
			}
			else {
				builded_project = "<!DOCTYPE html>";
				builded_project += this.buildTag(this.projectHistory.current_project);
			}
		}
		this.loadThee()
		return builded_project;
	}
	exportProject() {
		this.initNewProject();
		const blob = new Blob([this.buildProject()], { type: "text/html" });
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = "index.html";
		link.click();
		URL.revokeObjectURL(link.href);
	}
}
export default Main;

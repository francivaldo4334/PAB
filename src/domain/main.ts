class Main {
	projectHistory: ProjectHistory;
	common: Common;
	controls: MainControls;
	actions: Actions;
	keybinds: Keybinds;
	constructor() {
		this.common = new Common();
		this.actions = new Actions();
		this.keybinds = new Keybinds(this.actions);
		this.projectHistory = new ProjectHistory();
		this.controls = new MainControls(this.actions, this.projectHistory);
		this.initNewProject();
		const my_body = document.getElementById("project_draw");
		if (
			this.projectHistory.current_project &&
			this.projectHistory.current_project.content.length > 1
		) {
			(my_body as HTMLElement).innerHTML = this.buildTag(
				this.projectHistory.current_project.content[1],
				true,
			);
		}
	}
	initNewProject() {
		this.projectHistory.updateText(this.common.base_json_template);
	}

	updateCssProp(cssStr: string, prop: string, value: string): string {
		const regex = new RegExp(`${prop}:\\s*[^;]+;`, "g");
		const newProp = `${prop}: ${value};`;
		return regex.test(cssStr)
			? cssStr.replace(regex, newProp)
			: `${cssStr} ${newProp}`;
	}
	getProp(props: Prop[], name: string): Prop | undefined {
		return props.find((it) => it.name === name);
	}
	addProp(props: Prop[], prop: Prop): Prop[] {
		return props.map((it) => {
			if (it.name === prop.name) {
				return prop;
			}
			return it;
		});
	}
	buildBodyRenderMode(component: Component) {
		const baseBodyTemplate: Component = { ...this.common.base_view_body };
		const baseBodyTemplateStyle = this.getProp(baseBodyTemplate.props, "style");
		const componentStyle = this.getProp(component.props, "style");
		let newStyle = componentStyle?.value ?? "";
		newStyle += baseBodyTemplateStyle?.value ?? "";
		this.updateCssProp(newStyle, "");
		comp.props =
			component_json.props && component_json.props.length > 0
				? component_json.props.map((it) => {
						if (it.name === "style" && prop_style) {
							const newStyle = prop_style.value + it.value;
							return { name: "style", value: newStyle };
						}
						return it;
					})
				: comp.props;
		comp.props = comp.props.map((it) => {
			if (it.name === "style") {
				let newStyle = it.value;
				if (comp.position) {
					newStyle = this.updateCssProp(
						newStyle,
						"left",
						String(comp.position.x),
					);
					newStyle = this.updateCssProp(
						newStyle,
						"top",
						String(comp.position.y),
					);
				}
				return { name: "style", value: newStyle };
			}
			return it;
		});
		comp.content = component_json.content;
	}
	propsTosString(props: Props[]) {
		return comp.props
			? comp.props.map((it: Prop) => `${it.name}="${it.value}"`).join(" ")
			: "";
	}

	generateTag(component: Component): string {
		const TAG = component.tag;
		const PROPS = this.propsTosString(component.props);
		const INNER = component.content
			? !Array.isArray(component.content)
				? component.content
				: component.content.map((it) => this.buildTag(it)).join("\n")
			: "";
		return `<${tag_name} ${tag_props}>${tag_content}</${tag_name}>`;
	}

	buildTag(content: Component | string, renderMode = false): string {
		if (typeof content === "string") return content;
		let component = content as Project;
		const is_tag_comp = mode_prod && component_json.tag === "body";
		if (renderMode && compo) {
			component = buildBodyRenderMode(component);
		}
		return this.generateTag(component);
	}

	buildProject() {
		let builded_project = "<!DOCTYPE html>";
		if (this.projectHistory.current_project) {
			builded_project += this.buildTag(this.projectHistory.current_project);
		}
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
const main = new Main();

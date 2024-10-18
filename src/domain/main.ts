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
		const regex = new RegExp(`${prop}:\\s*[^;]+;`);
		const newProp = `${prop}: ${value};`;
		return cssStr.match(regex)
			? cssStr.replace(regex, newProp)
			: `${cssStr} ${newProp}`;
	}

	buildTag(_component_json: object | string, mode_prod = false): string {
		const component_json = _component_json as Project;
		if (typeof component_json === "string") return component_json;
		let comp: Project = { ...this.common.base_view_body };
		const is_tag_comp = mode_prod && component_json.tag === "body";
		if (is_tag_comp) {
			const prop_style: { name: string; value: string } | undefined =
				comp.props.find((it: { name: string }) => it.name === "style");
			comp.props =
				component_json.props && component_json.props.length > 0
					? component_json.props.map((it) => {
							if (it.name === "style" && prop_style) {
								return { name: "style", value: prop_style.value + it.value };
							}
							return it;
						})
					: comp.props;
			comp.content = component_json.content;
		} else {
			comp = component_json as Project;
		}
		const tag_name = comp.tag;
		const tag_props = comp.props
			? comp.props
					.map(
						(it: { name: string; value: string }) => `${it.name}="${it.value}"`,
					)
					.join(" ")
			: "";
		const tag_content = comp.content
			? !Array.isArray(comp.content)
				? comp.content
				: comp.content.map((it) => this.buildTag(it)).join("")
			: "";
		return `<${tag_name} ${tag_props}>${tag_content}</${tag_name}>`;
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
		link.download = "my_project.html";
		link.click();
		URL.revokeObjectURL(link.href);
	}
}
const main = new Main();

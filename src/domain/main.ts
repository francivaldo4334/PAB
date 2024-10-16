const base_view_body: Project = {
	name: "body",
	is_view: true,
	tag: "div",
	template: "",
	props: [
		{
			name: "style",
			value:
				"width: 1440px; height: 1024px; background: #fff; position: absolute;",
		},
	],
	content: [],
};
const base_json_template = {
	name: "",
	is_view: false,
	tag: "html",
	template: "",
	position: { x: 0, y: 0 },
	zoom: 1.0,
	props: [{ name: "lang", value: "pt-BR" }],
	content: [
		{
			name: "",
			is_view: false,
			tag: "head",
			template: "",
			props: [],
			content: [
				{
					name: "",
					is_view: false,
					tag: "meta",
					template: "",
					props: [{ name: "charset", value: "UTF-8" }],
					content: [],
				},
				{
					name: "",
					is_view: false,
					tag: "meta",
					template: "",
					props: [
						{ name: "name", value: "viewport" },
						{ name: "content", value: "width=device-width, initial-scale=1.0" },
					],
					content: [],
				},
				{
					name: "",
					is_view: false,
					tag: "title",
					template: "",
					props: [],
					content: ["My Site"],
				},
			],
		},
		{
			name: "",
			is_view: true,
			tag: "body",
			template: "",
			props: [],
			content: [
				{
					name: "",
					is_view: true,
					tag: "h1",
					template: "",
					props: [
						{
							name: "style",
							value: "color: red;",
						},
					],
					content: ["Teste"],
				},
			],
		},
	],
};
function initNewProject() {
	current_project = base_json_template;
}

function updateCssProp(cssStr: string, prop: string, value: string): string {
	const regex = new RegExp(`${prop}:\\s*[^;]+;`);
	const newProp = `${prop}: ${value};`;
	if (cssStr.match(regex)) {
		return cssStr.replace(regex, newProp);
	} else {
		return `${cssStr} ${newProp}`;
	}
}

function buildTag(_component_json: object | string, mode_prod = false): string {
	const component_json = _component_json as Project;
	if (typeof component_json === "string") return component_json;
	let comp: Project = { ...base_view_body };
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
			: comp.content.map((it) => buildTag(it)).join("")
		: "";
	return `<${tag_name} ${tag_props}>${tag_content}</${tag_name}>`;
}

function buildProject() {
	let builded_project = "<!DOCTYPE html>";
	if (current_project) {
		builded_project += buildTag(current_project);
	}
	return builded_project;
}

function exportProject() {
	initNewProject();
	const blob = new Blob([buildProject()], { type: "text/html" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = "my_project.html";
	link.click();
	URL.revokeObjectURL(link.href);
	console.log();
}

initNewProject();
const my_body = document.getElementById("project_draw");
if (current_project && current_project.content.length > 1) {
	(my_body as HTMLElement).innerHTML = buildTag(
		current_project.content[1],
		true,
	);
}

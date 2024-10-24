import { Utils } from "./utils";

export type Prop = {
	name: string;
	value: string;
	id?: string;
};
export type Vector = {
	x: number;
	y: number;
}
export class Component {
	id: string;
	selected: boolean;
	name: string;
	is_view: boolean;
	tag: string;
	template: string;
	props: Prop[];
	styles: Prop[];
	content: Component[] | string;
	position: Vector;
	private _zoom?: number;
	constructor(
		data: {
			id?: string,
			tag: string,
			name: string,
			is_view: boolean,
			template?: string,
			props: Prop[],
			styles: Prop[],
			content: Component[] | string,
			selected?: boolean,
			zoom?: number,
			position: Vector
		}
	) {
		this.id = data.id ?? Utils.generateSlug();
		this.selected = data.selected ?? false;
		this.name = data.name;
		this.is_view = data.is_view;
		this.tag = data.tag;
		this.template = data.template ?? "";
		this.props = data.props;
		this.styles = data.styles;
		this.content = data.content;
		this._zoom = data.zoom;
		this.position = data.position;
	}
	get zoom(): number {
		return this._zoom ?? Common.SCALE_DEFAULT;
	}
	set zoom(zoom: number) {
		this._zoom = zoom;
	}
};
export type Translations = Record<string, any>;

export class Common {
	static translations: Translations = {
		en: {
			project_name: "Project Name",
			user_name: "Username",
			html: "Html",
			css: "Css",
			javascript: "javascript",
			assets: "Assets",
			design: "Design",
			prototype: "Prototype",
		},
		pt_br: {
			project_name: "Nome do Projeto",
			user_name: "Nome de usuário",
			html: "Html",
			css: "Css",
			javascript: "javascript",
			assets: "Assets",
			design: "Design",
			prototype: "Prototipo",
		},
	}
	static base_json_template = new Component({
		id: "html",
		name: "",
		is_view: false,
		tag: "html",
		template: "",
		position: { x: 0, y: 0 },
		zoom: 1.0,
		props: [{ name: "lang", value: "pt-BR" }],
		styles: [],
		content: [
			new Component({
				id: "head",
				name: "",
				is_view: false,
				tag: "head",
				template: "",
				position: { x: 0, y: 0 },
				props: [],
				styles: [],
				content: [
					new Component({
						name: "",
						is_view: false,
						tag: "meta",
						template: "",
						position: { x: 0, y: 0 },
						props: [{ name: "charset", value: "UTF-8" }],
						styles: [],
						content: [],
					}),
					new Component({
						name: "",
						is_view: false,
						tag: "meta",
						template: "",
						position: { x: 0, y: 0 },
						props: [
							{ name: "name", value: "viewport" },
							{
								name: "content",
								value: "width=device-width, initial-scale=1.0",
							},
						],
						styles: [],
						content: [],
					}),
					new Component({
						name: "",
						is_view: false,
						tag: "title",
						template: "",
						position: { x: 0, y: 0 },
						props: [],
						styles: [],
						content: "My Site",
					}),
				],
			}),
			new Component({
				name: "",
				is_view: true,
				tag: "body",
				id: "body",
				template: "",
				position: { x: -250, y: -250 },
				props: [],
				styles: [],
				content: [
					new Component({
						name: "",
						is_view: true,
						id: "teste_h1",
						tag: "h1",
						template: "",
						position: { x: 0, y: 0 },
						props: [],
						styles: [
							{
								name: "color",
								value: "red"
							}
						],
						content: "Teste",
					}),
				],
			}),
		],
	});
	static base_view_body: Component = new Component(
		{
			id: "body",
			tag: "div",
			name: "body",
			is_view: true,
			selected: true,
			props: [],
			styles: [
				{
					name: "width",
					value: "500px"
				},
				{
					name: "height",
					value: "500px"
				},
				{
					name: "background",
					value: "#fff"
				},
				{
					name: "position",
					value: "absolute"
				}
			],
			content: [],
			zoom: 0,
			position: { x: -250, y: -250 },
		}
	);
	static text_json_template: Component = new Component({
		name: "text",
		is_view: true,
		tag: "h4",
		template: "",
		position: { x: 0, y: 0 },
		props: [],
		styles: [
			{
				name: "color",
				value: "black"
			}
		],
		content: "Text"
	});
	static rect_json_template: Component = new Component({
		name: "rect",
		is_view: true,
		tag: "div",
		template: "",
		position: { x: 0, y: 0 },
		props: [],
		styles: [
			{
				name: "width",
				value: "100px"
			},
			{
				name: "height",
				value: "100px"
			},
			{
				name: "background",
				value: "white"
			}
		],
		content: []
	})
	static oval_json_template: Component = new Component({
		name: "oval",
		is_view: true,
		tag: "div",
		template: "",
		position: { x: 0, y: 0 },
		props: [],
		styles: [
			{
				name: "width",
				value: "100px"
			},
			{
				name: "height",
				value: "100px"
			},
			{
				name: "border-radius",
				value: "50%"
			},
			{
				name: "background",
				value: "white"
			}
		],
		content: []

	})
	static RENDER_LABEL = "BAB_project__";
	static SCALE_DEFAULT = 1;
}

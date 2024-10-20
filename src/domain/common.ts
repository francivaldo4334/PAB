export type Prop = {
	name: string;
	value: string;
	id?: string;
};
export type Component = {
	id?: string;
	name: string;
	is_view: boolean;
	tag: string;
	template: string;
	position?: {
		x: number;
		y: number;
	};
	zoom?: number;
	props: Prop[];
	styles: Prop[];
	content: object[] | string;
};
export type Translations = Record<string, any>;
export class Common {
	translations: Translations = {
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
	base_view_body: Component = {
		id: "body",
		name: "body",
		is_view: true,
		tag: "div",
		template: "",
		position: { x: -250, y: -250 },
		props: [
		],
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
	};
	base_json_template: Component = {
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
			{
				id: "head",
				name: "",
				is_view: false,
				tag: "head",
				template: "",
				props: [],
				styles: [],
				content: [
					{
						name: "",
						is_view: false,
						tag: "meta",
						template: "",
						props: [{ name: "charset", value: "UTF-8" }],
						styles: [],
						content: [],
					},
					{
						name: "",
						is_view: false,
						tag: "meta",
						template: "",
						props: [
							{ name: "name", value: "viewport" },
							{
								name: "content",
								value: "width=device-width, initial-scale=1.0",
							},
						],
						styles: [],
						content: [],
					},
					{
						name: "",
						is_view: false,
						tag: "title",
						template: "",
						props: [],
						styles: [],
						content: ["My Site"],
					},
				],
			},
			{
				name: "",
				is_view: true,
				tag: "body",
				id: "body",
				template: "",
				props: [],
				styles: [],
				content: [
					{
						name: "",
						is_view: true,
						id: "teste_h1",
						tag: "h1",
						template: "",
						props: [],
						styles: [
							{
								name: "color",
								value: "red"
							}
						],
						content: ["Teste"],
					},
				],
			},
		],
	};
}

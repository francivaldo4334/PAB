type Prop = {
	name: string;
	value: string;
};
type Component = {
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
	content: object[] | string;
};
class Common {
	base_view_body: Component = {
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
	base_json_template: Component = {
		name: "",
		is_view: false,
		tag: "html",
		template: "",
		position: { x: -720, y: -512 },
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
							{
								name: "content",
								value: "width=device-width, initial-scale=1.0",
							},
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
}

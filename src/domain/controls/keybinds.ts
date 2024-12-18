import Actions from "../project-manager/actions"
import Bihavior from "../project-manager/bihavior"
type KeyMap = Record<string, object>;
type Keybind = {
	action?: () => void;
	mode?: boolean;
};
class Keybinds {
	actions: Actions;
	bihavior: Bihavior;
	currentKeybind: string[] = [];
	newElement: KeyMap = {
		action: () => {
			this.actions.openMenuNewElement();
		},
		o: {
			action: () => {
				this.actions.addNewElement("OVAL");
			},
		},
		r: {
			action: () => {
				this.actions.addNewElement("RECT");
			},
		},
		t: {
			action: () => {
				this.actions.addNewElement("TEXT");
			},
		},
	};
	keymaps: KeyMap = {
		Delete: {
			action: () => {
				this.actions.removeSelectedComponent();
			}
		},
		Control: {
			c: {
				action: () => {
					this.actions.copySelectedComponent();
				}
			},
			v: {
				action: () => {
					this.actions.pasteComponetInSelectedComponent();
				}
			},
			n: {
				mode: true,
				...this.newElement,
			},
		},
		Insert: {
			mode: true,
			...this.newElement,
		},
	};
	keydown: Record<string, boolean> = {};
	constructor(actions: Actions, bihavior: Bihavior) {
		this.actions = actions;
		this.bihavior = bihavior;
		this.addEventListener();
	}
	isKeybind(obj: any): obj is Keybind {
		return (
			typeof obj.action === "undefined" ||
			(typeof obj.action === "function" && typeof obj.mode === "undefined") ||
			typeof obj.mode === "boolean"
		);
	}
	isRecordOfObject(variable: any): variable is Record<string, object> {
		return (
			typeof variable === "object" &&
			variable !== null &&
			!Array.isArray(variable)
		);
	}
	checkKeybind(map: KeyMap, event: KeyboardEvent, thiskey = "") {
		if (map.action && typeof map.action === "function") {
			map.action();
			event.preventDefault();
		}
		if (map.mode) {
			this.currentKeybind.push(thiskey);
		}
		if (this.isRecordOfObject(map)) {
			for (const key in map) {
				if (this.keydown[key]) {
					this.checkKeybind(map[key] as KeyMap, event, key);
				}
			}
		}
	}
	keyMode(map: KeyMap, index: number, key: string, event: KeyboardEvent) {
		let cleanKeybind = false;
		if (this.isKeybind(map)) {
			if (map.action && typeof map.action === "function") {
				map.action();
				cleanKeybind = true;
				event.preventDefault();
			}
			if (map.mode) {
				this.currentKeybind.push(key);
			}
		}
		if (index < this.currentKeybind.length) {
			const keyMap: string | undefined = this.currentKeybind[index];
			if (this.isRecordOfObject(map[keyMap])) {
				this.keyMode(map[keyMap], index + 1, key, event);
			}
		}
		if (cleanKeybind) {
			this.currentKeybind = [];
		}
	}
	addEventListener() {
		window.addEventListener("keyup", (e) => {
			this.keydown[e.key] = false;
		});
		window.addEventListener("keydown", (e: KeyboardEvent) => {
			this.keydown[e.key] = true;
			if (e.key === "F5") {
				return;
			}
			if (this.currentKeybind.length > 0) {
				this.keyMode(this.keymaps, 0, e.key, e);
			} else {
				this.checkKeybind(this.keymaps, e);
			}
			if (e.key === "Escape") {
				this.actions.closeMenuNewElement();
				this.actions.closeMenuFile();
				this.bihavior.closePopovers();
				this.currentKeybind = [];
			}
		});
	}
}

export default Keybinds;

import Actions from "./actions"
import Bihavior from "./bihavior"
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
		Control: {
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
	keyMode(map: KeyMap, index: number, key: string) {
		let cleanKeybind = false;
		if (this.isKeybind(map)) {
			if (map.action && typeof map.action === "function") {
				map.action();
				cleanKeybind = true;
			}
			if (map.mode) {
				this.currentKeybind.push(key);
			}
		}
		if (index < this.currentKeybind.length) {
			const keyMap: string | undefined = this.currentKeybind[index];
			if (this.isRecordOfObject(map[keyMap])) {
				this.keyMode(map[keyMap], index + 1, key);
			}
		}
		if (cleanKeybind) {
			this.currentKeybind = [];
		}
	}
	addEventListener() {
		window.addEventListener("keydown", (e) => {
			this.keydown[e.key] = true;
		});
		window.addEventListener("keyup", (e) => {
			this.keydown[e.key] = false;
		});
		window.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.key === "F5") {
				return;
			}
			if (this.currentKeybind.length > 0) {
				this.keyMode(this.keymaps, 0, e.key);
			} else {
				this.checkKeybind(this.keymaps, e);
			}
			if (e.key === "Escape") {
				this.actions.closeMenuNewElement();
				this.bihavior.closePopovers();
				this.currentKeybind = [];
			}
		});
	}
}

export default Keybinds;

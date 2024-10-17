let currentKeybind: string[] = [];
type KeyMap = Record<string, object>;
type Keybind = {
	action?: () => void;
	mode?: boolean;
};
function isKeybind(obj: any): obj is Keybind {
	return (
		typeof obj.action === "undefined" ||
		(typeof obj.action === "function" && typeof obj.mode === "undefined") ||
		typeof obj.mode === "boolean"
	);
}

function isRecordOfObject(variable: any): variable is Record<string, object> {
	return (
		typeof variable === "object" &&
		variable !== null &&
		!Array.isArray(variable) &&
		Object.values(variable).every(
			(value) => typeof value === "object" && value !== null,
		)
	);
}
const newElement: KeyMap = {
	f: {
		action: () => {
			addNewElement("FRAME");
		},
	},
	action: () => {
		openMenuNewElement();
	},
	c: {
		action: () => {
			addNewElement("OVAL");
		},
	},
	r: {
		action: () => {
			addNewElement("RECT");
		},
	},
	i: {
		action: () => {
			addNewElement("IMAGE");
		},
	},
};
const keymaps: KeyMap = {
	Control: {
		n: {
			mode: true,
			...newElement,
		},
	},
	Insert: {
		mode: true,
		...newElement,
	},
};
const keydown: Record<string, boolean> = {};
window.addEventListener("keydown", (e) => {
	keydown[e.key] = true;
});
window.addEventListener("keyup", (e) => {
	keydown[e.key] = false;
});

function checkKeybind(map: KeyMap, event: KeyboardEvent) {
	if (isRecordOfObject(map)) {
		for (const key in map) {
			if (keydown[key] && isKeybind(map)) {
				if (map.action && typeof map.action === "function") {
					map.action();
					event.preventDefault();
				}
				if (map.mode) {
					currentKeybind.push(key);
				}
			}
			if (isRecordOfObject(map[key])) {
				checkKeybind(map[key], event);
			}
		}
	} else {
		checkKeybind(map as KeyMap, event);
	}
}

function keyMode(map: KeyMap, index: number, key: string) {
	let cleanKeybind = false;
	if (isKeybind(map)) {
		if (map.action && typeof map.action === "function") {
			map.action();
			cleanKeybind = true;
		}
		if (map.mode) {
			currentKeybind.push(key);
		}
	}
	if (index < currentKeybind.length) {
		const keyMap: string | undefined = currentKeybind[index];
		if (isRecordOfObject(map[keyMap])) {
			keyMode(map[keyMap], index + 1, key);
		}
	}
	if (cleanKeybind) {
		currentKeybind = [];
	}
}
window.addEventListener("keydown", (e: KeyboardEvent) => {
	if (e.key === "F5") {
		// window.location.reload(e.ctrlKey);
		window.location.reload();
	}
	if (currentKeybind.length > 0) {
		keyMode(keymaps, 0, e.key);
	} else {
		checkKeybind(keymaps, e);
	}
});
window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		closeMenuNewElement();
		closePopovers();
		currentKeybind = [];
	}
});

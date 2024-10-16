let currentKeybind: string[] = [];
type KeyMap<T> = Record<string, T>;
type Keybind = {
	action?: () => void;
	mode?: boolean;
};
const newElement: Keybind = {
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
const keymaps: object = {
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

function checkKeybind(map: Keybind, event: KeyboardEvent) {
	for (const key in map) {
		if (keydown[key]) {
			if (map[key].mode) {
				currentKeybind.push(key);
			}
			if (map[key].action) {
				map[key].action();
				event.preventDefault();
			} else {
				checkKeybind(map[key], event);
			}
		}
	}
}

function keyMode(map: Keybind, index: number, key: string) {
	if (key && map[key].mode) {
		currentKeybind.push(key);
	}
	if (key && map[key].action) {
		map[key].action();
	}
	if (index < currentKeybind.length) {
		const keyMap = currentKeybind[index];
		keyMode(map[keyMap], index + 1, key);
		return;
	}
	if (key && map[key].action) {
		currentKeybind = [];
	}
}
window.addEventListener("keydown", (e: KeyboardEvent) => {
	if (e.key === "F5") {
		window.location.reload(e.ctrlKey);
	}
	if (currentKeybind.length > 0) {
		keyMode(keymaps as Keybind, 0, e.key);
	} else {
		checkKeybind(keymaps as Keybind, e);
	}
});
window.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		closeMenuNewElement();
		closePopovers();
		currentKeybind = [];
	}
});

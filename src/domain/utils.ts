import { Common, Component, Prop } from "./common";
declare global {
  interface Element {
    getComponentId(): string;
  }
}
Element.prototype.getComponentId = function(): string {
  return this.getAttribute(`${Common.RENDER_LABEL}id`) ?? "";
}

export class Utils {
  static getElementByComponent(component: Component): HTMLElement | null {
    return document.querySelector(`[${Common.RENDER_LABEL}id=${component.id}]`);
  }
  static generateSlug(): string {
    let id = Utils.tryGenerateSlug();
    while (Utils.getElementByComponentId(id)) {
      id = Utils.tryGenerateSlug()
    }
    return id;
  }
  static getElementByComponentId(id: string): Element | null {
    return document.querySelector(`[${Common.RENDER_LABEL}id=${id}]`);
  }
  static stringToProps(style: string): Prop[] {
    return style.split(";").map(it => it.trim()).filter(it => it).map(
      it => {
        const [name, value] = it.split(":").map(i => i.trim());
        return {
          name: name,
          value: value
        }
      }
    )
  }
  static getProp(props: Prop[], name: string): Prop | undefined {
    return props.find((it) => it.name === name);
  }
  static addProp(props: Prop[], _prop: Prop): Prop[] {
    let add = false
    const prop = { ..._prop, id: _prop.id ?? this.generateSlug() }
    const result = props.map((it) => {
      if (it.name === prop.name) {
        add = true
        return prop;
      }
      return it;
    });
    if (!add) {
      result.push(prop)
    }
    return result;
  }
  static updateCssProp(cssStr: string, prop: string, value: string): string {
    const regex = new RegExp(`${prop}:\\s*[^;]+;`, "g");
    const newProp = `${prop}: ${value};`;
    return regex.test(cssStr)
      ? cssStr.replace(regex, newProp)
      : `${cssStr} ${newProp}`;
  }
  static cssSanitize(cssString: string): string {
    const tempElement = document.createElement('div');
    const styles = cssString.split(';').filter(style => style.trim() !== '');
    const sanitizedStyles: string[] = [];
    for (let style of styles) {
      const [property, value] = style.split(':').map(part => part.trim());
      if (property && value) {
        const originalValue = tempElement.style.getPropertyValue(property);
        tempElement.style.setProperty(property, value ?? "auto");
        if (tempElement.style.getPropertyValue(property) !== '') {
          sanitizedStyles.push(`${property}: ${value}`);
        }
        tempElement.style.setProperty(property, originalValue);
      }
    }
    return sanitizedStyles.join('; ');
  }
  static isValidTagName(tag: string) {
    const tagNameRegex = /^[a-zA-Z][a-zA-Z0-9:-]*$/;
    return tagNameRegex.test(tag);
  }
  static propsTosString(props: Prop[]): string {
    return props.map((it: Prop) => `${it.name}="${it.value}"`).join(" ")
  }
  static propsTosStringCss(props: Prop[]): string {
    return props.map(it => `${it.name}: ${it.value};`).join(" ");
  }
  static tryGenerateSlug(): string {
    return "pab__id__xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  static findComponentById(component: Component | undefined, id: string): Component | undefined {
    if (!component) return undefined;
    if (component.id === id) {
      return component
    }
    if (Array.isArray(component.content)) {
      for (const item of component.content) {
        const res = this.findComponentById(item as Component, id);
        if (res) {
          return res
        }
      }
    }
    return undefined
  }
}

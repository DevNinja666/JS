class CssObject {
    constructor(selector) {
        this.selector = selector;
        this.styles = {};
    }

    setStyle(property, value) {
        this.styles[property] = value;
    }

    removeStyle(property) {
        delete this.styles[property];
    }

    getCss() {
        let css = `${this.selector} {\n`;
        for (let key in this.styles) {
            css += `  ${key}: ${this.styles[key]};\n`;
        }
        css += "}";
        return css;
    }
}

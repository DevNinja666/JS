class HtmlObject {
    constructor(tagName, selfClosing = false, textContent = "") {
        this.tagName = tagName;
        this.selfClosing = selfClosing;
        this.textContent = textContent;
        this.attributes = [];
        this.styles = null; 
        this.children = [];
    }

    setAttribute(name, value) {
        this.attributes.push({ name, value });
    }

    setStyles(cssObj) {
        this.styles = cssObj;
    }

    addChildEnd(obj) {
        this.children.push(obj);
    }

    addChildStart(obj) {
        this.children.unshift(obj);
    }

    getHtml(indent = 0) {
        const space = " ".repeat(indent);

        // Сбор атрибутов
        let attrs = "";
        this.attributes.forEach(a => {
            attrs += ` ${a.name}="${a.value}"`;
        });
        if (this.styles && Object.keys(this.styles.styles).length > 0) {
            let inline = "";
            for (let s in this.styles.styles) {
                inline += `${s}: ${this.styles.styles[s]}; `;
            }
            attrs += ` style="${inline.trim()}"`;
        }

   
        if (this.selfClosing) {
            return `${space}<${this.tagName}${attrs} />`;
        }

        
        let html = `${space}<${this.tagName}${attrs}>`;

        if (this.textContent) {
            html += this.textContent;
        }

        if (this.children.length > 0) {
            html += "\n";
            this.children.forEach(ch => {
                html += ch.getHtml(indent + 2) + "\n";
            });
            html += space;
        }

        html += `</${this.tagName}>`;
        return html;
    }
}

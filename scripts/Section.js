export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem(item) {
        this._container.append(item);
    }

    clear() {
        this._container.innerHTML = '';
    }

    renderer() {
        this.clear();
        
        this._items.forEach(item => {
            this._renderer(item);
        });
    }
};
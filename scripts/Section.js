export class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    addItem() {
        this._container.append();
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
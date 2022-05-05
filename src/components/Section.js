export default class Section {
  constructor(renderer, selector, config) {
    this._renderer = renderer;
    this._config = config;
    this._container = document.querySelector(selector);
  }

  renderItems(items, method) {
    items.forEach((item) => {
      this.addItem(item, method);
    });
  }

  addItem(item, method) {
    const card = this._renderer(item, this._config)

    if (method == 'prepend') {
      this._container.prepend(card);
    }

    if (method == 'append') {
      this._container.append(card);
    }

  }

}

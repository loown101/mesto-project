export default class Section {
  constructor(renderer, selector, config) {
    this._renderer = renderer;
    this._config = config;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const card = this._renderer(item, this._config)
    this._container.prepend(card);
  }

}

export default class Section {
  constructor(renderer, selector, config) {
    this._renderer = renderer;
    this._config = config;
    this._container = document.querySelector(selector);
  }

  renderItems(items) {
    this.clear();

    items.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) { // подумать насчет флага
    const card = this._renderer(item, this._config)
    this._container.prepend(card);
  }

  clear() {
    this._container.textcontent = '';
  }
}

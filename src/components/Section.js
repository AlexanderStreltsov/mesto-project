export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, order = "after") {
    order === "after"
      ? this._container.append(element)
      : this._container.prepend(element);
  }

  render(type, data) {
    switch (type) {
      case "cardList":
        data.forEach((item) => this._renderer(item));
        break;
      case "newCard":
        this._renderer(data);
        break;
      default:
        console.log(`Insert type ${type} not in select`);
        break;
    }
  }
}

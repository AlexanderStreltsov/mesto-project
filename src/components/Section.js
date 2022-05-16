export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, order = "before") {
    order === "before"
      ? this._container.prepend(element)
      : this._container.append(element);
  }

  render(type, data) {
    switch (type) {
      case "list":
        data.forEach((item) => this._renderer(item));
        break;
      case "element":
        this._renderer(data);
        break;
      default:
        console.log(`Insert type ${type} not in select`);
        break;
    }
  }
}

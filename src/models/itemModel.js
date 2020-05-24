import uniqid from "uniqid";

export default class Item {
  constructor(type, description, value) {
    this.type = type;
    this.description = description;
    this.value = value;
    this.id = uniqid();
  }
}

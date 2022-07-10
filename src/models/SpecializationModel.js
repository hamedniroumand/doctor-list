import { randomNumber } from "../core/utils/numberUtils";

export class SpecializationModel {
  constructor({ title }) {
    this.id = randomNumber();
    this.title = title;
  }
}

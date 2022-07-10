import { randomNumber } from "../core/utils/numberUtils";

export class ProfileModel {
  constructor({ name, email, description, specializations, likes = 0 }) {
    this.id = randomNumber();
    this.name = name;
    this.email = email;
    this.description = description;
    this.specializations = specializations;
    this.likes = likes;
  }
}

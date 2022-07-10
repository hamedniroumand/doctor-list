import { ProfileModel } from "../models/ProfileModel";
import SpecializationService from "./SpecializationService";

class ProfileService {
  constructor() {
    this.profiles = [
      new ProfileModel({
        name: "Wojciech",
        email: "wojciech@poz.pl",
        likes: 34,
        description: "",
        specializations: SpecializationService.selectRandom(),
      }),
      new ProfileModel({
        name: "Anna",
        email: "anna@poz.pl",
        likes: 0,
        description: "",
        specializations: SpecializationService.selectRandom(),
      }),
      new ProfileModel({
        name: "Maria",
        email: "maria@poz.pl",
        likes: 28,
        description: "",
        specializations: SpecializationService.selectRandom(),
      }),
    ];
  }

  all() {
    return this.profiles;
  }

  create({ name, email, description, specializationIds }) {
    const specializations = SpecializationService.findAll(specializationIds);
    const newProfile = new ProfileModel({
      name,
      email,
      description,
      specializations,
    });
    this.profiles.push(newProfile);
  }
}

export default new ProfileService();

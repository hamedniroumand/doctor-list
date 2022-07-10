import { randomItems } from "../core/utils/arrayUtils";
import { SpecializationModel } from "../models/SpecializationModel";

class SpecializationService {
  constructor() {
    this.specializations = [
      new SpecializationModel({ title: "Surgeon" }),
      new SpecializationModel({ title: "Radiologist" }),
      new SpecializationModel({ title: "Cardiologist" }),
      new SpecializationModel({ title: "Psychiatrist" }),
      new SpecializationModel({ title: "Dermatologist" }),
    ];
  }

  all() {
    return this.specializations;
  }

  selectRandom() {
    return randomItems(this.specializations);
  }
}

export default new SpecializationService();

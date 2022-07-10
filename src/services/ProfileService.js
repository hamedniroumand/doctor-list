import { ProfileModel } from "../models/ProfileModel";

class ProfileService {
    constructor() {
        this.profiles = [
            new ProfileModel({
                name: "Wojciech",
                email: "wojciech@poz.pl",
                likes: 34,
                specializations: "Anaesthesiologist"
            }),
            new ProfileModel({
                name: "Anna",
                email: "anna@poz.pl",
                specializations: "Radiologist"
            }),
            new ProfileModel({
                name: "Maria",
                email: "maria@poz.pl",
                likes: 28,
                specializations: "Surgeon"
            }),
        ]
    }

    all() {
        return this.profiles;
    }

    create({ name, email, description, specializations }) {
        const newProfile = new ProfileModel({ name, email, description, specializations });
        this.profiles.push(newProfile);
    }
}

export default new ProfileService;
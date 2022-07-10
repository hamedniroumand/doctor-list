export class ProfileModel {
    constructor({ name, email, description, specializations, likes = 0, }) {
        this.id = Math.floor(Math.random() * 9999999);
        this.name = name;
        this.email = email;
        this.description = description;
        this.specializations = specializations;
        this.likes =  likes;
    }
}
import Vue from "vue";
import { ProfileModel } from "../models/ProfileModel";
import SpecializationService from "./SpecializationService";

const LIKE_STATUSES = {
  IS_LIKED: true,
  IS_DISLIKED: false,
};

class ProfileService {
  constructor() {
    this._currentSortState = null;
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
    this._profilesDataBackup = [...this.profiles];
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
    this._profilesDataBackup.push(newProfile);
  }

  find(profileId) {
    return this.profiles.find((profile) => profile.id === profileId);
  }

  update(profileId, newData) {
    const profile = this.find(profileId);
    if (!profile) return;
    Object.keys(newData).forEach((property) => {
      Vue.set(profile, property, newData[property]);
    });
  }

  toggleLike(profileId, newLikeState) {
    const { IS_DISLIKED, IS_LIKED } = LIKE_STATUSES;
    const profile = this.find(profileId);
    if (!profile) return;
    let likeCount;
    const isFirstUserLikeOrDislike = !profile.isLiked && !profile.isDisliked;
    if (isFirstUserLikeOrDislike) {
      likeCount = newLikeState === IS_LIKED ? profile.likes + 1 : profile.likes - 1;
      this.update(profileId, {
        isLiked: newLikeState === IS_LIKED,
        isDisliked: newLikeState === IS_DISLIKED,
      });
    } else {
      const isDispatchedSameCurrentLikeState =
        (newLikeState === IS_LIKED && profile.isLiked) ||
        (newLikeState === IS_DISLIKED && profile.isDisliked);
      if (isDispatchedSameCurrentLikeState) {
        likeCount = newLikeState === IS_LIKED ? profile.likes - 1 : profile.likes + 1;
        this.update(profileId, {
          isLiked: false,
          isDisliked: false,
        });
      } else { // user changed his/her opinion
        likeCount = newLikeState === IS_LIKED ? profile.likes + 2 : profile.likes - 2;
        this.update(profileId, {
          isLiked: newLikeState === IS_LIKED,
          isDisliked: newLikeState === IS_DISLIKED,
        });
      }
    }
    this.update(profileId, { likes: likeCount });
  }

  sort(sortAs) {
    if (
      (this._currentSortState === "asc" && sortAs === "asc") ||
      (this._currentSortState === "desc" && sortAs === "desc")
    ) {
      _restoreData.bind(this)();
      this._currentSortState = null;
      return;
    }
    if (sortAs === "asc") {
      _sortAsc.bind(this)();
    } else if (sortAs === "desc") {
      _sortDesc.bind(this)();
    }
  }
}

function _restoreData() {
  this.profiles.splice(0, this.profiles.length);
  this.profiles.push(...this._profilesDataBackup);
}

function _sortAsc() {
  this.profiles.sort(function (a, b) {
    return a.likes - b.likes;
  });
  this._currentSortState = "asc";
}

function _sortDesc() {
  this.profiles.sort(function (a, b) {
    return b.likes - a.likes;
  });
  this._currentSortState = "desc";
}

export default new ProfileService();

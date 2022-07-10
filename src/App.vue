<template>
  <div id="app">
    <p>Profiles List</p>
    <ProfileList />
    <NewProfileCard ref="NewProfileCard" @save-profile="createNewProfile" />
  </div>
</template>

<script>
import NewProfileCard from "./components/profile-form/NewProfileCard.vue";
import ProfileList from "./components/ProfileList.vue";
import ProfileService from "./core/services/ProfileService";

export default {
  name: "App",

  components: {
    NewProfileCard,
    ProfileList,
  },

  methods: {
    createNewProfile(profile) {
      ProfileService.create(profile);
      this.$refs.NewProfileCard.resetForm();
    },
  },
};
</script>